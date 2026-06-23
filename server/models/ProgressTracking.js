const mongoose = require('mongoose');

const progressTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true
  },
  businessIdeaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessIdea'
  },
  completedSteps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoadmapStep'
  }],
  percentComplete: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  currentStepOrder: {
    type: Number,
    default: 1
  },
  hoursInvested: {
    type: Number,
    default: 0
  },
  lastAccessedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index: one progress record per user per roadmap
progressTrackingSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

module.exports = mongoose.model('ProgressTracking', progressTrackingSchema);
