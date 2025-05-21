const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

// Ruta para tareas de un usuario específico
router.get('/usuario/:id_usuario', tareaController.getByUsuario);

// Rutas CRUD básicas
router.get('/', tareaController.getAllTareas);
router.get('/:id', tareaController.getTareaById);
router.post('/', tareaController.createTarea);
router.put('/:id', tareaController.updateTarea);
router.delete('/:id', tareaController.deleteTarea);

module.exports = router;
