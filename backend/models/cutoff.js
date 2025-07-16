import mongoose from 'mongoose';

const cutoffEntrySchema = new mongoose.Schema({
  branch: {
    type: String,
    required: [true, 'Branch name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true,
    enum: ['OPEN', 'OBC-NCL', 'SC', 'ST', 'GEN-EWS', 'OPEN-PwD']
  },
  quota: {
    type: String,
    required: [true, 'Quota is required'],
    trim: true,
    enum: ['AI', 'HS', 'OS', 'GO']
  },
  openingRank: {
    type: Number,
    required: [true, 'Opening rank is required'],
    min: [1, 'Opening rank must be at least 1']
  },
  closingRank: {
    type: Number,
    required: [true, 'Closing rank is required'],
    min: [1, 'Closing rank must be at least 1']
  }
}, { _id: false });

const cutoffSchema = new mongoose.Schema({
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
  round: {
    type: Number,
    required: [true, 'Round number is required'],
    min: [1, 'Round must be at least 1'],
    max: [10, 'Round cannot exceed 10']
  },
  cutoffData: {
    type: [cutoffEntrySchema],
    default: []
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
cutoffSchema.index({ collegeSlug: 1, year: 1, round: 1 });

// Validation to ensure closing rank is greater than or equal to opening rank
cutoffEntrySchema.pre('validate', function(next) {
  if (this.closingRank < this.openingRank) {
    this.invalidate('closingRank', 'Closing rank must be greater than or equal to opening rank');
  }
  next();
});

const Cutoff = mongoose.model('Cutoff', cutoffSchema);

export default Cutoff; 