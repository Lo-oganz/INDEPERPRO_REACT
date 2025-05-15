import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CSS/homepage.css';
import TaskCard from '../components/TaskCard.tsx';
import UserView from './Profile.tsx';
import { Home, User } from 'lucide-react';
import { View } from '../types.tsx';

interface Task {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fec_vencimiento: string;
  id_usuario: number;
  id_proyecto: number;
}

interface User {
  id_usuario: number;
  nombre: string;
}

interface Props {
  projectId: number;
  userId: number;
  setView: (view: View) => void;
}


const Homepage: React.FC<Props> = ({ projectId, userId, setView }) => {
  const [localView, setLocalView] = useState<'home' | 'profile'>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [permiso, setPermiso] = useState<string>('');

  const projectTasks = tasks.filter(task => task.id_proyecto === projectId);
  const pendientes = projectTasks.filter(task => task.estado.toLowerCase() === 'pendiente');
  const finalizadas = projectTasks.filter(task => task.estado.toLowerCase() === 'completada');
  const tareasUsuario = projectTasks.filter(task => task.id_usuario === userId);

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error al obtener usuarios:', error));

    axios.get('http://localhost:3000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error al obtener tareas:', error));
  }, []);

  useEffect(() => {
    if (!userId || !projectId) return;  // Esperar que existan ambos ids

    axios.get('http://localhost:3000/api/user-projects/permisos', {
      params: { id_usuario: userId, id_proyecto: projectId }
    })
      .then(res => setPermiso(res.data?.permisos || ''))
      .catch(err => {
        console.error('Error al obtener permisos:', err);
        setPermiso('Sin permisos');
      });
  }, [userId, projectId]);

  return (
    <div className="bg">
      <div className="topbar">
        Proyecto ID: {projectId} — Rol: <strong>{permiso}</strong>
        <button onClick={() => setView('dashboard')} style={{ float: 'right' }}>
          Volver al panel
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
        </div>

        {localView === 'home' && (
          <>
            <div className='card-group'>
              <p>Pendientes</p>
              <div className='card'>
                <span className="card-number">{pendientes.length}</span>
                <span className="card-label">Tareas pendientes</span>
              </div>

              <p>Finalizadas</p>
              <div className='card'>
                <span className="card-number">{finalizadas.length}</span>
                <span className="card-label">Tareas completadas</span>
              </div>
            </div>

            <div className='task-group'>
              <p>Tareas pendientes</p>
              <div className="tasks">
                <div className="task-list">
                  {pendientes.map(task => {
                    const user = users.find(u => u.id_usuario === task.id_usuario);
                    return <TaskCard key={task.id_tarea} task={task} user={user} />;
                  })}
                </div>
              </div>
            </div>

            <div className='task-group'>
              <p>Mis tareas</p>
              <div className="tasks">
                <div className="task-list">
                  {tareasUsuario.map(task => {
                    const user = users.find(u => u.id_usuario === task.id_usuario);
                    return <TaskCard key={task.id_tarea} task={task} user={user} />;
                  })}
                </div>
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
