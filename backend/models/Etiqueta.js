const db = require('../config/db');

const Etiqueta = {
  getAll: (callback) => {
    db.query('SELECT * FROM etiqueta', callback);
  },

  create: (nombre, callback) => {
    db.query('INSERT INTO etiqueta (nombre) VALUES (?)', [nombre], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM etiqueta WHERE id_etiqueta = ?', [id], callback);
  }
};

module.exports = Etiqueta;
