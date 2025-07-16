import mongoose from 'mongoose';

const branchStatSchema = new mongoose.Schema({
  branch: { type: String, required: true, trim: true },
  registered: { type: Number, required: true, min: 0 },
  placed: { type: Number, required: true, min: 0 }
}, { _id: false });

const placementPercentageSchema = new mongoose.Schema({
  branch: { type: String, required: true, trim: true },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { _id: false });

const salarySchema = new mongoose.Schema({
  medianDomestic: { type: Number, min: 0 }, // in LPA
  averageDomestic: { type: Number, min: 0 },
  medianInternational: { type: Number, min: 0 },
  averageInternational: { type: Number, min: 0 }
}, { _id: false });

const yearPlacementSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear() + 1
  },
  branchStats: {
    type: [branchStatSchema],
    default: []
  },
  placementPercentages: {
    type: [placementPercentageSchema],
    default: []
  },
  salary: {
    type: salarySchema,
    default: undefined
  }
}, { _id: false });

const placementSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: [true, 'College slug is required'],
    trim: true,
    index: true
  },
  summary: {
    type: String,
    trim: true
  },
  years: {
    type: [yearPlacementSchema],
    default: []
  },
  topRecruiters: {
    type: [String],
    default: []
  },
  placementPercentage: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

const Placement = mongoose.model('Placement', placementSchema);

export default Placement;
