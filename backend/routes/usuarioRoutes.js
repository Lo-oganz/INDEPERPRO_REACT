const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

const authAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.id_rol === 1) {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
};

router.get('/', usuarioController.getAllUsuarios);

router.get('/:id', usuarioController.getUsuarioById);

router.post('/', usuarioController.createUsuario);

router.put('/:id', usuarioController.updateUsuario);

router.delete('/:id', usuarioController.deleteUsuario);

router.post('/assign-role', authAdminMiddleware, usuarioController.assignRole);

module.exports = router;
