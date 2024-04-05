const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.verifyToken)

router.post('/', employeeController.addEmployee);

router.get('/', employeeController.getAllEmployees);

module.exports = router;