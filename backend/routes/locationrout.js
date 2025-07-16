import express from 'express';
import {
  createLocation,
  getAllLocations,
  getLocationByCollegeSlug,
  updateLocation,
  deleteLocation
} from '../Controller/locationcon.js';

const router = express.Router();

// Create a new location record
router.post('/', createLocation);

// Get all location records
router.get('/', getAllLocations);

// Get location by collegeSlug
router.get('/:collegeSlug', getLocationByCollegeSlug);

// Update location by collegeSlug
router.put('/:collegeSlug', updateLocation);

// Delete location by collegeSlug
router.delete('/:collegeSlug', deleteLocation);

export default router;
