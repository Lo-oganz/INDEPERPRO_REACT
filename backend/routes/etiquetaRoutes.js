const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/etiquetaController');

router.get('/', etiquetaController.getAllEtiquetas);

router.get('/:id', etiquetaController.getEtiquetaById);

router.post('/', etiquetaController.createEtiqueta);

router.put('/:id', etiquetaController.updateEtiqueta);

router.delete('/:id', etiquetaController.deleteEtiqueta);

module.exports = router;
