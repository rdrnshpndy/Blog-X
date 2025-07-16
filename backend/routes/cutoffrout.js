import express from 'express';
import {
  createCutoff,
  getAllCutoffs,
  getCutoffByCollegeYearRound,
  updateCutoff,
  deleteCutoff
} from '../Controller/cutoffcon.js';

const router = express.Router();

// Create a new cutoff record
router.post('/', createCutoff);

// Get all cutoff records
router.get('/', getAllCutoffs);

// Get cutoff by collegeSlug, year, and round
router.get('/:collegeSlug/:year/:round', getCutoffByCollegeYearRound);

// Update cutoff by collegeSlug, year, and round
router.put('/:collegeSlug/:year/:round', updateCutoff);

// Delete cutoff by collegeSlug, year, and round
router.delete('/:collegeSlug/:year/:round', deleteCutoff);

export default router;
