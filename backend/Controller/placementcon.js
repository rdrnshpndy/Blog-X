import Placement from '../models/placement.js';

// Create a new placement record
export const createPlacement = async (req, res) => {
  try {
    const placement = new Placement(req.body);
    await placement.save();
    res.status(201).json(placement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all placement records
export const getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.status(200).json(placements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get placement by collegeSlug and year
export const getPlacementByCollegeAndYear = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const placement = await Placement.findOne({ collegeSlug, year });
    if (!placement) {
      return res.status(404).json({ error: 'Placement data not found' });
    }
    res.status(200).json(placement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update placement by collegeSlug and year
export const updatePlacement = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const placement = await Placement.findOneAndUpdate(
      { collegeSlug, year },
      req.body,
      { new: true, runValidators: true }
    );
    if (!placement) {
      return res.status(404).json({ error: 'Placement data not found' });
    }
    res.status(200).json(placement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete placement by collegeSlug and year
export const deletePlacement = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const placement = await Placement.findOneAndDelete({ collegeSlug, year });
    if (!placement) {
      return res.status(404).json({ error: 'Placement data not found' });
    }
    res.status(200).json({ message: 'Placement data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
