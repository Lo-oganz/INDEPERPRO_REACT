const Etiqueta = require('../models/Etiqueta');

exports.getAllEtiquetas = (req, res) => {
  Etiqueta.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
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

exports.deleteEtiqueta = (req, res) => {
  const id = req.params.id;
  Etiqueta.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Etiqueta eliminada' });
  });
};
