import Hero from '../models/hero.js';

// Create a new hero record
export const createHero = async (req, res) => {
  try {
    const hero = new Hero(req.body);
    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all hero records
export const getAllHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get hero by collegeSlug
export const getHeroByCollegeSlug = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const hero = await Hero.findOne({ collegeSlug });
    if (!hero) {
      return res.status(404).json({ error: 'Hero data not found' });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update hero by collegeSlug
export const updateHero = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const hero = await Hero.findOneAndUpdate(
      { collegeSlug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!hero) {
      return res.status(404).json({ error: 'Hero data not found' });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete hero by collegeSlug
export const deleteHero = async (req, res) => {
  try {
    const { collegeSlug } = req.params;
    const hero = await Hero.findOneAndDelete({ collegeSlug });
    if (!hero) {
      return res.status(404).json({ error: 'Hero data not found' });
    }
    res.status(200).json({ message: 'Hero data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
