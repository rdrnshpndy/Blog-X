import Overview from '../models/overview.js';

// Create a new overview record
export const createOverview = async (req, res) => {
  try {
    const overview = new Overview(req.body);
    await overview.save();
    res.status(201).json(overview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all overview records
export const getAllOverviews = async (req, res) => {
  try {
    const overviews = await Overview.find();
    res.status(200).json(overviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get overview by collegeSlug
export const getOverviewByCollegeSlug = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const overview = await Overview.findOne({ collegeSlug });
    if (!overview) {
      return res.status(404).json({ error: 'Overview data not found' });
    }
    res.status(200).json(overview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update overview by collegeSlug
export const updateOverview = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const overview = await Overview.findOneAndUpdate(
      { collegeSlug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!overview) {
      return res.status(404).json({ error: 'Overview data not found' });
    }
    res.status(200).json(overview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete overview by collegeSlug
export const deleteOverview = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const overview = await Overview.findOneAndDelete({ collegeSlug });
    if (!overview) {
      return res.status(404).json({ error: 'Overview data not found' });
    }
    res.status(200).json({ message: 'Overview data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
