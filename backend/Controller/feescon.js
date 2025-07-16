import Fees from '../models/fees.js';

// Create a new fees record
export const createFees = async (req, res) => {
  try {
    const fees = new Fees(req.body);
    await fees.save();
    res.status(201).json(fees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all fees records
export const getAllFees = async (req, res) => {
  try {
    const fees = await Fees.find();
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get fees by collegeSlug
export const getFeesByCollegeSlug = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const fees = await Fees.findOne({ collegeSlug });
    if (!fees) {
      return res.status(404).json({ error: 'Fees data not found' });
    }
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update fees by collegeSlug
export const updateFees = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const fees = await Fees.findOneAndUpdate(
      { collegeSlug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!fees) {
      return res.status(404).json({ error: 'Fees data not found' });
    }
    res.status(200).json(fees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete fees by collegeSlug
export const deleteFees = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const fees = await Fees.findOneAndDelete({ collegeSlug });
    if (!fees) {
      return res.status(404).json({ error: 'Fees data not found' });
    }
    res.status(200).json({ message: 'Fees data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
