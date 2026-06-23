const Mentor = require('../models/Mentor');
const User = require('../models/User');

// @route GET /api/mentors
exports.getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.verificationStatus = req.query.status;
    else filter.verificationStatus = 'approved';
    
    const mentors = await Mentor.find(filter).populate('userId', 'name email');
    res.json({ success: true, data: mentors });
  } catch (error) { next(error); }
};

// @route GET /api/mentors/:id
exports.getById = async (req, res, next) => {
  try {
    const mentor = await Mentor.findById(req.params.id).populate('userId', 'name email');
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
    res.json({ success: true, data: mentor });
  } catch (error) { next(error); }
};

// @route POST /api/mentors/register
exports.register = async (req, res, next) => {
  try {
    const existing = await Mentor.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Already registered as mentor', data: existing });
    }
    
    const mentor = await Mentor.create({
      userId: req.user.id,
      ...req.body
    });
    
    // Update user role to mentor
    await User.findByIdAndUpdate(req.user.id, { role: 'mentor' });
    
    res.status(201).json({ success: true, data: mentor });
  } catch (error) { next(error); }
};

// @route PUT /api/mentors/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const mentor = await Mentor.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor profile not found' });
    res.json({ success: true, data: mentor });
  } catch (error) { next(error); }
};

// @route GET /api/mentors/me
exports.getMyProfile = async (req, res, next) => {
  try {
    const mentor = await Mentor.findOne({ userId: req.user.id }).populate('userId', 'name email');
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor profile not found' });
    res.json({ success: true, data: mentor });
  } catch (error) { next(error); }
};

// Admin: approve/reject mentor
exports.updateVerification = async (req, res, next) => {
  try {
    const { verificationStatus } = req.body;
    if (!['approved', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({ success: false, message: 'Status must be approved or rejected' });
    }
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      { verificationStatus },
      { new: true }
    ).populate('userId', 'name email');
    if (!mentor) return res.status(404).json({ success: false, message: 'Mentor not found' });
    res.json({ success: true, data: mentor });
  } catch (error) { next(error); }
};

// Admin: get pending
exports.getPending = async (req, res, next) => {
  try {
    const mentors = await Mentor.find({ verificationStatus: 'pending' }).populate('userId', 'name email');
    res.json({ success: true, data: mentors });
  } catch (error) { next(error); }
};
