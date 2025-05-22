const db = require('../config/db');
//Modelo de rol

const Rol = {
  getAll: (callback) => {
    db.query('SELECT * FROM rol', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM rol WHERE id_rol = ?', [id], callback);
  }
};

module.exports = Rol;
