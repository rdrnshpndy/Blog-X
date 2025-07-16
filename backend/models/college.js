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
    overviewPara1: { type: String },
    overviewPara2: { type: String },
    overviewPara3: { type: String },
        contactEmail: { type: String },
        contactNumber: { type: String },
        officialWebsite: { type: String },
        googleMapsIframe: { type: String },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  }
});

collegeSchema.index({ slug: 1 });

collegeSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

export default mongoose.model('College', collegeSchema);
