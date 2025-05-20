const express = require('express');
const router = express.Router();
const tareaEtiquetaController = require('../controllers/tareaEtiquetaController');

router.post('/', tareaEtiquetaController.agregarEtiqueta);
router.get('/:id', tareaEtiquetaController.obtenerEtiquetasDeTarea);
router.delete('/:id', tareaEtiquetaController.eliminarEtiquetasDeTarea);

module.exports = router;
