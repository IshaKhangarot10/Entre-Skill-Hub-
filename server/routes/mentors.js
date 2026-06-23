const router = require('express').Router();
const ctrl = require('../controllers/mentorController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', ctrl.getAll);
router.get('/me', protect, ctrl.getMyProfile);
router.get('/pending', protect, roleCheck('admin'), ctrl.getPending);
router.get('/:id', ctrl.getById);
router.post('/register', protect, ctrl.register);
router.put('/profile', protect, roleCheck('mentor'), ctrl.updateProfile);
router.put('/:id/verify', protect, roleCheck('admin'), ctrl.updateVerification);

module.exports = router;
