const UserProject = require('../models/UserProject');

exports.getAllUserProjects = (req, res) => {
  UserProject.getAll((err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener asignaciones' });
    res.json(data);
  });
};

exports.getUserProjectById = (req, res) => {
  UserProject.getById(req.params.id, (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al obtener asignación' });
    if (!data) return res.status(404).json({ error: 'Asignación no encontrada' });
    res.json(data);
  });
};
exports.getProyectosDeUsuario = (req, res) => {
  const idUsuario = req.query.id_usuario;
  if (!idUsuario) {
    return res.status(400).json({ error: 'id_usuario es requerido' });
  }

  const query = `
    SELECT p.* FROM proyecto p
    JOIN usuario_proyecto up ON p.id_proyecto = up.id_proyecto
    WHERE up.id_usuario = ?
  `;

  db.query(query, [idUsuario], (err, resultados) => {
    if (err) {
      console.error('Error al obtener proyectos:', err);
      return res.status(500).json({ error: 'Error al obtener proyectos' });
    }

    res.json(resultados);
  });
};



exports.createUserProject = (req, res) => {
  const { id_usuario, id_proyecto } = req.body;

  if (!id_usuario || !id_proyecto) {
    return res.status(400).json({ error: 'id_usuario e id_proyecto son requeridos' });
  }

  UserProject.create(req.body, (err, newData) => {
    if (err) return res.status(500).json({ error: 'Error al crear asignación' });
    res.status(201).json(newData);
  });
};

exports.deleteUserProject = (req, res) => {
  UserProject.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar asignación' });
    res.json(result);
  });
};
