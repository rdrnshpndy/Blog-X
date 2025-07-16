import express from 'express';
import {
  createFees,
  getAllFees,
  getFeesByCollegeSlug,
  updateFees,
  deleteFees
} from '../Controller/feescon.js';

const router = express.Router();

// Create a new fees record
router.post('/', createFees);

// Get all fees records
router.get('/', getAllFees);

// Get fees by collegeSlug
router.get('/:collegeSlug', getFeesByCollegeSlug);

// Update fees by collegeSlug
router.put('/:collegeSlug', updateFees);

// Delete fees by collegeSlug
router.delete('/:collegeSlug', deleteFees);

export default router;
