const Project = require('../models/Project');

exports.getAllProjects = (req, res) => {
  Project.getAll((err, projects) => {
    if (err) {
      console.error('Error al obtener proyectos:', err);
      return res.status(500).json({ error: 'Error al obtener proyectos' });
    }
    res.json(projects);
  });
};

exports.getProjectById = (req, res) => {
  const { id } = req.params;
  Project.getById(id, (err, project) => {
    if (err) {
      console.error('Error al obtener el proyecto:', err);
      return res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(project); 
  });
};

exports.createProject = (req, res) => {
  const { nombre, descripcion, estado } = req.body;
  Project.create({ nombre, descripcion, estado }, (err, newProject) => {
    if (err) {
      console.error('Error al crear proyecto:', err);
      return res.status(500).json({ error: 'Error al crear proyecto' });
    }
    res.status(201).json(newProject);
  });
};

exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;
  Project.update(id, { nombre, descripcion, estado }, (err, updatedProject) => {
    if (err) {
      console.error('Error al actualizar proyecto:', err);
      return res.status(500).json({ error: 'Error al actualizar proyecto' });
    }
    res.json(updatedProject);
  });
};

exports.deleteProject = (req, res) => {
  const { id } = req.params;
  Project.delete(id, (err, message) => {
    if (err) {
      console.error('Error al eliminar proyecto:', err);
      return res.status(500).json({ error: 'Error al eliminar proyecto' });
    }
    res.json(message);
  });
};
