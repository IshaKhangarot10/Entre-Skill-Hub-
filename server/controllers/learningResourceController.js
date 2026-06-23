const LearningResource = require('../models/LearningResource');

exports.getAll = async (req, res, next) => {
  try {
    const filter = { status: 'approved' };
    if (req.query.roadmapId) filter.relatedRoadmapId = req.query.roadmapId;
    if (req.query.type) filter.type = req.query.type;
    
    const resources = await LearningResource.find(filter)
      .populate('uploadedBy', 'name')
      .sort('-createdAt');
    res.json({ success: true, data: resources });
  } catch (error) { next(error); }
};

exports.getById = async (req, res, next) => {
  try {
    const resource = await LearningResource.findById(req.params.id).populate('uploadedBy', 'name');
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, data: resource });
  } catch (error) { next(error); }
};

// Mentor upload (status: pending)
exports.create = async (req, res, next) => {
  try {
    const resource = await LearningResource.create({
      ...req.body,
      uploadedBy: req.user.id,
      status: req.user.role === 'admin' ? 'approved' : 'pending'
    });
    res.status(201).json({ success: true, data: resource });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const resource = await LearningResource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, data: resource });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    await LearningResource.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) { next(error); }
};

// Admin: get pending resources
exports.getPending = async (req, res, next) => {
  try {
    const resources = await LearningResource.find({ status: 'pending' })
      .populate('uploadedBy', 'name email')
      .sort('-createdAt');
    res.json({ success: true, data: resources });
  } catch (error) { next(error); }
};

// Admin: approve/reject
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be approved or rejected' });
    }
    const resource = await LearningResource.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!resource) return res.status(404).json({ success: false, message: 'Resource not found' });
    res.json({ success: true, data: resource });
  } catch (error) { next(error); }
};
