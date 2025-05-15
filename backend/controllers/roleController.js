const Role = require('../models/Role');

exports.getAllRoles = (req, res) => {
  Role.getAll((err, roles) => {
    if (err) {
      console.error('Error al obtener roles:', err);
      return res.status(500).json({ error: 'Error al obtener roles' });
    }
    res.json(roles);
  });
};

exports.getRoleById = (req, res) => {
  const { id } = req.params;
  Role.getById(id, (err, role) => {
    if (err) {
      console.error('Error al obtener rol:', err);
      return res.status(500).json({ error: 'Error al obtener rol' });
    }
    if (!role) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(role);
  });
};

exports.createRole = (req, res) => {
  const { nombre_rol, permisos } = req.body;
  Role.create(nombre_rol, permisos, (err, newRole) => {
    if (err) {
      console.error('Error al crear rol:', err);
      return res.status(500).json({ error: 'Error al crear rol' });
    }
    res.status(201).json(newRole);
  });
};

exports.updateRole = (req, res) => {
  const { id } = req.params;
  const { nombre_rol, permisos } = req.body;
  Role.update(id, nombre_rol, permisos, (err, updatedRole) => {
    if (err) {
      console.error('Error al actualizar rol:', err);
      return res.status(500).json({ error: 'Error al actualizar rol' });
    }
    res.json(updatedRole);
  });
};

exports.deleteRole = (req, res) => {
  const { id } = req.params;
  Role.delete(id, (err, message) => {
    if (err) {
      console.error('Error al eliminar rol:', err);
      return res.status(500).json({ error: 'Error al eliminar rol' });
    }
    res.json(message);
  });
};