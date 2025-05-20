const db = require('../config/db');

const Tarea = {
  delete: (id, callback) => {
    db.query('DELETE FROM tarea WHERE id_tarea = ?', [id], callback);
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
    const estadosValidos = ['Pendiente', 'En Progreso', 'Completada'];
    if (!estadosValidos.includes(estado)) {
      return callback(new Error('Estado inválido'));
    }
    const query = `UPDATE tarea SET estado = ? WHERE id_tarea = ?`;
    db.query(query, [estado, id], callback);
  },

  getAll: (callback) => {
    const query = `SELECT * FROM tarea`;
    db.query(query, callback);
  },

  getByPrioridad: (id_prioridad, callback) => {
    const query = `SELECT * FROM tarea WHERE id_prioridad = ?`;
    db.query(query, [id_prioridad], callback);
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
    const query = `SELECT * FROM tarea WHERE id_usuario = ?`;
    db.query(query, [id_usuario], callback);
  },

};



module.exports = Tarea;
