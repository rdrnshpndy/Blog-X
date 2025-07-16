import express from 'express';
import {
  createHero,
  getAllHeroes,
  getHeroByCollegeSlug,
  updateHero,
  deleteHero
} from '../Controller/herocon.js';

const router = express.Router();

// Create a new hero record
router.post('/', createHero);

// Get all hero records
router.get('/', getAllHeroes);

// Get hero by collegeSlug
router.get('/:collegeSlug', getHeroByCollegeSlug);

// Update hero by collegeSlug
router.put('/:collegeSlug', updateHero);

// Delete hero by collegeSlug
router.delete('/:collegeSlug', deleteHero);

export default router;
