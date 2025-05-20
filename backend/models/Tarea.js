const db = require('../config/db');

const Tarea = {
  getAll: (callback) => {
    db.query('SELECT * FROM tarea', callback);
  },

  getByPrioridad: (id_prioridad, callback) => {
    db.query('SELECT * FROM tarea WHERE id_prioridad = ?', [id_prioridad], callback);
  },

  getByEtiqueta: (id_etiqueta, callback) => {
    const query = `
      SELECT t.*
      FROM tarea t
      JOIN tarea_etiqueta te ON t.id_tarea = te.id_tarea
      WHERE te.id_etiqueta = ?
    `;
    db.query(query, [id_etiqueta], callback);
  },

  getByUsuario: (id_usuario, callback) => {
    db.query('SELECT * FROM tarea WHERE id_usuario = ?', [id_usuario], callback);
  },

  create: (data, callback) => {
    const { titulo, descripcion, id_prioridad, id_usuario, estado } = data;
    const query = `
      INSERT INTO tarea (titulo, descripcion, id_prioridad, id_usuario, estado)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [titulo, descripcion, id_prioridad, id_usuario, estado], callback);
  },

  update: (id, data, callback) => {
    const { titulo, descripcion, id_prioridad, id_usuario, estado } = data;
    const query = `
      UPDATE tarea
      SET titulo = ?, descripcion = ?, id_prioridad = ?, id_usuario = ?, estado = ?
      WHERE id_tarea = ?
    `;
    db.query(query, [titulo, descripcion, id_prioridad, id_usuario, estado, id], callback);
  },

  updateEstado: (id, estado, callback) => {
    const estadosValidos = ['pendiente', 'en progreso', 'completada'];
    if (!estadosValidos.includes(estado.toLowerCase())) {
      return callback(new Error('Estado inválido'));
    }
    db.query('UPDATE tarea SET estado = ? WHERE id_tarea = ?', [estado, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM tarea WHERE id_tarea = ?', [id], callback);
  }
};

module.exports = Tarea;
