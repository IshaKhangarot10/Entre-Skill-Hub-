const router = require('express').Router();
const { getAll, create, update, remove } = require('../controllers/interestController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', getAll);
router.post('/', protect, roleCheck('admin'), create);
router.put('/:id', protect, roleCheck('admin'), update);
router.delete('/:id', protect, roleCheck('admin'), remove);

module.exports = router;
