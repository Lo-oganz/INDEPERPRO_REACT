const express = require('express');
const router = express.Router();
const prioridadController = require('../controllers/prioridadController');

router.get('/', prioridadController.getAllPrioridades);

router.get('/:id', prioridadController.getPrioridadById);

router.post('/', prioridadController.createPrioridad);

router.put('/:id', prioridadController.updatePrioridad);

router.delete('/:id', prioridadController.deletePrioridad);

module.exports = router;
