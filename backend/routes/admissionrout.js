import express from 'express';
import {
  createAdmission,
  getAllAdmissions,
  getAdmissionByCollegeAndYear,
  updateAdmission,
  deleteAdmission
} from '../Controller/admissioncon.js';

const router = express.Router();

// Create a new admission record
router.post('/', createAdmission);

// Get all admission records
router.get('/', getAllAdmissions);

// Get admission by collegeSlug and year
router.get('/:collegeSlug/:year', getAdmissionByCollegeAndYear);

// Update admission by collegeSlug and year
router.put('/:collegeSlug/:year', updateAdmission);

// Delete admission by collegeSlug and year
router.delete('/:collegeSlug/:year', deleteAdmission);

export default router;
