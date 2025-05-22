const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//Esta es la ruta de endpoint.
router.post('/login', authController.login);

module.exports = router;
