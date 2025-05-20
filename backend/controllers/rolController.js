const pool = require('../config/db');

exports.getAllRoles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM roles');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

exports.getRolById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM roles WHERE id_rol = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};

exports.createRol = async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO roles (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id_rol: result.insertId, nombre });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el rol' });
  }
};

exports.updateRol = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await pool.query('UPDATE roles SET nombre = ? WHERE id_rol = ?', [nombre, id]);
    res.json({ message: 'Rol actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el rol' });
  }
};

exports.deleteRol = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM roles WHERE id_rol = ?', [id]);
    res.json({ message: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el rol' });
  }
};
