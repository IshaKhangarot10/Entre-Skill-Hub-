const router = require('express').Router();
const ctrl = require('../controllers/adminController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// All admin routes require admin role
router.use(protect, roleCheck('admin'));

router.get('/stats', ctrl.getStats);
router.get('/users', ctrl.getUsers);
router.get('/users/:id', ctrl.getUserById);
router.put('/users/:id/status', ctrl.updateUserStatus);

module.exports = router;
