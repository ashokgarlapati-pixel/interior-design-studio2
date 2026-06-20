const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[0-9\s-]{7,15}$/, 'Please provide a valid phone number format']
  },
  location: {
    type: String,
    required: [true, 'Project location is required'],
    trim: true,
    maxlength: [250, 'Location text is too long']
  },
  projectType: {
    type: String,
    required: [true, 'Project type selection is required'],
    enum: {
      values: ['Residential', 'Commercial', 'Office', 'Luxury Villa', 'Apartment', 'Restaurant', 'Other'],
      message: '{VALUE} is not a valid project category'
    }
  },
  budget: {
    type: String,
    required: [true, 'Estimated budget range is required']
  },
  designStyle: {
    type: String,
    required: [true, 'Preferred design style selection is required']
  },
  message: {
    type: String,
    required: [true, 'Project vision statement/message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds updatedAt and createdAt automatically
});

module.exports = mongoose.model('Consultation', consultationSchema);
