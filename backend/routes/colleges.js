import express from 'express';
import College from '../models/college.js';
import multer from 'multer';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// GET all colleges
router.get('/', verifyToken, async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single college by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new college
router.post('/', verifyToken, async (req, res) => {
  const college = new College({
    name: req.body.name,
    state: req.body.state,
    city: req.body.city,
    courses: req.body.courses,
    photo: req.body.photo,
    url: req.body.url,
    nirfRank: req.body.nirfRank,
    type: req.body.type,
    ownership: req.body.ownership,
    branch: req.body.branch,

  });

  try {
    const newCollege = await college.save();
    res.status(201).json(newCollege);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request
  }
});

// PUT (update) an existing college
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Update only the fields that are provided in the request body
    if (req.body.name != null) {
      college.name = req.body.name;
    }
    if (req.body.state != null) {
      college.state = req.body.state;
    }
    if (req.body.city != null) {
      college.city = req.body.city;
    }
    if (req.body.courses != null) {
      college.courses = req.body.courses;
    }
    if (req.body.photo != null) {
      college.photo = req.body.photo;
    }
    if (req.body.url != null) {
      college.url = req.body.url;
    }
    if (req.body.nirfRank != null) {
      college.nirfRank = req.body.nirfRank;
    }
    if (req.body.type != null) {
      college.type = req.body.type;
    }
    if (req.body.ownership != null) {
      college.ownership = req.body.ownership;
    }
    if (req.body.branch != null) {
      college.branch = req.body.branch;
    }


    const updatedCollege = await college.save();
    res.json(updatedCollege);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request
  }
});

// DELETE a college
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    await college.deleteOne();
    res.json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
