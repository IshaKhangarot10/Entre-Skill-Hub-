const Interest = require('../models/Interest');

exports.getAll = async (req, res, next) => {
  try {
    const interests = await Interest.find().sort('name');
    res.json({ success: true, data: interests });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const interest = await Interest.create(req.body);
    res.status(201).json({ success: true, data: interest });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const interest = await Interest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!interest) return res.status(404).json({ success: false, message: 'Interest not found' });
    res.json({ success: true, data: interest });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const interest = await Interest.findByIdAndDelete(req.params.id);
    if (!interest) return res.status(404).json({ success: false, message: 'Interest not found' });
    res.json({ success: true, message: 'Interest deleted' });
  } catch (error) { next(error); }
};
