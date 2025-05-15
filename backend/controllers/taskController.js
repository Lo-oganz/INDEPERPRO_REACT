const Task = require('../models/Task');

exports.getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) {
      console.error('Error al obtener tareas:', err);
      return res.status(500).json({ error: 'Error al obtener tareas' });
    }
    res.json(tasks);
  });
};

exports.getTaskById = (req, res) => {
  Task.getById(req.params.id, (err, task) => {
    if (err) {
      console.error('Error al obtener la tarea:', err);
      return res.status(500).json({ error: 'Error al obtener la tarea' });
    }
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  });
};

exports.createTask = (req, res) => {
  Task.create(req.body, (err, newTask) => {
    if (err) {
      console.error('Error al crear tarea:', err);
      return res.status(500).json({ error: 'Error al crear tarea' });
    }
    res.status(201).json(newTask);
  });
};

exports.updateTask = (req, res) => {
  Task.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error('Error al actualizar tarea:', err);
      return res.status(500).json({ error: 'Error al actualizar tarea' });
    }
    res.json(result);
  });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Error al eliminar tarea:', err);
      return res.status(500).json({ error: 'Error al eliminar tarea' });
    }
    res.json(result);
  });
};
