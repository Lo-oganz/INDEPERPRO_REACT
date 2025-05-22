const pool = require('../config/db');
//Controlador de prioridad, contiene sus funciones 

exports.getAllPrioridades = (req, res) => {
  pool.query('SELECT * FROM prioridad', (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener prioridades' });
    res.json(results);
  });
};

exports.getPrioridadById = (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM prioridad WHERE id_prioridad = ?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener la prioridad' });
    if (results.length === 0) return res.status(404).json({ error: 'Prioridad no encontrada' });
    res.json(results[0]);
  });
};

exports.createPrioridad = (req, res) => {
  const { nombre, nivel } = req.body;

  pool.query(
    'INSERT INTO prioridad (nombre, nivel) VALUES (?, ?)',
    [nombre, nivel],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Error al crear la prioridad' });
      res.status(201).json({ id_prioridad: result.insertId, nombre, nivel });
    }
  );
};
