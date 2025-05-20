const express = require('express');
const router = express.Router();
const prioridadController = require('../controllers/prioridadController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, prioridadController.getAllPrioridades);
router.get('/:id', verifyToken, prioridadController.getPrioridadById);
router.post('/', verifyToken, prioridadController.createPrioridad);

module.exports = router;
