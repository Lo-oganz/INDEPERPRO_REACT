const db = require('../config/db');

const Prioridad = {
  getAll: (callback) => {
    db.query('SELECT * FROM prioridad', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM prioridad WHERE id_prioridad = ?', [id], callback);
  },

  create: (nivel, callback) => {
    db.query('INSERT INTO prioridad (nivel) VALUES (?)', [nivel], callback);
  }
};

module.exports = Prioridad;
