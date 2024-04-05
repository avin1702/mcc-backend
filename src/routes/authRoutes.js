const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {loginSchema} = require('../schemas/authSchema')
const {validateRequest} = require('../middlewares/validateMiddleware')
// Route to login admin
router.post('/login', validateRequest(loginSchema) ,authController.loginAdmin);

// Route to refresh tokens
router.post('/refresh', authController.refreshTokens);

module.exports = router;