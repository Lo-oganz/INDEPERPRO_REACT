const pool = require('../config/db');

exports.agregarEtiqueta = (req, res) => {
  const { id_tarea, id_etiqueta } = req.body;

  pool.query('INSERT INTO tarea_etiqueta (id_tarea, id_etiqueta) VALUES (?, ?)', [id_tarea, id_etiqueta], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al agregar la etiqueta' });
    res.status(201).json({ message: 'Etiqueta agregada a la tarea' });
  });
};

exports.obtenerEtiquetasDeTarea = (req, res) => {
  const { id } = req.params;

  pool.query(
    `SELECT e.* FROM etiquetas e 
     JOIN tarea_etiqueta te ON e.id_etiqueta = te.id_etiqueta 
     WHERE te.id_tarea = ?`, 
    [id], 
    (error, results) => {
      if (error) return res.status(500).json({ error: 'Error al obtener las etiquetas' });
      res.json(results);
  });
};

exports.eliminarEtiquetasDeTarea = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM tarea_etiqueta WHERE id_tarea = ?', [id], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al eliminar las etiquetas' });
    res.json({ message: 'Etiquetas eliminadas de la tarea' });
  });
};
