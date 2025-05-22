import React, { useState } from 'react';
import axios from 'axios';
import type { View } from '../types';
import './CSS/newtask.css';

//Este view es parecido al newtaskview, en el que deja crear una nueva etiqueta.

interface Props {
  setView: (view: View) => void;
}

const NewEtiquetaView: React.FC<Props> = ({ setView }) => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');

    if (!nombre.trim()) {
      setMensaje('El nombre es obligatorio.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/etiquetas', { nombre });
      setMensaje('Etiqueta creada con éxito.');
      setNombre('');
    } catch (error) {
      console.error(error);
      setMensaje('Error al crear etiqueta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg'>
        <div className="topbar">
      <button
        onClick={() => {
          localStorage.clear();
          setView('login');
        }}
        style={{ float: 'right' }}
      >
        Cerrar sesión
      </button>
    </div>
<div className="new-task-container">
      <h3 className="new-task-title">Crear Nueva Etiqueta</h3>

      <form onSubmit={handleSubmit} className="new-task-form">
        {mensaje && (
          <p
            style={{
              color: mensaje.includes('éxito') ? 'green' : '#e53935',
              fontWeight: '600',
            }}
          >
            {mensaje}
          </p>
        )}

        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
            autoFocus
          />
        </label>

        <div className="new-task-buttons">
          <button
            type="submit"
            disabled={loading}
            className="create-btn"
          >
            {loading ? 'Creando...' : 'Crear'}
          </button>

          <button
            type="button"
            onClick={() => setView('jefeProyectoView')} // O el nombre que uses para volver a JefeProyectoView
            disabled={loading}
            className="cancel-btn"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default NewEtiquetaView;
