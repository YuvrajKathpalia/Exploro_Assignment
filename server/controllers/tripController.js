const Trip = require('../models/tripModel');


exports.createTrip = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      price,
      totalSlots,
      location,
      cancellationPolicy,
      images
    } = req.body;

    const trip = await Trip.create({
      title,
      description,
      startDate,
      endDate,
      price,
      totalSlots,
      availableSlots: totalSlots,
      location,
      cancellationPolicy,
      images,
      organizer: req.user._id
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ status: 'upcoming' })
      .populate('organizer', 'name email')
      .sort({ startDate: 1 });
    res.json(trips);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('organizer', 'name email');
    
    if (trip) {
      res.json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this trip' });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this trip' });
    }

    await trip.remove();
    res.json({ message: 'Trip removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrganizerTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ organizer: req.user._id })
      .sort({ startDate: 1 });
    res.json(trips);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};