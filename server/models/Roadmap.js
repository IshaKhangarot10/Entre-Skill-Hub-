const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  businessIdeaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessIdea',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  estimatedTime: {
    type: String,
    default: '3-4 weeks'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  prerequisites: {
    type: String,
    default: 'None'
  },
  totalSteps: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
