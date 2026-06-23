const mongoose = require('mongoose');

const learningResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['video', 'article', 'checklist', 'podcast', 'download'],
    required: true
  },
  url: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  relatedRoadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap'
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  fileSize: {
    type: String,
    default: ''
  },
  fileName: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LearningResource', learningResourceSchema);
