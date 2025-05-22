const pool = require('../config/db');
const bcrypt = require('bcrypt');
//Controlador de usuario que tiene todas sus funciones declaradas

exports.getAllUsuarios = (req, res) => {
  pool.query('SELECT * FROM usuario', (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener los usuarios' });
    res.json(results);
  });
};

exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error al obtener el usuario' });
    if (!results.length) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(results[0]);
  });
};

exports.createUsuario = (req, res) => {
  const { nombre, email, password, id_rol } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: 'Error al encriptar la contraseña' });

    pool.query(
      'INSERT INTO usuario (nombre, email, password, id_rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hash, id_rol],
      (error, result) => {
        if (error) return res.status(500).json({ error: 'Error al crear el usuario' });
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
      }
    );
  });
};

exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  const { nombre, email, id_rol } = req.body;

  pool.query(
    'UPDATE usuario SET nombre = ?, email = ?, id_rol = ? WHERE id_usuario = ?',
    [nombre, email, id_rol, id],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Error al actualizar el usuario' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ message: 'Usuario actualizado' });
    }
  );
};

exports.deleteUsuario = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id], (error, result) => {
    if (error) return res.status(500).json({ error: 'Error al eliminar el usuario' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  });
};

exports.loginUsuario = (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM usuario WHERE email = ?', [email], (error, results) => {
    if (error) return res.status(500).json({ error: 'Error interno' });
    if (!results.length) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error interno' });
      if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

      res.json({
        message: 'Login exitoso',
        user: {
          id: user.id_usuario,
          nombre: user.nombre,
          email: user.email,
          id_rol: user.id_rol
        }
      });
    });
  });
};

exports.assignRole = (req, res) => {
  const { id_usuario, id_rol } = req.body;

  if (!id_usuario || !id_rol) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  pool.query(
    'UPDATE usuario SET id_rol = ? WHERE id_usuario = ?',
    [id_rol, id_usuario],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Error al asignar el rol' });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ message: 'Rol asignado correctamente' });
    }
  );
};
