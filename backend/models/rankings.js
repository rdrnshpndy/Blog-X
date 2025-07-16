import mongoose from 'mongoose';

const rankingSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  sub: {
    type: String,
    required: true,
    trim: true
  },
  rank: {
    type: String, // like "#3" or "Top 10"
    required: true,
    trim: true
  },
  image: {
    type: String, // this will be a URL or image path
    required: true
  },
  className: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('Ranking', rankingSchema);
