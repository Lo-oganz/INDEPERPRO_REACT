const db = require('../config/db');

const Tarea = {
  getAll: (callback) => {
    const query = `
      SELECT t.*, u.nombre AS nombre_usuario, p.nombre AS prioridad
      FROM tarea t
      JOIN usuario u ON t.id_usuario = u.id_usuario
      JOIN prioridad p ON t.id_prioridad = p.id_prioridad
    `;
    db.query(query, callback);
  },


  getById: (id, callback) => {
    const query = `
      SELECT t.*, u.nombre AS nombre_usuario
      FROM tarea t
      JOIN usuario u ON t.id_usuario = u.id_usuario
      WHERE t.id_tarea = ?
    `;
    db.query(query, [id], callback);
  },

  create: (data, callback) => {
    const { titulo, descripcion, id_prioridad, id_usuario } = data;
    const query = `
      INSERT INTO tarea (titulo, descripcion, id_prioridad, id_usuario)
      VALUES (?, ?, ?, ?)
    `;
    db.query(query, [titulo, descripcion, id_prioridad, id_usuario], callback);
  },

  update: (id, data, callback) => {
    const { titulo, descripcion, id_prioridad, id_usuario } = data;
    const query = `
      UPDATE tarea
      SET titulo = ?, descripcion = ?, id_prioridad = ?, id_usuario = ?
      WHERE id_tarea = ?
    `;
    db.query(query, [titulo, descripcion, id_prioridad, id_usuario, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM tarea WHERE id_tarea = ?', [id], callback);
  }
};

module.exports = Tarea;
