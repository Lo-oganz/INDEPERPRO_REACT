const db = require('../config/db');

const Tarea = {
  getAll: (callback) => {
    const query = `SELECT * FROM tarea`;
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = `SELECT * FROM tarea WHERE id_tarea = ?`;
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
