const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const verifyToken = require('../middleware/verifyToken');

// Protegemos todas las rutas
router.get('/', verifyToken, tareaController.getAllTareas);
router.get('/:id', verifyToken, tareaController.getTareaById);
router.post('/', verifyToken, tareaController.createTarea);
router.put('/:id', verifyToken, tareaController.updateTarea);
router.delete('/:id', verifyToken, tareaController.deleteTarea);
router.get('/usuario/:id_usuario', verifyToken, tareaController.getByUsuario);

module.exports = router;
