const bcrypt = require('bcrypt');
const db = require('../config/db');
//Este controlador es para la correcta autenticación con la librería de bcrypt.

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM usuario WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error al buscar usuario:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }

      if (!isMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      res.json({
        message: 'Login exitoso',
        usuario: {
          id_usuario: user.id_usuario,
          nombre: user.nombre,
          email: user.email,
          id_rol: user.id_rol
        }
      });
    });
  });
};
