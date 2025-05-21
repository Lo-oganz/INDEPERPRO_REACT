import React, { useEffect, useState } from "react";
import axios from 'axios';
import { View } from '../types.tsx';
import './CSS/profile.css';

const UserView = ({ setView }: { setView: (view: View) => void }) => {
  const userId = parseInt(localStorage.getItem('userId') || '0');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/api/usuarios/${userId}`)
        .then(res => {
          setNombre(res.data.nombre);
          setEmail(res.data.email);
        })
        .catch(() => setError('Error al cargar datos'));
    }
  }, [userId]);

  const handleUpdate = () => {
    axios.put(`http://localhost:3000/api/usuarios/${userId}`, { nombre, email })
      .then(() => {
        setEditing(false);
        setError('');
        alert('Usuario actualizado correctamente');
      })
      .catch(() => setError('Error al actualizar usuario'));
  };

  const handleLogout = () => {
    localStorage.clear();
    setView('login');
  };

  const eliminarCuenta = () => {
    axios.delete(`http://localhost:3000/api/usuarios/${userId}`)
      .then(() => {
        alert('Cuenta eliminada');
        localStorage.clear();
        setView('login');
      })
      .catch(() => alert('Error al eliminar cuenta'));
  };

  return (
    <div className="user-bg">
      <div className="user-container">
      <h2>Tu Perfil</h2>
      {error && <p className="error">{error}</p>}

      {!editing ? (
        <>
          <p>Nombre: {nombre}</p>
          <p>Email: {email}</p>
        </>
      ) : (
        <>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </>
      )}

      {!editing ? (
        <button onClick={() => setEditing(true)}>Editar Usuario</button>
      ) : (
        <button onClick={handleUpdate}>Guardar Cambios</button>
      )}

      <button onClick={handleLogout}>Cerrar Sesión</button>

      {!confirmDelete ? (
        <button onClick={() => setConfirmDelete(true)} className="delete-btn">Eliminar Cuenta</button>
      ) : (
        <>
          <p>¿Estás seguro?</p>
          <button onClick={eliminarCuenta} className="delete-confirm-btn">Sí, eliminar</button>
          <button onClick={() => setConfirmDelete(false)}>Cancelar</button>
        </>
      )}
    </div>
    </div>
    
  );
};

export default UserView;
