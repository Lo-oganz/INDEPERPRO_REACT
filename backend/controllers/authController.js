const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const [[user]] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        id_rol: user.id_rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


// === Paso 2: Crea middleware jwtMiddleware.js ===
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};


// === Paso 3: Elimina los archivos ===
// Elimina authMiddleware.js y checkRole.js si los tienes


// === Paso 4: Aplica jwtMiddleware en server.js ===
// En server.js, después de app.use(express.json()):

const jwtMiddleware = require('./middleware/jwtMiddleware');
app.use(jwtMiddleware); // Protege todo
