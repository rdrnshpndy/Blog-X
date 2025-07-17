import College from '../models/college.js';

// GET all colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single college by slug
export const getCollegeBySlug = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new college
export const createCollege = async (req, res) => {
  const college = new College({
    filter: req.body.filter,
    info: req.body.info,
    location: req.body.location,
    admissions: req.body.admissions,
    coursesOffered: req.body.coursesOffered,
    feeStructure: req.body.feeStructure,
    placements: req.body.placements,
  });

  try {
    const newCollege = await college.save();
    res.status(201).json(newCollege);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request
  }
};

// PUT (update) an existing college
export const updateCollege = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Update filter fields
    college.filter = req.body.filter || college.filter;
    // Update info fields
    college.info = req.body.info || college.info;
    // Update location fields
    college.location = req.body.location || college.location;
    // Update admissions fields
    college.admissions = req.body.admissions || college.admissions;
    // Update coursesOffered
    college.coursesOffered = req.body.coursesOffered || college.coursesOffered;
    // Update feeStructure
    college.feeStructure = req.body.feeStructure || college.feeStructure;
    // Update placements
    college.placements = req.body.placements || college.placements;

    const updatedCollege = await college.save();
    res.json(updatedCollege);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request
  }
};

// DELETE a college
export const deleteCollege = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    await college.deleteOne();
    res.json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
