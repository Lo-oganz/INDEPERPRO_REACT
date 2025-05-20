const jwt = require('jsonwebtoken');

// Middleware para verificar rol
function checkRole(allowedRoles) {
  return (req, res, next) => {
    // Supongamos que el token viene en header Authorization Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autorizado' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No autorizado' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decoded debe contener al menos id_usuario e id_rol
      if (!allowedRoles.includes(decoded.id_rol)) {
        return res.status(403).json({ error: 'Acceso denegado' });
      }

      // Guardamos los datos del usuario para el siguiente middleware o controlador
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
}

module.exports = checkRole;
