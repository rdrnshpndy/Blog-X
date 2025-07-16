import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: true,
    index: true
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1 star'],
    max: [5, 'Rating cannot exceed 5 stars']
  },
  reviewText: {
    type: String,
    required: true,
    trim: true,
    maxlength: [3000, 'Review is too long']
  }
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
