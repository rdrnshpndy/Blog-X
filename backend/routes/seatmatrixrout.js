import express from 'express';
import {
  createSeatMatrix,
  getAllSeatMatrices,
  getSeatMatrixByCollegeAndYear,
  updateSeatMatrix,
  deleteSeatMatrix
} from '../Controller/seatmatrixcon.js';

const router = express.Router();

// Create a new seat matrix record
router.post('/', createSeatMatrix);

// Get all seat matrix records
router.get('/', getAllSeatMatrices);

// Get seat matrix by collegeSlug and year
router.get('/:collegeSlug/:year', getSeatMatrixByCollegeAndYear);

// Update seat matrix by collegeSlug and year
router.put('/:collegeSlug/:year', updateSeatMatrix);

// Delete seat matrix by collegeSlug and year
router.delete('/:collegeSlug/:year', deleteSeatMatrix);

export default router;
