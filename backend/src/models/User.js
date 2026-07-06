const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'collector', 'admin'],
    default: 'student'
  },
  hostel: {
    type: String,
    default: ''
  },
  department: {
    type: String,
    default: ''
  },
  ecoPoints: {
    type: Number,
    default: 0
  },
  ecoScore: {
    type: Number,
    default: 80,
    min: 0,
    max: 100
  },
  carbonSaved: {
    type: Number,
    default: 0.0
  },
  streak: {
    type: Number,
    default: 0
  },
  badges: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
