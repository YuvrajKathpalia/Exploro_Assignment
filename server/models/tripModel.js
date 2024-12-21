const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  totalSlots: {
    type: Number,
    required: [true, 'Please add total slots']
  },
  availableSlots: {
    type: Number,
    required: [true, 'Please add available slots']
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  images: [String],
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  cancellationPolicy: {
    fullRefundDays: Number,
    partialRefundDays: Number,
    partialRefundPercentage: Number
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema);