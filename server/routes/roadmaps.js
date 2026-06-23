const router = require('express').Router();
const { getAll, getById, getByIdeaId, create, update } = require('../controllers/roadmapController');
const stepCtrl = require('../controllers/roadmapStepController');
const protect = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', getAll);
router.get('/:id', protect, getById);
router.get('/idea/:ideaId', protect, getByIdeaId);
router.post('/', protect, roleCheck('admin'), create);
router.put('/:id', protect, roleCheck('admin'), update);

// Step sub-routes
router.get('/:roadmapId/steps', stepCtrl.getByRoadmap);
router.get('/step/:id', stepCtrl.getById);
router.post('/step', protect, roleCheck('admin'), stepCtrl.create);
router.put('/step/:id', protect, roleCheck('admin'), stepCtrl.update);
router.delete('/step/:id', protect, roleCheck('admin'), stepCtrl.remove);

module.exports = router;
