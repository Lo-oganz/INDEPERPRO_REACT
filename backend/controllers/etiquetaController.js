const Etiqueta = require('../models/Etiqueta');

exports.getAllEtiquetas = (req, res) => {
  Etiqueta.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getEtiquetaById = (req, res) => {
  const id = req.params.id;
  Etiqueta.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json(result[0]);
  });
};

exports.createEtiqueta = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

  Etiqueta.create(nombre, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Etiqueta creada', id: result.insertId });
  });
};

exports.updateEtiqueta = (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

  Etiqueta.update(id, nombre, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Etiqueta actualizada' });
  });
};

exports.deleteEtiqueta = (req, res) => {
  const id = req.params.id;
  Etiqueta.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Etiqueta eliminada' });
  });
};
