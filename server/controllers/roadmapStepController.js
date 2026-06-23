const RoadmapStep = require('../models/RoadmapStep');

exports.getById = async (req, res, next) => {
  try {
    const step = await RoadmapStep.findById(req.params.id);
    if (!step) return res.status(404).json({ success: false, message: 'Step not found' });
    res.json({ success: true, data: step });
  } catch (error) { next(error); }
};

exports.getByRoadmap = async (req, res, next) => {
  try {
    const steps = await RoadmapStep.find({ roadmapId: req.params.roadmapId }).sort('order');
    res.json({ success: true, data: steps });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const step = await RoadmapStep.create(req.body);
    res.status(201).json({ success: true, data: step });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const step = await RoadmapStep.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!step) return res.status(404).json({ success: false, message: 'Step not found' });
    res.json({ success: true, data: step });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    await RoadmapStep.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Step deleted' });
  } catch (error) { next(error); }
};
