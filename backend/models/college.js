import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
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
}, { _id: false });

const rankingSchema = new mongoose.Schema({
  type: { type: String },
  value: { type: String },
}, { _id: false });

const infoSchema = new mongoose.Schema({
  overviewPara1: { type: String },
  overviewPara2: { type: String },
  founded: { type: String },
  campusSize: { type: String },
  students: { type: String },
  faculty: { type: String },
  notableAlumni: { type: String },
  nirfRank: { type: String },
  otherInfo: { type: String },
}, { _id: false });

const locationSchema = new mongoose.Schema({
  address: { type: String },
  nearestAirport: { type: String },
  nearestRailwayStation: { type: String },
  nearestMetroStation: { type: String },
  secondaryNearestRailwayStation: { type: String },
  campusFacilities: { type: [String], default: [] },
  googleMapsIframe: { type: String },
  contactEmail: { type: String },
  contactNumber: { type: String },
  officialWebsite: { type: String },
}, { _id: false });

const eligibilitySelectionSchema = new mongoose.Schema({
  course: { type: String },
  eligibility: { type: String },
  selection: { type: String },
}, { _id: false });

const feesROISchema = new mongoose.Schema({
  course: { type: String },
  tuitionFee: { type: String },
  avgPackage: { type: String },
}, { _id: false });

const seatIntakeSchema = new mongoose.Schema({
  program: { type: String },
  seats: { type: String },
}, { _id: false });

const admissionsSchema = new mongoose.Schema({
  applicationStatus: { type: String },
  popularPrograms: { type: [String], default: [] },
  feeRangeUG: { type: String },
  feeRangePG: { type: String },
  studyMode: { type: String },
  eligibilitySelection: { type: [eligibilitySelectionSchema], default: [] },
  feesROI: { type: [feesROISchema], default: [] },
  seatIntake: { type: [seatIntakeSchema], default: [] },
  modeOfAdmission: { type: [String], default: [] },
}, { _id: false });

const courseOfferedSchema = new mongoose.Schema({
  courseName: { type: String },
  duration: { type: String },
  branches: { type: [String], default: [] },
}, { _id: false });

const feeRowSchema = new mongoose.Schema({
  particular: { type: String },
  amount: { type: String },
}, { _id: false });
const feeTableSchema = new mongoose.Schema({
  tableName: { type: String },
  rows: { type: [feeRowSchema], default: [] },
}, { _id: false });
const feeStructureSchema = new mongoose.Schema({
  tables: { type: [feeTableSchema], default: [] },
  waivers: { type: [String], default: [] },
}, { _id: false });

const placementBranchSchema = new mongoose.Schema({
  branchName: { type: String },
  percentage: { type: String },
}, { _id: false });
const placementCourseSchema = new mongoose.Schema({
  courseName: { type: String },
  branches: { type: [placementBranchSchema], default: [] },
  overall: { type: String },
}, { _id: false });
const recruiterSchema = new mongoose.Schema({
  name: { type: String },
  imageUrl: { type: String },
}, { _id: false });
const placementYearSchema = new mongoose.Schema({
  year: { type: String },
  courses: { type: [placementCourseSchema], default: [] },
  medianPackage: { type: String },
  averagePackage: { type: String },
  recruiters: { type: [recruiterSchema], default: [] },
}, { _id: false });

const collegeSchema = new mongoose.Schema({
  filter: { type: filterSchema, required: true },
  info: { type: infoSchema, required: true },
  location: { type: locationSchema, required: true },
  admissions: { type: admissionsSchema, default: {} },
  coursesOffered: { type: [courseOfferedSchema], default: [] },
  feeStructure: { type: feeStructureSchema, default: {} },
  placements: { type: [placementYearSchema], default: [] },
  rankings: { type: [rankingSchema], default: [] },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  }
}, { versionKey: false });

collegeSchema.index({ slug: 1 });

collegeSchema.pre('save', function (next) {
  if (!this.slug && this.filter && this.filter.name) {
    this.slug = this.filter.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.model('College', collegeSchema);
