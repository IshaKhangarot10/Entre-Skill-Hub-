const router = require('express').Router();
const { getAll, getById, recommend, create, update, remove } = require('../controllers/businessIdeaController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/recommend', protect, recommend);
router.post('/', protect, roleCheck('admin'), create);
router.put('/:id', protect, roleCheck('admin'), update);
router.delete('/:id', protect, roleCheck('admin'), remove);

module.exports = router;
