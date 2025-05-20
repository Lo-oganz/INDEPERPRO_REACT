const db = require('../config/db');

const TareaEtiqueta = {
  add: (id_tarea, id_etiqueta, callback) => {
    db.query(
      'INSERT INTO tarea_etiqueta (id_tarea, id_etiqueta) VALUES (?, ?)',
      [id_tarea, id_etiqueta],
      callback
    );
  },

  getEtiquetasByTarea: (id_tarea, callback) => {
    db.query(
      `SELECT e.* FROM etiqueta e
       JOIN tarea_etiqueta te ON e.id_etiqueta = te.id_etiqueta
       WHERE te.id_tarea = ?`,
      [id_tarea],
      callback
    );
  },

  deleteAllForTarea: (id_tarea, callback) => {
    db.query('DELETE FROM tarea_etiqueta WHERE id_tarea = ?', [id_tarea], callback);
  }
};

module.exports = TareaEtiqueta;
