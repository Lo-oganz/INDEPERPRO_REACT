import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { View } from '../types';
import './CSS/newtask.css';

interface Props {
  setView: (view: View) => void;
  userId: number;
  userRole: number;
}

interface Usuario {
  id_usuario: number;
  nombre: string;
}

interface Etiqueta {
  id_etiqueta: number;
  nombre: string;
}

const NewTaskView: React.FC<Props> = ({ setView, userId, userRole }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState<'pendiente' | 'en progreso' | 'completada'>('pendiente');
  const [prioridad, setPrioridad] = useState<number>(2);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>(userId);
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/usuarios');
        setUsuarios(res.data);
      } catch (err) {
        console.error('Error al cargar usuarios:', err);
      }
    };

    const fetchEtiquetas = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/etiquetas');
        setEtiquetas(res.data);
      } catch (err) {
        console.error('Error al cargar etiquetas:', err);
      }
    };

    fetchUsuarios();
    fetchEtiquetas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/tareas', {
        titulo,
        descripcion,
        estado,
        id_usuario: selectedUser,
        id_prioridad: prioridad,
        id_etiqueta: selectedEtiqueta === '' ? null : selectedEtiqueta,
      });

      setView('homepage');
    } catch (err) {
      console.error('Error creando la tarea:', err);
      setError('Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="bg">
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
        <h3 className="new-task-title">Crear Nueva Tarea</h3>

        <form onSubmit={handleSubmit} className="new-task-form">
          {error && <p className="error-message">{error}</p>}

          <label>
            Título
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={loading}
            />
          </label>

          <label>
            Descripción
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              disabled={loading}
              rows={4}
            />
          </label>

          <label>
            Estado
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value as any)}
              disabled={loading}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </label>

          <label>
            Prioridad
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(Number(e.target.value))}
              disabled={loading}
            >
              <option value={1}>Alta</option>
              <option value={2}>Media</option>
              <option value={3}>Baja</option>
            </select>
          </label>

          <label>
            Asignar a usuario
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(Number(e.target.value))}
              disabled={loading}
            >
              {usuarios.map((u) => (
                <option key={u.id_usuario} value={u.id_usuario}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </label>

          <label>
            Etiqueta
            <select
              value={selectedEtiqueta}
              onChange={(e) =>
                setSelectedEtiqueta(e.target.value === '' ? '' : Number(e.target.value))
              }
              disabled={loading}
            >
              <option value="">-- Sin etiqueta --</option>
              {etiquetas.map((et) => (
                <option key={et.id_etiqueta} value={et.id_etiqueta}>
                  {et.nombre}
                </option>
              ))}
            </select>
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
              onClick={() => setView(userRole === 3 ? 'jefeProyectoView' : 'homepage')}
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

export default NewTaskView;
