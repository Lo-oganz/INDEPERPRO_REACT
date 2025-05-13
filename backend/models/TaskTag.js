const db = require('../config/db');

const TaskTag = {
  getAll: (callback) => {
    db.query('SELECT * FROM Tarea_Etiqueta', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getByTaskId: (id_tarea, callback) => {
    db.query('SELECT * FROM Tarea_Etiqueta WHERE id_tarea = ?', [id_tarea], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  addTagToTask: ({ id_tarea, id_etiqueta }, callback) => {
    db.query(
      'INSERT INTO Tarea_Etiqueta (id_tarea, id_etiqueta) VALUES (?, ?)',
      [id_tarea, id_etiqueta],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { message: 'Etiqueta añadida a la tarea', id_tarea, id_etiqueta });
      }
    );
  },

  removeTagFromTask: ({ id_tarea, id_etiqueta }, callback) => {
    db.query(
      'DELETE FROM Tarea_Etiqueta WHERE id_tarea = ? AND id_etiqueta = ?',
      [id_tarea, id_etiqueta],
      (err) => {
        if (err) return callback(err);
        callback(null, { message: 'Etiqueta eliminada de la tarea' });
      }
    );
  }
};

module.exports = TaskTag;
