const db = require('../config/db');

const Etiqueta = {
  getAll: (callback) => {
    db.query('SELECT * FROM etiqueta', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM etiqueta WHERE id_etiqueta = ?', [id], callback);
  },

  create: (nombre, callback) => {
    db.query('INSERT INTO etiqueta (nombre) VALUES (?)', [nombre], callback);
  },

  update: (id, nombre, callback) => {
    db.query('UPDATE etiqueta SET nombre = ? WHERE id_etiqueta = ?', [nombre, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM etiqueta WHERE id_etiqueta = ?', [id], callback);
  }
};

module.exports = Etiqueta;
