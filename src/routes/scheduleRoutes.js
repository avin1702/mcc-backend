const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();



router.use(authMiddleware.verifyToken)

router.get('/', scheduleController.getAllSchedules);
router.post('/', scheduleController.createSchedules);

module.exports = router;