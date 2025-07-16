import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewsByCollegeSlug,
  updateReview,
  deleteReview
} from '../Controller/reviewcon.js';

const router = express.Router();

// Create a new review record
router.post('/', createReview);

// Get all review records
router.get('/', getAllReviews);

// Get reviews by collegeSlug
router.get('/:collegeSlug', getReviewsByCollegeSlug);

// Update review by ID
router.put('/:id', updateReview);

// Delete review by ID
router.delete('/:id', deleteReview);

export default router;
