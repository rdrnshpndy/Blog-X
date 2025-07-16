import mongoose from 'mongoose';

const overviewSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: true,
    index: true
  },
  para1: {
    type: String,
    required: true,
    maxlength: 2000
  },
  para2: {
    type: String,
    required: true,
    maxlength: 2000
  },
  para3: {
    type: String,
    required: true,
    maxlength: 2000
  }
}, { timestamps: true });

export default mongoose.model('Overview', overviewSchema);
