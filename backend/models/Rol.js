const db = require('../config/db');

const Rol = {
  getAll: (callback) => {
    db.query('SELECT * FROM rol', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM rol WHERE id_rol = ?', [id], callback);
  },

  create: (nombre, callback) => {
    db.query('INSERT INTO rol (nombre_rol) VALUES (?)', [nombre], callback);
  },

  update: (id, nombre, callback) => {
    db.query('UPDATE rol SET nombre_rol = ? WHERE id_rol = ?', [nombre, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM rol WHERE id_rol = ?', [id], callback);
  }
};

module.exports = Rol;
