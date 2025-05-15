const db = require('../config/db');

const Role = {
  getAll: (callback) => {
    db.query('SELECT * FROM rol', (err, rows) => {
      if (err) {
        console.error('Error al obtener roles:', err);
        return callback(err, null);
      }
      callback(null, rows);
    });
  },
  
  getById: (id, callback) => {
    db.query('SELECT * FROM rol WHERE id_rol = ?', [id], (err, rows) => {
      if (err) {
        console.error('Error al obtener rol:', err);
        return callback(err, null);
      }
      callback(null, rows[0]);
    });
  },

  create: (nombre_rol, permisos = null, callback) => {
    db.query(
      'INSERT INTO rol (nombre_rol, permisos) VALUES (?, ?)',
      [nombre_rol, permisos],
      (err, result) => {
        if (err) {
          console.error('Error al crear rol:', err);
          return callback(err, null);
        }
        callback(null, { id_rol: result.insertId, nombre_rol, permisos });
      }
    );
  },

  update: (id, nombre_rol, permisos = null, callback) => {
    db.query(
      'UPDATE rol SET nombre_rol = ?, permisos = ? WHERE id_rol = ?',
      [nombre_rol, permisos, id],
      (err) => {
        if (err) {
          console.error('Error al actualizar rol:', err);
          return callback(err, null); 
        }
        callback(null, { id_rol: id, nombre_rol, permisos });
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM rol WHERE id_rol = ?', [id], (err) => {
      if (err) {
        console.error('Error al eliminar rol:', err);
        return callback(err, null);
      }
      callback(null, { message: 'Rol eliminado' });
    });
  }
};

module.exports = Role;