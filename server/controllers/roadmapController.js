const Roadmap = require('../models/Roadmap');
const RoadmapStep = require('../models/RoadmapStep');
const ProgressTracking = require('../models/ProgressTracking');

// @route GET /api/roadmaps/:id
exports.getById = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate('businessIdeaId');
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    
    const steps = await RoadmapStep.find({ roadmapId: roadmap._id }).sort('order');
    
    // Get user progress if authenticated
    let progress = null;
    if (req.user) {
      progress = await ProgressTracking.findOne({ userId: req.user.id, roadmapId: roadmap._id });
    }
    
    res.json({ success: true, data: { roadmap, steps, progress } });
  } catch (error) { next(error); }
};

// @route GET /api/roadmaps/idea/:ideaId
exports.getByIdeaId = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOne({ businessIdeaId: req.params.ideaId }).populate('businessIdeaId');
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found for this idea' });
    
    const steps = await RoadmapStep.find({ roadmapId: roadmap._id }).sort('order');
    
    let progress = null;
    if (req.user) {
      progress = await ProgressTracking.findOne({ userId: req.user.id, roadmapId: roadmap._id });
    }
    
    res.json({ success: true, data: { roadmap, steps, progress } });
  } catch (error) { next(error); }
};

// @route GET /api/roadmaps
exports.getAll = async (req, res, next) => {
  try {
    const roadmaps = await Roadmap.find().populate('businessIdeaId');
    res.json({ success: true, data: roadmaps });
  } catch (error) { next(error); }
};

// @route POST /api/roadmaps (admin)
exports.create = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.create(req.body);
    res.status(201).json({ success: true, data: roadmap });
  } catch (error) { next(error); }
};

// @route PUT /api/roadmaps/:id (admin)
exports.update = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!roadmap) return res.status(404).json({ success: false, message: 'Roadmap not found' });
    res.json({ success: true, data: roadmap });
  } catch (error) { next(error); }
};
