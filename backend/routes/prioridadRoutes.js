const express = require('express');
const router = express.Router();
const prioridadController = require('../controllers/prioridadController');
//Estas son las rutas de endpoints de la tabla de prioridad.

router.get('/', prioridadController.getAllPrioridades);
router.get('/:id', prioridadController.getPrioridadById);
router.post('/', prioridadController.createPrioridad);

module.exports = router;
