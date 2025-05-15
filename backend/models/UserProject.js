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

  getPermisos: (id_usuario, id_proyecto, callback) => {
    db.query(
      'SELECT permisos FROM Usuario_Proyecto WHERE id_usuario = ? AND id_proyecto = ?',
      [id_usuario, id_proyecto],
      (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
      }
    );
  },

create: (data, callback) => {
  const { id_usuario, id_proyecto } = data;
  db.query(
    'INSERT INTO Usuario_Proyecto (id_usuario, id_proyecto) VALUES (?, ?)',
    [id_usuario, id_proyecto],
    (err, result) => {
      if (err) return callback(err);
      callback(null, { id_u_p: result.insertId, ...data });
    }
  );
},


  getProyectosByUsuario: (id_usuario, callback) => {
    const query = `
      SELECT p.id_proyecto, p.nombre, p.descripcion, p.estado
      FROM Proyecto p
      JOIN Usuario_Proyecto up ON p.id_proyecto = up.id_proyecto
      WHERE up.id_usuario = ?
    `;
    db.query(query, [id_usuario], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Usuario_Proyecto WHERE id_u_p = ?', [id], (err) => {
      if (err) return callback(err);
      callback(null, { message: 'Asignación eliminada' });
    });
  }
};

module.exports = UserProject;