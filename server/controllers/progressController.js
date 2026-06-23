const ProgressTracking = require('../models/ProgressTracking');
const RoadmapStep = require('../models/RoadmapStep');
const Roadmap = require('../models/Roadmap');

// Get all progress for current user
exports.getMyProgress = async (req, res, next) => {
  try {
    const progress = await ProgressTracking.find({ userId: req.user.id })
      .populate('roadmapId')
      .populate('businessIdeaId')
      .sort('-lastAccessedAt');
    res.json({ success: true, data: progress });
  } catch (error) { next(error); }
};

// Get progress for a specific roadmap
exports.getByRoadmap = async (req, res, next) => {
  try {
    let progress = await ProgressTracking.findOne({
      userId: req.user.id,
      roadmapId: req.params.roadmapId
    }).populate('completedSteps');
    
    if (!progress) {
      // Auto-create progress tracking
      const roadmap = await Roadmap.findById(req.params.roadmapId);
      progress = await ProgressTracking.create({
        userId: req.user.id,
        roadmapId: req.params.roadmapId,
        businessIdeaId: roadmap ? roadmap.businessIdeaId : null
      });
    }
    
    res.json({ success: true, data: progress });
  } catch (error) { next(error); }
};

// Mark a step as complete
exports.completeStep = async (req, res, next) => {
  try {
    const { roadmapId, stepId } = req.body;
    
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    
    let progress = await ProgressTracking.findOne({
      userId: req.user.id,
      roadmapId
    });
    
    if (!progress) {
      progress = await ProgressTracking.create({
        userId: req.user.id,
        roadmapId,
        businessIdeaId: roadmap.businessIdeaId
      });
    }
    
    // Add step if not already completed
    if (!progress.completedSteps.includes(stepId)) {
      progress.completedSteps.push(stepId);
    }
    
    // Calculate percentage
    const totalSteps = await RoadmapStep.countDocuments({ roadmapId });
    progress.percentComplete = Math.round((progress.completedSteps.length / totalSteps) * 100);
    progress.currentStepOrder = progress.completedSteps.length + 1;
    progress.lastAccessedAt = new Date();
    
    await progress.save();
    
    res.json({ success: true, data: progress });
  } catch (error) { next(error); }
};

// Update hours invested
exports.updateHours = async (req, res, next) => {
  try {
    const progress = await ProgressTracking.findOneAndUpdate(
      { userId: req.user.id, roadmapId: req.params.roadmapId },
      { $inc: { hoursInvested: req.body.hours }, lastAccessedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, data: progress });
  } catch (error) { next(error); }
};
