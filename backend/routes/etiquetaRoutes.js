const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/etiquetaController');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, etiquetaController.getAllEtiquetas);
router.post('/', verifyToken, etiquetaController.createEtiqueta);
router.delete('/:id', verifyToken, etiquetaController.deleteEtiqueta);

module.exports = router;
