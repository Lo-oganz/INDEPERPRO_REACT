const db = require('../config/db');

const TaskHistory = {
  getAll: (callback) => {
    db.query('SELECT * FROM Historial_Cambios_Tarea', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getByTaskId: (id_tarea, callback) => {
    db.query('SELECT * FROM Historial_Cambios_Tarea WHERE id_tarea = ?', [id_tarea], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  create: ({ id_tarea, id_usuario, cambio }, callback) => {
    db.query(
      'INSERT INTO Historial_Cambios_Tarea (id_tarea, id_usuario, cambio) VALUES (?, ?, ?)',
      [id_tarea, id_usuario, cambio],
      (err, result) => {
        if (err) return callback(err);
        callback(null, {
          id_cambio: result.insertId,
          id_tarea,
          id_usuario,
          cambio
        });
      }
    );
  }
};

module.exports = TaskHistory;
