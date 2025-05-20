const express = require('express');
const router = express.Router();
const tareaEtiquetaController = require('../controllers/tareaEtiquetaController');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, tareaEtiquetaController.agregarEtiqueta);
router.get('/:id', verifyToken, tareaEtiquetaController.obtenerEtiquetasDeTarea);
router.delete('/:id', verifyToken, tareaEtiquetaController.eliminarEtiquetasDeTarea);

module.exports = router;
