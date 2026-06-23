const MentorSession = require('../models/MentorSession');
const Mentor = require('../models/Mentor');

exports.getAll = async (req, res, next) => {
  try {
    let filter = {};
    
    if (req.user.role === 'mentor') {
      const mentor = await Mentor.findOne({ userId: req.user.id });
      if (mentor) filter.mentorId = mentor._id;
    } else if (req.user.role === 'user') {
      filter.menteeId = req.user.id;
    }
    
    const sessions = await MentorSession.find(filter)
      .populate({ path: 'mentorId', populate: { path: 'userId', select: 'name email' } })
      .populate('menteeId', 'name email')
      .sort('-scheduledAt');
    res.json({ success: true, data: sessions });
  } catch (error) { next(error); }
};

exports.getById = async (req, res, next) => {
  try {
    const session = await MentorSession.findById(req.params.id)
      .populate({ path: 'mentorId', populate: { path: 'userId', select: 'name email' } })
      .populate('menteeId', 'name email');
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, data: session });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const session = await MentorSession.create({
      ...req.body,
      menteeId: req.user.id
    });
    res.status(201).json({ success: true, data: session });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const session = await MentorSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.json({ success: true, data: session });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    await MentorSession.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Session deleted' });
  } catch (error) { next(error); }
};
