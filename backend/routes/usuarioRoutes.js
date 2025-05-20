const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('../middleware/verifyToken');

// Proteger todas las rutas excepto crear usuario
router.get('/', verifyToken, usuarioController.getAllUsuarios);
router.get('/:id', verifyToken, usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario); // abierto para registro
router.put('/:id', verifyToken, usuarioController.updateUsuario);
router.delete('/:id', verifyToken, usuarioController.deleteUsuario);
router.post('/assign-role', verifyToken, usuarioController.assignRole);

module.exports = router;
