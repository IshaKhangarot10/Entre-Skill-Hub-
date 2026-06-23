const router = require('express').Router();
const ctrl = require('../controllers/feedbackController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', protect, roleCheck('admin'), ctrl.getAll);
router.post('/', protect, ctrl.create);
router.put('/:id/status', protect, roleCheck('admin'), ctrl.updateStatus);

module.exports = router;
