const db = require('../config/db');

const Project = {
  getAll: (callback) => {
    db.query('SELECT * FROM Proyecto', (err, rows) => {
      if (err) {
        console.error('Error al obtener proyectos:', err);
        return callback(err, null); 
      }
      callback(null, rows); 
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Proyecto WHERE id_proyecto = ?', [id], (err, rows) => {
      if (err) {
        console.error('Error al obtener proyecto:', err);
        return callback(err, null);
      }
      callback(null, rows[0]);
    });
  },

  create: (data, callback) => {
    const { nombre, descripcion, estado } = data;
    db.query(
      'INSERT INTO Proyecto (nombre, descripcion, estado) VALUES (?, ?, ?)',
      [nombre, descripcion, estado],
      (err, result) => {
        if (err) {
          console.error('Error al crear proyecto:', err);
          return callback(err, null);
        }
        callback(null, { id: result.insertId, ...data });
      }
    );
  },

  update: (id, data, callback) => {
    const { nombre, descripcion, estado } = data;
    db.query(
      'UPDATE Proyecto SET nombre = ?, descripcion = ?, estado = ? WHERE id_proyecto = ?',
      [nombre, descripcion, estado, id],
      (err) => {
        if (err) {
          console.error('Error al actualizar proyecto:', err);
          return callback(err, null);
        }
        callback(null, { id_proyecto: id, nombre, descripcion, estado });
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Proyecto WHERE id_proyecto = ?', [id], (err) => {
      if (err) {
        console.error('Error al eliminar proyecto:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Proyecto eliminado' });
    });
  }
};

module.exports = Project;
