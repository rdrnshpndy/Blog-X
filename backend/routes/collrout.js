import express from 'express';
import {
  createCollege,
  getAllColleges,
  getCollegeBySlug,
  updateCollege,
  deleteCollege
} from '../Controller/collcon.js';

const router = express.Router();

// Create a new college record
router.post('/', createCollege);

// Get all college records
router.get('/', getAllColleges);

// Get college by slug
router.get('/:slug', getCollegeBySlug);

// Update college by slug
router.put('/:slug', updateCollege);

// Delete college by slug
router.delete('/:slug', deleteCollege);

export default router;
