const Tarea = require('../models/tarea');

exports.getAllTareas = (req, res) => {
  Tarea.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTareaById = (req, res) => {
  const { id } = req.params;
  Tarea.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.createTarea = (req, res) => {
  const data = req.body;
  Tarea.create(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Tarea creada', id: result.insertId });
  });
};

exports.updateTarea = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  Tarea.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Tarea actualizada' });
  });
};

exports.deleteTarea = (req, res) => {
  const { id } = req.params;
  Tarea.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Tarea eliminada' });
  });
};
