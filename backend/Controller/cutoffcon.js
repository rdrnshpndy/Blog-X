import Cutoff from '../models/cutoff.js';

// Create a new cutoff record
export const createCutoff = async (req, res) => {
  try {
    const cutoff = new Cutoff(req.body);
    await cutoff.save();
    res.status(201).json(cutoff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all cutoff records
export const getAllCutoffs = async (req, res) => {
  try {
    const cutoffs = await Cutoff.find();
    res.status(200).json(cutoffs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cutoff by collegeSlug, year, and round
export const getCutoffByCollegeYearRound = async (req, res) => {
  try {
    const { collegeSlug, year, round } = req.params;
    const cutoff = await Cutoff.findOne({ collegeSlug, year, round });
    if (!cutoff) {
      return res.status(404).json({ error: 'Cutoff data not found' });
    }
    res.status(200).json(cutoff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update cutoff by collegeSlug, year, and round
export const updateCutoff = async (req, res) => {
  try {
    const { collegeSlug, year, round } = req.params;
    const cutoff = await Cutoff.findOneAndUpdate(
      { collegeSlug, year, round },
      req.body,
      { new: true, runValidators: true }
    );
    if (!cutoff) {
      return res.status(404).json({ error: 'Cutoff data not found' });
    }
    res.status(200).json(cutoff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete cutoff by collegeSlug, year, and round
export const deleteCutoff = async (req, res) => {
  try {
    const { collegeSlug, year, round } = req.params;
    const cutoff = await Cutoff.findOneAndDelete({ collegeSlug, year, round });
    if (!cutoff) {
      return res.status(404).json({ error: 'Cutoff data not found' });
    }
    res.status(200).json({ message: 'Cutoff data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
