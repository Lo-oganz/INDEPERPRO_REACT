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
    const id_rol = 2;  // fijo

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err);
      db.query(
        'INSERT INTO usuario (nombre, email, password, id_rol) VALUES (?, ?, ?, ?)',
        [nombre, email, hash, id_rol],
        callback
      );
    });
  },

  update: (id, data, callback) => {
    const { nombre, email, password, id_rol } = data;

    if (password) {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return callback(err);
        db.query(
          'UPDATE usuario SET nombre = ?, email = ?, password = ?, id_rol = ? WHERE id_usuario = ?',
          [nombre, email, hash, id_rol, id],
          callback
        );
      });
    } else {
      db.query(
        'UPDATE usuario SET nombre = ?, email = ?, id_rol = ? WHERE id_usuario = ?',
        [nombre, email, id_rol, id],
        callback
      );
    }
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
