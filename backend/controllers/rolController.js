const Rol = require('../models/Rol');

exports.getAllRoles = (req, res) => {
  Rol.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getRolById = (req, res) => {
  const id = req.params.id;
  Rol.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(result[0]);
  });
};

exports.createRol = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre del rol es obligatorio' });

  Rol.create(nombre, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Rol creado', id: result.insertId });
  });
};

exports.updateRol = (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: 'El nombre del rol es obligatorio' });

  Rol.update(id, nombre, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Rol actualizado' });
  });
};

exports.deleteRol = (req, res) => {
  const id = req.params.id;
  Rol.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Rol eliminado' });
  });
};
