const mongoose = require('mongoose');

const businessIdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  matchedSkills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
  }],
  matchedInterests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interest'
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  costEstimate: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 5000 }
  },
  icon: {
    type: String,
    default: 'lightbulb'
  },
  tags: [{
    type: String
  }],
  category: {
    type: String,
    default: 'General'
  },
  estimatedTime: {
    type: String,
    default: '2-4 weeks'
  },
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BusinessIdea', businessIdeaSchema);
