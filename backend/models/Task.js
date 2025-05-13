const db = require('../config/db');

const Task = {
  getAll: (callback) => {
    db.query('SELECT * FROM Tarea', (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Tarea WHERE id_tarea = ?', [id], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  },

  create: (data, callback) => {
    const { titulo, descripcion, estado, prioridad, fec_vencimiento, id_usuario, id_proyecto } = data;
    db.query(
      'INSERT INTO Tarea (titulo, descripcion, estado, prioridad, fec_vencimiento, id_usuario, id_proyecto) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, estado, prioridad, fec_vencimiento, id_usuario, id_proyecto],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { id_tarea: result.insertId, ...data });
      }
    );
  },

  update: (id, data, callback) => {
    const { titulo, descripcion, estado, prioridad, fec_vencimiento, id_usuario, id_proyecto } = data;
    db.query(
      'UPDATE Tarea SET titulo = ?, descripcion = ?, estado = ?, prioridad = ?, fec_vencimiento = ?, id_usuario = ?, id_proyecto = ? WHERE id_tarea = ?',
      [titulo, descripcion, estado, prioridad, fec_vencimiento, id_usuario, id_proyecto, id],
      (err) => {
        if (err) return callback(err);
        callback(null, { message: 'Tarea actualizada' });
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Tarea WHERE id_tarea = ?', [id], (err) => {
      if (err) return callback(err);
      callback(null, { message: 'Tarea eliminada' });
    });
  }
};

module.exports = Task;
