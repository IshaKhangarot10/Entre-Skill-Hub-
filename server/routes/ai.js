const router = require('express').Router();
const ctrl = require('../controllers/aiController');
const protect = require('../middleware/auth');

router.get('/recommend-courses', protect, ctrl.recommendCourses);

module.exports = router;
