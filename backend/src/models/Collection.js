const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
  collector: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  binStatus: {
    type: String,
    enum: ['Full', 'Medium', 'Empty'],
    required: true
  },
  verificationStatus: {
    type: String,
    enum: ['Pending', 'Verified', 'Contaminated'],
    default: 'Pending'
  },
  qrCodeHash: {
    type: String,
    required: true
  },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Collection', CollectionSchema);
