import React, { useState } from 'react';
import axios from 'axios';
import type { View } from '../types';

interface Props {
  setView: (view: View) => void;
  userId: number;
}

const NewTaskView: React.FC<Props> = ({ setView, userId }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState<'pendiente' | 'en progreso' | 'completada'>('pendiente');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/tareas', {
        titulo,
        descripcion,
        estado,
        id_usuario: userId
      });

      setView('homepage');
    } catch (err) {
      console.error('Error creando la tarea:', err);
      setError('Error al crear la tarea');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Crear nueva tarea</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título de la tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
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
          onChange={(e) => setEstado(e.target.value as any)}
          className="w-full p-2 border rounded"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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

export default NewTaskView;
