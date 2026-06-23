const Feedback = require('../models/Feedback');

exports.getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type) filter.type = req.query.type;
    
    const feedback = await Feedback.find(filter)
      .populate('userId', 'name email')
      .sort('-createdAt');
    res.json({ success: true, data: feedback });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const feedback = await Feedback.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json({ success: true, data: feedback });
  } catch (error) { next(error); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!feedback) return res.status(404).json({ success: false, message: 'Feedback not found' });
    res.json({ success: true, data: feedback });
  } catch (error) { next(error); }
};
