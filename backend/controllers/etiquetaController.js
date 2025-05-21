const pool = require('../config/db');

exports.getAllEtiquetas = (req, res) => {
  pool.query('SELECT * FROM etiqueta', (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener etiquetas' });
    res.json(results);
  });
};

exports.createEtiqueta = (req, res) => {
  const { nombre } = req.body;

  pool.query('INSERT INTO etiqueta (nombre) VALUES (?)', [nombre], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al crear etiqueta' });
    res.status(201).json({ id_etiqueta: result.insertId, nombre });
  });
};

exports.deleteEtiqueta = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM etiqueta WHERE id_etiqueta = ?', [id], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al eliminar etiqueta' });
    res.json({ message: 'Etiqueta eliminada correctamente' });
  });
};
