const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
//Estas son las ruta de endpoints de las tareas, tienen el correcto orden de declaración.

router.get('/usuario/:id_usuario', tareaController.getByUsuario);

router.get('/', tareaController.getAllTareas);
router.get('/:id', tareaController.getTareaById);
router.post('/', tareaController.createTarea);
router.put('/:id', tareaController.updateTarea);
router.delete('/:id', tareaController.deleteTarea);

module.exports = router;
