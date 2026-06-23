const router = require('express').Router();
const ctrl = require('../controllers/mentorSessionController');
const protect = require('../middleware/auth');

router.get('/', protect, ctrl.getAll);
router.get('/:id', protect, ctrl.getById);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
