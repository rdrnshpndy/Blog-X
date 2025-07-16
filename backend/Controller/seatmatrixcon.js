import SeatMatrix from '../models/seatmatrix.js';

// Create a new seat matrix record
export const createSeatMatrix = async (req, res) => {
  try {
    const seatMatrix = new SeatMatrix(req.body);
    await seatMatrix.save();
    res.status(201).json(seatMatrix);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all seat matrix records
export const getAllSeatMatrices = async (req, res) => {
  try {
    const seatMatrices = await SeatMatrix.find();
    res.status(200).json(seatMatrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get seat matrix by collegeSlug and year
export const getSeatMatrixByCollegeAndYear = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const seatMatrix = await SeatMatrix.findOne({ collegeSlug, year });
    if (!seatMatrix) {
      return res.status(404).json({ error: 'Seat matrix data not found' });
    }
    res.status(200).json(seatMatrix);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update seat matrix by collegeSlug and year
export const updateSeatMatrix = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const seatMatrix = await SeatMatrix.findOneAndUpdate(
      { collegeSlug, year },
      req.body,
      { new: true, runValidators: true }
    );
    if (!seatMatrix) {
      return res.status(404).json({ error: 'Seat matrix data not found' });
    }
    res.status(200).json(seatMatrix);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete seat matrix by collegeSlug and year
export const deleteSeatMatrix = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const seatMatrix = await SeatMatrix.findOneAndDelete({ collegeSlug, year });
    if (!seatMatrix) {
      return res.status(404).json({ error: 'Seat matrix data not found' });
    }
    res.status(200).json({ message: 'Seat matrix data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
