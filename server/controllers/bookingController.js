
const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');

exports.createBooking = async (req, res) => {
  try {
    const trip = await Trip.findById(req.body.tripId);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.availableSlots < 1) {
      return res.status(400).json({ message: 'No available slots' });
    }

    const booking = await Booking.create({
      user: req.user._id,
      trip: trip._id,
      totalAmount: trip.price
    });

    // Update available slots
    trip.availableSlots -= 1;
    await trip.save();

    await booking.populate('trip');
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('trip')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrganizerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('trip')
      .populate('user', 'name email')
      .sort({ bookingDate: -1 });

    // Filter bookings for trips organized by the user
    const organizerBookings = bookings.filter(
      booking => booking.trip.organizer.toString() === req.user._id.toString()
    );

    res.json(organizerBookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('trip');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const trip = booking.trip;
    const today = new Date();
    const tripStart = new Date(trip.startDate);
    const daysUntilTrip = Math.ceil((tripStart - today) / (1000 * 60 * 60 * 24));

    let refundAmount = 0;
    if (daysUntilTrip >= 15) {
      refundAmount = booking.totalAmount;
    } else if (daysUntilTrip >= 7) {
      refundAmount = booking.totalAmount * 0.5;
    }

    booking.status = 'cancelled';
    booking.paymentStatus = refundAmount > 0 ? 'refunded' : 'completed';
    await booking.save();

    // Increase available slots
    trip.availableSlots += 1;
    await trip.save();

    res.json({
      message: 'Booking cancelled',
      refundAmount,
      booking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentDetails } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.paymentStatus = 'completed';
    booking.status = 'confirmed';
    booking.paymentDetails = {
      ...paymentDetails,
      paymentDate: new Date()
    };

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

