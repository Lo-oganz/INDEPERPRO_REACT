const db = require('../config/db');

const UserProject = {
  getAll: (callback) => {
    db.query('SELECT * FROM Usuario_Proyecto', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Usuario_Proyecto WHERE id_u_p = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  create: (data, callback) => {
    const { id_usuario, id_proyecto, id_rol } = data;
    db.query(
      'INSERT INTO Usuario_Proyecto (id_usuario, id_proyecto, id_rol) VALUES (?, ?, ?)',
      [id_usuario, id_proyecto, id_rol],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { id_u_p: result.insertId, ...data });
      }
    );
  },

  update: (id, data, callback) => {
    const { id_usuario, id_proyecto, id_rol } = data;
    db.query(
      'UPDATE Usuario_Proyecto SET id_usuario = ?, id_proyecto = ?, id_rol = ? WHERE id_u_p = ?',
      [id_usuario, id_proyecto, id_rol, id],
      (err) => {
        if (err) return callback(err);
        callback(null, { message: 'Asignación actualizada' });
      }
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Usuario_Proyecto WHERE id_u_p = ?', [id], (err) => {
      if (err) return callback(err);
      callback(null, { message: 'Asignación eliminada' });
    });
  }
};

module.exports = UserProject;
