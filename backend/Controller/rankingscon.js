import Ranking from '../models/rankings.js';

// Create a new ranking record
export const createRanking = async (req, res) => {
  try {
    const ranking = new Ranking(req.body);
    await ranking.save();
    res.status(201).json(ranking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ranking records
export const getAllRankings = async (req, res) => {
  try {
    const rankings = await Ranking.find();
    res.status(200).json(rankings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get ranking by collegeSlug
export const getRankingByCollegeSlug = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const ranking = await Ranking.findOne({ collegeSlug });
    if (!ranking) {
      return res.status(404).json({ error: 'Ranking data not found' });
    }
    res.status(200).json(ranking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update ranking by collegeSlug
export const updateRanking = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const ranking = await Ranking.findOneAndUpdate(
      { collegeSlug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!ranking) {
      return res.status(404).json({ error: 'Ranking data not found' });
    }
    res.status(200).json(ranking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete ranking by collegeSlug
export const deleteRanking = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const ranking = await Ranking.findOneAndDelete({ collegeSlug });
    if (!ranking) {
      return res.status(404).json({ error: 'Ranking data not found' });
    }
    res.status(200).json({ message: 'Ranking data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
