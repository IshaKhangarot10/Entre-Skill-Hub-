const router = require('express').Router();
const ctrl = require('../controllers/learningResourceController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', ctrl.getAll);
router.get('/pending', protect, roleCheck('admin'), ctrl.getPending);
router.get('/:id', ctrl.getById);
router.post('/', protect, roleCheck('mentor', 'admin'), ctrl.create);
router.put('/:id', protect, roleCheck('admin'), ctrl.update);
router.put('/:id/status', protect, roleCheck('admin'), ctrl.updateStatus);
router.delete('/:id', protect, roleCheck('admin'), ctrl.remove);

module.exports = router;
