import express from 'express';
const router = express.Router();
import { getAllColleges, getCollegeById, createCollege, updateCollege, deleteCollege } from '../Controller/collegecon.js';
import verifyToken from '../middleware/verifyToken.js';

// GET all colleges
router.get('/', verifyToken, getAllColleges);

// GET a single college by slug
router.get('/:slug', verifyToken, getCollegeById);

// POST a new college
router.post('/', verifyToken, createCollege);

// PUT (update) an existing college
router.put('/:slug', verifyToken, updateCollege);

// DELETE a college
router.delete('/:slug', verifyToken, deleteCollege);

export default router;
