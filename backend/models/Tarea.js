const db = require('../config/db');
//Modelo de tarea

const Tarea = {
  getAll: (callback) => {
    const query = `
      SELECT t.*, e.nombre AS etiqueta_nombre
      FROM tarea t
      LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
    `;
    db.query(query, callback);
  },

  getByPrioridad: (id_prioridad, callback) => {
    const query = `
      SELECT t.*, e.nombre AS etiqueta_nombre
      FROM tarea t
      LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
      WHERE t.id_prioridad = ?
    `;
    db.query(query, [id_prioridad], callback);
  },

  getByEtiqueta: (id_etiqueta, callback) => {
    const query = `
      SELECT t.*, e.nombre AS etiqueta_nombre
      FROM tarea t
      LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
      WHERE t.id_etiqueta = ?
    `;
    db.query(query, [id_etiqueta], callback);
  },

  getByUsuario: (id_usuario, callback) => {
    const query = `
      SELECT t.*, e.nombre AS etiqueta_nombre
      FROM tarea t
      LEFT JOIN etiqueta e ON t.id_etiqueta = e.id_etiqueta
      WHERE t.id_usuario = ?
    `;
    db.query(query, [id_usuario], callback);
  },

  create: (data, callback) => {
    const { titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta } = data;
    const query = `
      INSERT INTO tarea (titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta || null], callback);
  },

  update: (id, data, callback) => {
    const { titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta } = data;
    const query = `
      UPDATE tarea
      SET titulo = ?, descripcion = ?, id_prioridad = ?, id_usuario = ?, estado = ?, id_etiqueta = ?
      WHERE id_tarea = ?
    `;
    db.query(query, [titulo, descripcion, id_prioridad, id_usuario, estado, id_etiqueta || null, id], callback);
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
