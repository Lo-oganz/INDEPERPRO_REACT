const express = require('express');
const router = express.Router();
const userProjectController = require('../controllers/userProjectController');

router.get('/', userProjectController.getAllUserProjects);
router.get('/:id', userProjectController.getUserProjectById);
router.post('/', userProjectController.createUserProject);
router.delete('/:id', userProjectController.deleteUserProject);
router.get('/proyectos', userProjectController.getProyectosDeUsuario);
module.exports = router;
