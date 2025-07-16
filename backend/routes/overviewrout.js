import express from 'express';
import {
  createOverview,
  getAllOverviews,
  getOverviewByCollegeSlug,
  updateOverview,
  deleteOverview
} from '../Controller/overviewcon.js';

const router = express.Router();

// Create a new overview record
router.post('/', createOverview);

// Get all overview records
router.get('/', getAllOverviews);

// Get overview by collegeSlug
router.get('/:collegeSlug', getOverviewByCollegeSlug);

// Update overview by collegeSlug
router.put('/:collegeSlug', updateOverview);

// Delete overview by collegeSlug
router.delete('/:collegeSlug', deleteOverview);

export default router;
