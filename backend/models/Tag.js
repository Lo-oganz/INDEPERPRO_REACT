const db = require('../config/db');

const Tag = {
  getAll: (callback) => {
    db.query('SELECT * FROM Etiqueta', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Etiqueta WHERE id_etiqueta = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  create: (data, callback) => {
    const { nombre, descripcion } = data;
    db.query(
      'INSERT INTO Etiqueta (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { id_etiqueta: result.insertId, ...data });
      }
    );
  },

  update: (id, data, callback) => {
    const { nombre, descripcion } = data;
    db.query(
      'UPDATE Etiqueta SET nombre = ?, descripcion = ? WHERE id_etiqueta = ?',
      [nombre, descripcion, id],
      (err) => {
        if (err) return callback(err);
        callback(null, { message: 'Etiqueta actualizada' });
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Etiqueta WHERE id_etiqueta = ?', [id], (err) => {
      if (err) return callback(err);
      callback(null, { message: 'Etiqueta eliminada' });
    });
  }
};

module.exports = Tag;
