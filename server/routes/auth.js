const router = require('express').Router();
const { body } = require('express-validator');
const { register, login, getProfile, updateProfile, toggleBookmark } = require('../controllers/authController');
const protect = require('../middleware/auth');

router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], login);

router.get('/me', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/bookmark/:ideaId', protect, toggleBookmark);

module.exports = router;
