const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/etiquetaController');

router.get('/', etiquetaController.getAllEtiquetas);
router.post('/', etiquetaController.createEtiqueta);
router.delete('/:id', etiquetaController.deleteEtiqueta);

module.exports = router;

