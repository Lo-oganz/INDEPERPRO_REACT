const pool = require('../config/db');

exports.getAllTareas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id_usuario = ?', [req.user.id_usuario]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

exports.getTareaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id_tarea = ? AND id_usuario = ?', [id, req.user.id_usuario]);
    if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

exports.createTarea = async (req, res) => {
  const { titulo, descripcion, fecha_vencimiento, id_prioridad } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO tareas (titulo, descripcion, fecha_vencimiento, id_prioridad, id_usuario) VALUES (?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_vencimiento, id_prioridad, req.user.id_usuario]
    );
    res.status(201).json({ id_tarea: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

exports.updateTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_vencimiento, id_prioridad } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE tareas SET titulo = ?, descripcion = ?, fecha_vencimiento = ?, id_prioridad = ? WHERE id_tarea = ? AND id_usuario = ?',
      [titulo, descripcion, fecha_vencimiento, id_prioridad, id, req.user.id_usuario]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
    res.json({ message: 'Tarea actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

exports.deleteTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      'DELETE FROM tareas WHERE id_tarea = ? AND id_usuario = ?',
      [id, req.user.id_usuario]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada o no autorizada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

exports.getByUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  // Evitar que un usuario consulte tareas de otro
  if (parseInt(id_usuario) !== req.user.id_usuario) {
    return res.status(403).json({ error: 'No autorizado para ver tareas de otro usuario' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM tareas WHERE id_usuario = ?', [id_usuario]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas del usuario' });
  }
};
