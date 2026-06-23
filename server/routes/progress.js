const router = require('express').Router();
const ctrl = require('../controllers/progressController');
const protect = require('../middleware/auth');

router.get('/', protect, ctrl.getMyProgress);
router.get('/:roadmapId', protect, ctrl.getByRoadmap);
router.post('/complete', protect, ctrl.completeStep);
router.put('/:roadmapId/hours', protect, ctrl.updateHours);

module.exports = router;
