const db = require('../config/db');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuario', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], callback);
  },

  create: (userData, callback) => {
    const { nombre, email, contraseña } = userData;
    db.query('INSERT INTO usuario (nombre, email, contraseña) VALUES (?, ?, ?)', [nombre, email, contraseña], callback);
  },

  update: (id, userData, callback) => {
    const { nombre, email, contraseña } = userData;
    db.query('UPDATE usuario SET nombre = ?, email = ?, contraseña = ? WHERE id_usuario = ?', [nombre, email, contraseña, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM usuario WHERE id_usuario = ?', [id], callback);
  }
};

module.exports = User;