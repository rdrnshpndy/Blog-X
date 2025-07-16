import College from '../models/college.js';

// Create a new college record
export const createCollege = async (req, res) => {
  try {
    const college = new College(req.body);
    await college.save();
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get college by slug
export const getCollegeBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const college = await College.findOne({ slug });
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update college by slug
export const updateCollege = async (req, res) => {
  try {
    const { slug } = req.params;
    const college = await College.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete college by slug
export const deleteCollege = async (req, res) => {
  try {
    const { slug } = req.params;
    const college = await College.findOneAndDelete({ slug });
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    res.status(200).json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
