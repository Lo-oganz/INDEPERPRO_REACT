// src/views/AdminView.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard.tsx';
import './CSS/homepage.css';
import { Home, User } from 'lucide-react';
import { View } from '../types.tsx';

interface User {
  id_usuario: number;
  nombre: string;
}

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
  etiqueta: Etiqueta | null;
}

interface Props {
  setView: (view: View) => void;
}

const AdminView: React.FC<Props> = ({ setView }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [localView, setLocalView] = useState<'home' | 'profile'>('home');

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(res => setUsers(res.data));

    axios.get('http://localhost:3000/api/tareas')
      .then(res => {
        const tareasConEtiqueta = res.data.map((t: any) => ({
          ...t,
          etiqueta: t.nombre_etiqueta ? { nombre: t.nombre_etiqueta } : null,
        }));
        setTasks(tareasConEtiqueta);
      });

    axios.get('http://localhost:3000/api/etiquetas')
      .then(res => setEtiquetas(res.data));
  }, []);

  const eliminarUsuario = (id: number) => {
    axios.delete(`http://localhost:3000/api/usuarios/${id}`)
      .then(() => setUsers(prev => prev.filter(u => u.id_usuario !== id)));
  };

  const eliminarTarea = (id: number) => {
    axios.delete(`http://localhost:3000/api/tareas/${id}`)
      .then(() => setTasks(prev => prev.filter(t => t.id_tarea !== id)));
  };

  const eliminarEtiqueta = (id: number) => {
    axios.delete(`http://localhost:3000/api/etiquetas/${id}`)
      .then(() => setEtiquetas(prev => prev.filter(e => e.id_etiqueta !== id)));
  };

  return (
    <div className="bg">
      {/* Topbar igual que en Homepage */}
      <div className="topbar">
        <button
          onClick={() => {
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('username');
            setView('login');
          }}
          style={{ float: 'right' }}
        >
          Cerrar sesión
        </button>
      </div>


      <div className="content" style={{ marginLeft: '10vh', paddingTop: '10vh' }}>
        {localView === 'home' && (
          <>
            <h2>Gestión de Usuarios</h2>
            <div className="tasks">
              {users.map(user => (
                <div key={user.id_usuario} className="task-card">
                  <h4>{user.nombre}</h4>
                  <button onClick={() => eliminarUsuario(user.id_usuario)}>Eliminar</button>
                </div>
              ))}
            </div>

            <h2>Gestión de Tareas</h2>
            <div className="tasks">
              {tasks.map(task => {
                const user = users.find(u => u.id_usuario === task.id_usuario);
                return (
                  <div key={task.id_tarea} style={{ position: 'relative' }}>
                    <TaskCard task={task} user={user} />
                    <button
                      style={{ position: 'absolute', top: '10px', right: '10px' }}
                      onClick={() => eliminarTarea(task.id_tarea)}
                    >
                      Eliminar
                    </button>
                  </div>
                );
              })}
            </div>

            <h2>Gestión de Etiquetas</h2>
            <div className="tasks">
              {etiquetas.map(et => (
                <div key={et.id_etiqueta} className="task-card">
                  <h4>{et.nombre}</h4>
                  <button onClick={() => eliminarEtiqueta(et.id_etiqueta)}>Eliminar</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminView;
