import mongoose from 'mongoose';

const seatEntrySchema = new mongoose.Schema({
  branch: {
    type: String,
    required: [true, 'Branch name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: ['OPEN', 'OPEN-PwD', 'GEN-EWS', 'GEN-EWS-PwD', 'OBC-NCL', 'OBC-NCL-PwD', 'SC', 'SC-PwD', 'ST', 'ST-PwD']
  },
  gender: {
    type: String,
    required: [true, 'Gender pool is required'],
    trim: true,
    enum: ['Gender-Neutral', 'Female-only']
  },
  seats: {
    type: Number,
    required: [true, 'Number of seats is required'],
    min: [0, 'Seats cannot be negative']
  }
}, { _id: false });

const seatMatrixSchema = new mongoose.Schema({
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
  seatData: {
    type: [seatEntrySchema],
    default: []
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
seatMatrixSchema.index({ collegeSlug: 1, year: 1 });

// Virtual for total seats per branch
seatMatrixSchema.virtual('totalSeatsByBranch').get(function() {
  const branchTotals = {};
  this.seatData.forEach(entry => {
    if (!branchTotals[entry.branch]) {
      branchTotals[entry.branch] = 0;
    }
    branchTotals[entry.branch] += entry.seats;
  });
  return branchTotals;
});

// Virtual for total seats per category
seatMatrixSchema.virtual('totalSeatsByCategory').get(function() {
  const categoryTotals = {};
  this.seatData.forEach(entry => {
    if (!categoryTotals[entry.category]) {
      categoryTotals[entry.category] = 0;
    }
    categoryTotals[entry.category] += entry.seats;
  });
  return categoryTotals;
});

// Static method to find seat matrix by college and year
seatMatrixSchema.statics.findByCollegeAndYear = function(collegeSlug, year) {
  return this.findOne({ collegeSlug, year });
};

// Instance method to get seats for a specific branch and category
seatMatrixSchema.methods.getSeatsForBranchAndCategory = function(branch, category) {
  return this.seatData.filter(entry => 
    entry.branch === branch && entry.category === category
  );
};

const SeatMatrix = mongoose.model('SeatMatrix', seatMatrixSchema);

export default SeatMatrix;
