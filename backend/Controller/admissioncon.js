import Admission from '../models/admission.js';

// Create a new admission record
export const createAdmission = async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all admission records
export const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get admission by collegeSlug and year
export const getAdmissionByCollegeAndYear = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const admission = await Admission.findOne({ collegeSlug, year });
    if (!admission) {
      return res.status(404).json({ error: 'Admission data not found' });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update admission by collegeSlug and year
export const updateAdmission = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const admission = await Admission.findOneAndUpdate(
      { collegeSlug, year },
      req.body,
      { new: true, runValidators: true }
    );
    if (!admission) {
      return res.status(404).json({ error: 'Admission data not found' });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete admission by collegeSlug and year
export const deleteAdmission = async (req, res) => {
  try {
    const { collegeSlug, year } = req.params;
    const admission = await Admission.findOneAndDelete({ collegeSlug, year });
    if (!admission) {
      return res.status(404).json({ error: 'Admission data not found' });
    }
    res.status(200).json({ message: 'Admission data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
