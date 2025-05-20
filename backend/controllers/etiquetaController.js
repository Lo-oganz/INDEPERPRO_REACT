const pool = require('../config/db');

exports.getAllEtiquetas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM etiquetas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener etiquetas' });
  }
};

exports.createEtiqueta = async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO etiquetas (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ id_etiqueta: result.insertId, nombre });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear etiqueta' });
  }
};

exports.deleteEtiqueta = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM etiquetas WHERE id_etiqueta = ?', [id]);
    res.json({ message: 'Etiqueta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar etiqueta' });
  }
};
