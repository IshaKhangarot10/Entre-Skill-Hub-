const User = require('../models/User');
const Mentor = require('../models/Mentor');
const BusinessIdea = require('../models/BusinessIdea');
const Roadmap = require('../models/Roadmap');
const ProgressTracking = require('../models/ProgressTracking');
const MentorSession = require('../models/MentorSession');
const LearningResource = require('../models/LearningResource');
const Feedback = require('../models/Feedback');

// @route GET /api/admin/stats
exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalMentors = await Mentor.countDocuments({ verificationStatus: 'approved' });
    const pendingMentors = await Mentor.countDocuments({ verificationStatus: 'pending' });
    const totalIdeas = await BusinessIdea.countDocuments();
    const totalSessions = await MentorSession.countDocuments();
    const pendingResources = await LearningResource.countDocuments({ status: 'pending' });
    const openFeedback = await Feedback.countDocuments({ status: 'open' });
    
    // Calculate average roadmap completion
    const progressData = await ProgressTracking.aggregate([
      { $group: { _id: null, avgCompletion: { $avg: '$percentComplete' } } }
    ]);
    const avgCompletion = progressData.length > 0 ? Math.round(progressData[0].avgCompletion * 10) / 10 : 0;

    // Calculate satisfaction score
    const feedbackData = await Feedback.aggregate([
      { $match: { rating: { $exists: true } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const avgSatisfaction = feedbackData.length > 0 ? Math.round(feedbackData[0].avgRating * 10) / 10 : 4.8;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalMentors,
        pendingMentors,
        totalIdeas,
        totalSessions,
        pendingResources,
        openFeedback,
        avgCompletion,
        avgSatisfaction
      }
    });
  } catch (error) { next(error); }
};

// @route GET /api/admin/users
exports.getUsers = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.status) filter.status = req.query.status;
    
    const users = await User.find(filter)
      .select('-password')
      .populate('skills')
      .sort('-createdAt');
    res.json({ success: true, data: users });
  } catch (error) { next(error); }
};

// @route GET /api/admin/users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('skills')
      .populate('interests')
      .populate('bookmarks');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    const progress = await ProgressTracking.find({ userId: user._id })
      .populate('roadmapId');
    
    res.json({ success: true, data: { user, progress } });
  } catch (error) { next(error); }
};

// @route PUT /api/admin/users/:id/status
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'suspended'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};
