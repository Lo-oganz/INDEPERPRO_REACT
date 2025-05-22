const pool = require('../config/db');
//Este es el controlador de tarea, que tiene todas sus funciones declaradas con sus left joins

exports.getAllTareas = (req, res) => {
  const { id_usuario } = req.query;

  let query = `
    SELECT t.id_tarea, t.titulo, t.descripcion, t.estado, t.id_usuario,
           p.nivel AS prioridad, u.nombre AS nombre_usuario,
           e.nombre AS nombre_etiqueta
    FROM tarea t
    LEFT JOIN prioridad p ON t.id_prioridad = p.id_prioridad
    LEFT JOIN usuario u ON t.id_usuario = u.id_usuario
    LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
  `;

  const params = [];

  if (id_usuario) {
    query += ' WHERE t.id_usuario = ?';
    params.push(id_usuario);
  }

  query += ' ORDER BY t.id_tarea';

  pool.query(query, params, (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener las tareas' });
    res.json(results);
  });
};

exports.getTareaById = (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT t.id_tarea, t.titulo, t.descripcion, t.estado, t.id_usuario,
           p.nivel AS prioridad, u.nombre AS nombre_usuario,
           e.nombre AS nombre_etiqueta
    FROM tarea t
    LEFT JOIN prioridad p ON t.id_prioridad = p.id_prioridad
    LEFT JOIN usuario u ON t.id_usuario = u.id_usuario
    LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
    WHERE t.id_tarea = ?
  `;

  pool.query(query, [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener la tarea' });
    if (results.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(results[0]);
  });
};

exports.createTarea = (req, res) => {
  const { titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta } = req.body;

  pool.query(
    'INSERT INTO tarea (titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, descripcion, id_prioridad, id_usuario, estado || 'pendiente', id_etiqueta || null],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Error al crear la tarea' });
      res.status(201).json({ id_tarea: result.insertId });
    }
  );
};

exports.updateTarea = (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta } = req.body;

  pool.query(
    'UPDATE tarea SET titulo = ?, descripcion = ?, id_prioridad = ?, id_usuario = ?, estado = ?, id_etiqueta = ? WHERE id_tarea = ?',
    [titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta || null, id],
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
    SELECT t.id_tarea, t.titulo, t.descripcion, t.estado, t.id_usuario,
           p.nivel AS prioridad, u.nombre AS nombre_usuario,
           e.nombre AS nombre_etiqueta
    FROM tarea t
    LEFT JOIN prioridad p ON t.id_prioridad = p.id_prioridad
    LEFT JOIN usuario u ON t.id_usuario = u.id_usuario
    LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
    WHERE t.id_usuario = ?
    ORDER BY t.id_tarea
  `;

  pool.query(query, [id_usuario], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener las tareas del usuario' });
    res.json(results);
  });
};
