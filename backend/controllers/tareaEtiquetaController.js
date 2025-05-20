const pool = require('../config/db');

exports.agregarEtiqueta = async (req, res) => {
  const { id_tarea, id_etiqueta } = req.body;

  try {
    await pool.query('INSERT INTO tarea_etiqueta (id_tarea, id_etiqueta) VALUES (?, ?)', [id_tarea, id_etiqueta]);
    res.status(201).json({ message: 'Etiqueta agregada a la tarea' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la etiqueta' });
  }
};

exports.obtenerEtiquetasDeTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT e.* FROM etiquetas e 
       JOIN tarea_etiqueta te ON e.id_etiqueta = te.id_etiqueta 
       WHERE te.id_tarea = ?`, [id]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las etiquetas' });
  }
};

exports.eliminarEtiquetasDeTarea = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM tarea_etiqueta WHERE id_tarea = ?', [id]);
    res.json({ message: 'Etiquetas eliminadas de la tarea' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar las etiquetas' });
  }
};
