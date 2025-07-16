import mongoose from 'mongoose';

const feeEntrySchema = new mongoose.Schema({
    collegeSlug: {
        type: String,
        required: true,
        index: true
      },
    category: {
    type: String,
    required: [true, 'Fee category is required'],
    trim: true,
    enum: ['Tuition', 'Hostel+mess', 'Other charges', 'Caution deposits']
  },
  amount: {
    type: Number,
    required: [true, 'Fee amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    enum: ['INR', 'USD', 'EUR'],
    default: 'INR'
  },
  duration: {
    type: String,
    trim: true,
    maxlength: [50, 'Duration too long'],
    default: 'per year'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [300, 'Description too long']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [300, 'Notes too long']
  }
}, { _id: false });

const feesSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: [true, 'College slug is required'],
    trim: true,
    index: true
  },
  feeStructure: {
    type: [feeEntrySchema],
    default: []
  }
}, {
  timestamps: true
});

const Fees = mongoose.model('Fees', feesSchema);

export default Fees;
