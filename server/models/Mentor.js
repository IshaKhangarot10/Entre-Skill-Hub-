const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  expertise: [{
    type: String
  }],
  experience: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  linkedIn: {
    type: String,
    default: ''
  },
  portfolio: {
    type: String,
    default: ''
  },
  totalMentees: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  avgResponseTime: {
    type: String,
    default: '2.4h'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);
