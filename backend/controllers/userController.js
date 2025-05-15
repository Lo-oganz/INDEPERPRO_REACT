const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

exports.loginUser = (req, res) => {
  const { email, contrasenia } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: 'Error interno' });
    if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

    bcrypt.compare(contrasenia, user.contrasenia, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error interno' });
      if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

      res.json({ message: 'Login exitoso', user: { id: user.id_usuario, nombre: user.nombre, email: user.email } });
    });
  });
};

exports.createUser = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Usuario creado', id: result.insertId });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.update(id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario actualizado' });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado' });
  });
};
