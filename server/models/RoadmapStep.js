const mongoose = require('mongoose');

const roadmapStepSchema = new mongoose.Schema({
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    required: true
  },
  resourceLinks: [{
    title: String,
    url: String,
    type: { type: String, enum: ['video', 'article', 'checklist', 'download'] }
  }],
  videoUrl: {
    type: String,
    default: ''
  },
  videoTitle: {
    type: String,
    default: ''
  },
  videoDuration: {
    type: String,
    default: ''
  },
  actionItems: [{
    text: String,
    description: String
  }],
  estimatedDuration: {
    type: String,
    default: '45 mins'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RoadmapStep', roadmapStepSchema);
