import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  courses: { type: [String], default: [] },
  photo: { type: String },
  url: { type: String, required: true },
  nirfRank: { type: Number, min: 1 },
  type: { type: String, enum: ['IIT', 'NIT', 'IIIT', 'BITS'], required: true },
  ownership: { type: String, enum: ['Government', 'Private'], required: true }
});

export default mongoose.model('College', collegeSchema);
