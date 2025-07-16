import Location from '../models/location.js';

// Create a new location record
export const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all location records
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get location by collegeSlug
export const getLocationByCollegeSlug = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const location = await Location.findOne({ collegeSlug });
    if (!location) {
      return res.status(404).json({ error: 'Location data not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update location by collegeSlug
export const updateLocation = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const location = await Location.findOneAndUpdate(
      { collegeSlug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!location) {
      return res.status(404).json({ error: 'Location data not found' });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete location by collegeSlug
export const deleteLocation = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const location = await Location.findOneAndDelete({ collegeSlug });
    if (!location) {
      return res.status(404).json({ error: 'Location data not found' });
    }
    res.status(200).json({ message: 'Location data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
