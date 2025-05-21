import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/homepage.css';
import TaskCard from '../components/TaskCard.tsx';
import UserView from './Profile.tsx';
import { Home, User } from 'lucide-react';
import { View } from '../types.tsx';

interface Etiqueta {
  id_etiqueta: number;
  nombre: string;
}

interface Task {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'en progreso' | 'completada';
  prioridad: string;
  id_usuario: number;
  etiquetas: Etiqueta[]; // ✅ AÑADIDO
}

interface User {
  id_usuario: number;
  nombre: string;
}

interface Props {
  userId: number;
  userRole: number;
  setView: (view: View) => void;
}

const Homepage: React.FC<Props> = ({ userId, userRole, setView }) => {
  const [localView, setLocalView] = useState<'home' | 'profile'>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEtiqueta, setSelectedEtiqueta] = useState('');

  const storedUserId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error al obtener usuarios:', error));

    axios.get('http://localhost:3000/api/tareas')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error al obtener tareas:', error));

    axios.get('http://localhost:3000/api/etiquetas')
      .then(response => setEtiquetas(response.data))
      .catch(error => console.error('Error al obtener etiquetas:', error));
  }, []);

  const filtrarTareas = (t: Task) => {
    const coincideTexto = t.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    const coincideEtiqueta =
      selectedEtiqueta === '' ||
      t.etiquetas?.some(et => et.nombre.toLowerCase() === selectedEtiqueta.toLowerCase());

    return coincideTexto && coincideEtiqueta;
  };

  return (
    <div className="bg">
      <div className="topbar">
        <strong>Tareas</strong>
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          className="etiqueta-filter"
          value={selectedEtiqueta}
          onChange={(e) => setSelectedEtiqueta(e.target.value)}
        >
          <option value="">Todas las etiquetas</option>
          {etiquetas.map((et) => (
            <option key={et.id_etiqueta} value={et.nombre}>{et.nombre}</option>
          ))}
        </select>
        <button
          onClick={() => {
            localStorage.removeItem('userId');
            setView('login');
          }}
          style={{ float: 'right' }}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="content">
        <div className="navbar">
          <div className="icon" onClick={() => setLocalView('home')}>
            <Home size={24} />
          </div>
          <div className="icon" onClick={() => setLocalView('profile')}>
            <User size={24} />
          </div>
          {userRole === 3 && (
            <button
              onClick={() => setView('newTask')}
              className="btn-new-task"
              style={{ marginBottom: '20px' }}
            >
              Nueva tarea
            </button>
          )}
        </div>

        {localView === 'home' && (
          <>
            <div className="task-group">
              <h3>Todas las tareas</h3>
              <div className="tasks">
                {tasks.filter(filtrarTareas).length > 0 ? (
                  tasks.filter(filtrarTareas).map(task => {
                    const user = users.find(u => u.id_usuario === task.id_usuario);
                    return (
                      <TaskCard
                        key={task.id_tarea}
                        task={task}
                        user={user}
                      />
                    );
                  })
                ) : (
                  <p>No hay tareas que coincidan.</p>
                )}
              </div>
            </div>

            <div className="task-group">
              <h3>Mis tareas</h3>
              <div className="tasks">
                {tasks.filter(task => task.id_usuario === storedUserId && filtrarTareas(task)).length > 0 ? (
                  tasks
                    .filter(task => task.id_usuario === storedUserId && filtrarTareas(task))
                    .map(task => {
                      const user = users.find(u => u.id_usuario === task.id_usuario);
                      return (
                        <TaskCard
                          key={task.id_tarea}
                          task={task}
                          user={user}
                          editable={true}
                          onStatusChange={(updatedTask) => {
                            setTasks((prevTasks) =>
                              prevTasks.map((t) => (t.id_tarea === updatedTask.id_tarea ? updatedTask : t))
                            );
                          }}
                        />
                      );
                    })
                ) : (
                  <p>No tienes tareas asignadas que coincidan.</p>
                )}
              </div>
            </div>
          </>
        )}

        {localView === 'profile' && <UserView setView={setView} />}
      </div>
    </div>
  );
};

export default Homepage;
