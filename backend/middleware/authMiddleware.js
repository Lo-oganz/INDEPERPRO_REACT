function authMiddleware(req, res, next) {
  // Supongamos que tienes un sistema simple:
  // - Enviar en headers "user-id" y "user-role"
  // (No es seguro para producción, solo para pruebas)
  
  const userId = req.headers['user-id'];
  const userRole = req.headers['user-role'];

  if (!userId || !userRole) {
    return res.status(401).json({ error: 'No autenticado' });
  }

  // Agregamos la info a req.user para usarla luego en checkRole
  req.user = {
    id_usuario: parseInt(userId),
    id_rol: parseInt(userRole)
  };

  next();
}

module.exports = authMiddleware;