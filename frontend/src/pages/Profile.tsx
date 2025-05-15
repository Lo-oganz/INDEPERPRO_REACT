import { useState } from "react";
import './CSS/User.css';

import { View } from '../types.tsx'; // o './types', según la ruta
const UserView = ({ setView }: { setView: (view: View) => void }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const eliminarCuenta = () => {
    // Simulación eliminación y redirección a login
    setTimeout(() => setView('login'), 1000);
  };

  return (
    <div className="user-container">
      <h2>Tu Perfil</h2>
      <p>Nombre: Usuario Ejemplo</p>
      <p>Email: ejemplo@correo.com</p>

      <div className="buttons">
        <button onClick={() => alert('Editar usuario')}>Editar Usuario</button>
        <button onClick={() => alert('Cerrar sesión')}>Cerrar sesión</button>
        <button className="delete" onClick={() => setConfirmDelete(true)}>Eliminar cuenta</button>
      </div>

      {confirmDelete && (
        <div className="dialog">
          <p>¿Seguro que quieres eliminar tu cuenta?</p>
          <button onClick={eliminarCuenta}>Sí, eliminar</button>
          <button onClick={() => setConfirmDelete(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default UserView;