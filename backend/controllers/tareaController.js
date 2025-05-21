const pool = require('../config/db');

exports.getAllTareas = (req, res) => {
  const { id_usuario } = req.query;

  let query = `
    SELECT t.id_tarea, t.titulo, t.descripcion, t.estado, t.fecha_vencimiento,
           t.id_usuario, p.nombre AS prioridad
    FROM tarea t
    JOIN prioridad p ON t.id_prioridad = p.id_prioridad
  `;
  const params = [];

  if (id_usuario) {
    query += ' WHERE t.id_usuario = ?';
    params.push(id_usuario);
  }

  pool.query(query, params, (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener las tareas' });
    res.json(results);
  });
};

exports.getTareaById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT t.id_tarea, t.titulo, t.descripcion, t.estado, t.fecha_vencimiento,
           t.id_usuario, p.nombre AS prioridad
    FROM tarea t
    JOIN prioridad p ON t.id_prioridad = p.id_prioridad
    WHERE t.id_tarea = ?
  `;

  pool.query(query, [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener la tarea' });
    if (results.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(results[0]);
  });
};

exports.createTarea = (req, res) => {
  const { titulo, descripcion, fecha_vencimiento, id_prioridad, id_usuario } = req.body;

  pool.query(
    'INSERT INTO tarea (titulo, descripcion, fecha_vencimiento, id_prioridad, id_usuario) VALUES (?, ?, ?, ?, ?)',
    [titulo, descripcion, fecha_vencimiento, id_prioridad, id_usuario],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Error al crear la tarea' });
      res.status(201).json({ id_tarea: result.insertId });
    }
  );
};

exports.updateTarea = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_vencimiento, id_prioridad } = req.body;

  pool.query(
    'UPDATE tarea SET titulo = ?, descripcion = ?, fecha_vencimiento = ?, id_prioridad = ? WHERE id_tarea = ?',
    [titulo, descripcion, fecha_vencimiento, id_prioridad, id],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Error al actualizar la tarea' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
      res.json({ message: 'Tarea actualizada' });
    }
  );
};

exports.deleteTarea = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM tarea WHERE id_tarea = ?', [id], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al eliminar la tarea' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  });
};

exports.getByUsuario = (req, res) => {
  const { id_usuario } = req.params;

  const query = `
    SELECT t.id_tarea, t.titulo, t.descripcion, t.estado, t.fecha_vencimiento,
           t.id_usuario, p.nombre AS prioridad
    FROM tarea t
    JOIN prioridad p ON t.id_prioridad = p.id_prioridad
    WHERE t.id_usuario = ?
  `;

  pool.query(query, [id_usuario], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener las tareas del usuario' });
    res.json(results);
  });
};
