const pool = require('../config/db');
//Controlador de rol que tiene sus pocas funciones de datos creadas

exports.getAllRoles = (req, res) => {
  pool.query('SELECT * FROM rol', (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener los roles' });
    res.json(results);
  });
};

exports.getRolById = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM rol WHERE id_rol = ?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener el rol' });
    if (results.length === 0) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(results[0]);
  });
};

exports.createRol = (req, res) => {
  const { nombre } = req.body;

  pool.query('INSERT INTO rol (nombre) VALUES (?)', [nombre], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al crear el rol' });
    res.status(201).json({ id_rol: result.insertId, nombre });
  });
};

exports.updateRol = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  pool.query('UPDATE roles SET nombre = ? WHERE id_rol = ?', [nombre, id], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al actualizar el rol' });
    res.json({ message: 'Rol actualizado correctamente' });
  });
};

exports.deleteRol = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM roles WHERE id_rol = ?', [id], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al eliminar el rol' });
    res.json({ message: 'Rol eliminado correctamente' });
  });
};
