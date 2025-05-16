const db = require('../config/db');
const bcrypt = require('bcrypt');

const Usuario = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuario', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, email, password } = data;
    const id_rol = 2;  // fijo al crear

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      db.query(
        'INSERT INTO usuario (nombre, email, password, id_rol) VALUES (?, ?, ?, ?)',
        [nombre, email, hashedPassword, id_rol],
        callback
      );
    });
  },

  assignRole: (id_usuario, id_rol, callback) => {
    db.query(
      'UPDATE usuario SET id_rol = ? WHERE id_usuario = ?',
      [id_rol, id_usuario],
      callback
    );
  },

  update: (id, data, callback) => {
    const { nombre, email, password, id_rol } = data;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);

      db.query(
        'UPDATE usuario SET nombre = ?, email = ?, password = ?, id_rol = ? WHERE id_usuario = ?',
        [nombre, email, hashedPassword, id_rol, id],
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

module.exports = Usuario;
