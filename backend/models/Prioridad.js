const db = require('../config/db');

const Prioridad = {
  getAll: (callback) => {
    db.query('SELECT * FROM prioridad', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM prioridad WHERE id_prioridad = ?', [id], callback);
  }
};

module.exports = Prioridad;
