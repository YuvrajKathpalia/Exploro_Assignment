const express = require('express');
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  getOrganizerBookings,
  cancelBooking,
  updatePaymentStatus
} = require('../controllers/bookingController');
const { protect, organizerOnly } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createBooking)
  .get(protect, getUserBookings);

router.get('/organizer', protect, organizerOnly, getOrganizerBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.put('/:id/payment', protect, updatePaymentStatus);

module.exports = router;