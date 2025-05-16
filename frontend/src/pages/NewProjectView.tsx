import React, { useState } from 'react';
import axios from 'axios';
import type { View } from '../types';

interface Props {
  setView: (view: View) => void;
  userId: number;
}

const NewProjectView: React.FC<Props> = ({ setView, userId }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    try {
      const proyectoRes = await axios.post('http://localhost:3000/api/proyectos', {
        nombre,
        descripcion,
        estado: 'Activo'
      });

    const nuevoProyecto = proyectoRes.data;
    const id_proyecto = nuevoProyecto.id_proyecto;
    
    console.log("DEBUG POST /user-projects", {
        id_usuario: userId,
        id_proyecto: id_proyecto
        });
      await axios.post('http://localhost:3000/api/user-projects', {
        id_usuario: userId,
        id_proyecto
      });

      setView('homepage');
    } catch (err) {
      console.error('Error creando el proyecto:', err);
      setError('Error al crear el proyecto');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Crear nuevo proyecto</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear
        </button>
        <button
          type="button"
          onClick={() => setView('homepage')}
          className="ml-2 text-gray-600 underline"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default NewProjectView;
