import mongoose from 'mongoose';

const highlightBoxSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  value: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { _id: false });

const eligibilityCriteriaSchema = new mongoose.Schema({
  course: { 
    type: String, 
    required: true, 
    trim: true 
  },
  eligibility: { 
    type: String, 
    required: true, 
    trim: true 
  },
  selection: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { _id: false });

const feesROISchema = new mongoose.Schema({
  course: { 
    type: String, 
    required: true, 
    trim: true 
  },
  tuitionFee: { 
    type: String, 
    required: true, 
    trim: true 
  },
  avgPackage: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { _id: false });

const seatIntakeSchema = new mongoose.Schema({
  program: { 
    type: String, 
    required: true, 
    trim: true 
  },
  seats: { 
    type: String, 
    required: true, 
    trim: true 
  }
}, { _id: false });

const tipSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true, 
    trim: true 
  },
  link: { 
    type: String, 
    trim: true 
  }
}, { _id: false });

const admissionSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: [true, 'College slug is required'],
    trim: true,
    index: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [2000, 'Year must be at least 2000'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  description: {
    type: String,
    required: [true, 'Admission description is required'],
    trim: true
  },
  highlightBoxes: {
    type: [highlightBoxSchema],
    default: []
  },
  eligibilityCriteria: {
    type: [eligibilityCriteriaSchema],
    default: []
  },
  feesROI: {
    type: [feesROISchema],
    default: []
  },
  seatIntake: {
    type: [seatIntakeSchema],
    default: []
  },
  admissionSteps: {
    type: [String],
    default: []
  },
  tip: {
    type: tipSchema,
    default: undefined
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
admissionSchema.index({ collegeSlug: 1, year: 1 });

// Virtual for total seats
admissionSchema.virtual('totalSeats').get(function() {
  return this.seatIntake.reduce((total, item) => {
    const seats = parseInt(item.seats.replace(/,/g, '')) || 0;
    return total + seats;
  }, 0);
});

// Static method to find admission data by college and year
admissionSchema.statics.findByCollegeAndYear = function(collegeSlug, year) {
  return this.findOne({ collegeSlug, year });
};

// Instance method to get eligibility for a specific course
admissionSchema.methods.getEligibilityForCourse = function(course) {
  return this.eligibilityCriteria.find(item => item.course === course);
};

// Instance method to get fees and ROI for a specific course
admissionSchema.methods.getFeesROIForCourse = function(course) {
  return this.feesROI.find(item => item.course === course);
};

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
