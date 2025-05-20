const pool = require('../config/db');

exports.getAllPrioridades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prioridades');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener prioridades' });
  }
};

exports.getPrioridadById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM prioridades WHERE id_prioridad = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Prioridad no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la prioridad' });
  }
};

exports.createPrioridad = async (req, res) => {
  const { nombre, nivel } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO prioridades (nombre, nivel) VALUES (?, ?)', [nombre, nivel]);
    res.status(201).json({ id_prioridad: result.insertId, nombre, nivel });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la prioridad' });
  }
};
