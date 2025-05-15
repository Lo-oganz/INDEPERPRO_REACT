const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = (req, res) => {
  const { email, contrasenia } = req.body;

  if (!email || !contrasenia) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  User.findByEmail(email, (err, user) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    bcrypt.compare(contrasenia, user.contrasenia, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ error: 'Error al validar contraseña' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      res.json({ message: 'Inicio de sesión exitoso', usuario: { id: user.id_usuario, nombre: user.nombre, email: user.email } });
    });
  });
};
