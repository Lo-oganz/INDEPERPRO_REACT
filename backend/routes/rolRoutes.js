const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
//Estas son las rutas de endpoints de rol, con el orden correcto.

router.get('/', rolController.getAllRoles);
router.get('/:id', rolController.getRolById);
router.post('/', rolController.createRol);
router.put('/:id', rolController.updateRol);
router.delete('/:id', rolController.deleteRol);

module.exports = router;
