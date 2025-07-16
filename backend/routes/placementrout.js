import express from 'express';
import {
  createPlacement,
  getAllPlacements,
  getPlacementByCollegeAndYear,
  updatePlacement,
  deletePlacement
} from '../Controller/placementcon.js';

const router = express.Router();

// Create a new placement record
router.post('/', createPlacement);

// Get all placement records
router.get('/', getAllPlacements);

// Get placement by collegeSlug and year
router.get('/:collegeSlug/:year', getPlacementByCollegeAndYear);

// Update placement by collegeSlug and year
router.put('/:collegeSlug/:year', updatePlacement);

// Delete placement by collegeSlug and year
router.delete('/:collegeSlug/:year', deletePlacement);

export default router;
