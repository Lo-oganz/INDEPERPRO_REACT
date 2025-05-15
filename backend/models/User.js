const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuario', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], callback);
  },

  create: (userData, callback) => {
    const { nombre,  contrasenia, email, fec_registro } = userData;
    bcrypt.hash(contrasenia, 10, (err, hashedPassword) => {
    if (err) return callback(err);
    db.query(
      'INSERT INTO usuario (nombre, contrasenia, email, fec_registro) VALUES (?, ?, ?, ?)',
      [nombre,  hashedPassword, email, fec_registro],
      callback
    );
  });

  },

  update: (id, userData, callback) => {
    const { nombre, email, contrasenia } = userData;
    bcrypt.hash(contrasenia, 10, (err, hashedPassword) => {
      if (err) return callback(err);
      db.query(
        'UPDATE usuario SET nombre = ?, contrasenia = ?, email = ?, fec_registro = ?  WHERE id_usuario = ?',
        [nombre, email, hashedPassword, id],
        callback
      );
    });
  },

  delete: (id, callback) => {
    db.query('DELETE FROM usuario WHERE id_usuario = ?', [id], callback);
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
};

module.exports = User;
