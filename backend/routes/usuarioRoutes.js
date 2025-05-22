const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
//Estas son las rutas de endpoints de usuario.

router.get('/', usuarioController.getAllUsuarios);
router.post('/', usuarioController.createUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
