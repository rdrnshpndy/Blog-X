import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  courses: { type: [String], default: [] },
  photo: { type: String },
  url: { type: String },
  nirfRank: { type: Number, min: 1 },
  type: { type: String, enum: ['IIT', 'NIT', 'IIIT', 'BITS', 'Other'] },
  ownership: { type: String, enum: ['Government', 'Private', 'PPP'] },
  branch: { type: [String], default: [] },
  address: { type: String },
  nearestAirport: { type: String },
  nearestRailwayStation: { type: String },
  overview: { type: String },
});

export default mongoose.model('College', collegeSchema);