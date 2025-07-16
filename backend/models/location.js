import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  collegeSlug: {
    type: String,
    required: true,
    index: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^[\+]?[1-9][\d]{7,14}$/, 'Invalid phone number']
  },
  officialWebsite: {
    type: String,
    required: true,
    trim: true,
    match: [/^https?:\/\/.+/, 'Must start with http:// or https://']
  },
  googleMapsIframe: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Location', locationSchema);
