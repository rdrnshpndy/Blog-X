import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: true,
    index: true
  },
  backgroundImage: {
    type: String,
    required: [true, 'Background image URL is required']
  },
  address: {
    type: String,
    required: [true, 'College address is required'],
    trim: true
  }
  
}, { timestamps: true });

export default mongoose.model('Hero', HeroSchema);
