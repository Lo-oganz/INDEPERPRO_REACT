const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

exports.getAllUsuarios = (req, res) => {
  Usuario.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getUsuarioById = (req, res) => {
  const id = req.params.id;
  Usuario.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result[0]);
  });
};

exports.createUsuario = (req, res) => {
  Usuario.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Usuario creado', id: result.insertId });
  });
};

exports.updateUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.update(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario actualizado' });
  });
};

exports.deleteUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado' });
  });
};

exports.loginUsuario = (req, res) => {
  const { email, password } = req.body;

  Usuario.findByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: 'Error interno' });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

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

  Usuario.assignRole(id_usuario, id_rol, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Rol asignado correctamente' });
  });
};
