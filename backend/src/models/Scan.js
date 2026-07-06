const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  objectName: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  contamination: {
    type: String,
    enum: ['None', 'Liquid', 'Organic Waste', 'E-Waste Mixed'],
    default: 'None'
  },
  bin: {
    type: String,
    required: true
  },
  carbonSaved: {
    type: Number,
    default: 0.0
  },
  pointsEarned: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Verified', 'Contaminated'],
    default: 'Pending'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', ScanSchema);
