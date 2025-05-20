const Prioridad = require('../models/Prioridad');

exports.getAllPrioridades = (req, res) => {
  Prioridad.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getPrioridadById = (req, res) => {
  const id = req.params.id;
  Prioridad.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ error: 'Prioridad no encontrada' });
    res.json(result[0]);
  });
};

exports.createPrioridad = (req, res) => {
  const { nivel } = req.body;
  if (!nivel) return res.status(400).json({ error: 'El nivel es obligatorio' });

  Prioridad.create(nivel, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Prioridad creada', id: result.insertId });
  });
};
