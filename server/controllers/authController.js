const User = require('../models/User');
const { validationResult } = require('express-validator');

// @route POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password, phone });
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingComplete: user.onboardingComplete
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account suspended. Contact support.' });
    }

    const token = user.getSignedJwtToken();

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingComplete: user.onboardingComplete,
        skills: user.skills,
        interests: user.interests,
        bookmarks: user.bookmarks
      }
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/auth/me
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('skills')
      .populate('interests')
      .populate('bookmarks');

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/auth/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'phone', 'skills', 'interests', 'budget', 'timeCommitment', 'goal', 'onboardingComplete', 'bookmarks'];
    const updates = {};
    
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).populate('skills').populate('interests').populate('bookmarks');

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/auth/bookmark/:ideaId
exports.toggleBookmark = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const ideaId = req.params.ideaId;
    
    const index = user.bookmarks.indexOf(ideaId);
    if (index > -1) {
      user.bookmarks.splice(index, 1);
    } else {
      user.bookmarks.push(ideaId);
    }
    
    await user.save();
    
    res.json({ success: true, bookmarks: user.bookmarks });
  } catch (error) {
    next(error);
  }
};
