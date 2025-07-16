import express from 'express';
import {
  createRanking,
  getAllRankings,
  getRankingByCollegeSlug,
  updateRanking,
  deleteRanking
} from '../Controller/rankingscon.js';

const router = express.Router();

// Create a new ranking record
router.post('/', createRanking);

// Get all ranking records
router.get('/', getAllRankings);

// Get ranking by collegeSlug
router.get('/:collegeSlug', getRankingByCollegeSlug);

// Update ranking by collegeSlug
router.put('/:collegeSlug', updateRanking);

// Delete ranking by collegeSlug
router.delete('/:collegeSlug', deleteRanking);

export default router;
