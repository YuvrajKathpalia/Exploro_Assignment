const express = require('express');
const router = express.Router();
const { 
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getOrganizerTrips 
} = require('../controllers/tripController');
const { protect, organizerOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTrips)
  .post(protect, organizerOnly, createTrip);

router.get('/organizer', protect, organizerOnly, getOrganizerTrips);

router.route('/:id')
  .get(getTripById)
  .put(protect, organizerOnly, updateTrip)
  .delete(protect, organizerOnly, deleteTrip);

module.exports = router;