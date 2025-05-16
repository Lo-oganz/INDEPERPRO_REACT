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
  estado: 'pendiente' | 'en progreso' | 'completada';
  prioridad: string;
  id_usuario: number;
}

interface User {
  id_usuario: number;
  nombre: string;
}

interface Props {
  userId: number;
  setView: (view: View) => void;
}

const Homepage: React.FC<Props> = ({ userId, setView }) => {
  const [localView, setLocalView] = useState<'home' | 'profile'>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error al obtener usuarios:', error));

    axios.get('http://localhost:3000/api/tareas')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error al obtener tareas:', error));
  }, []);

  const pendientes = tasks.filter(task => task.estado === 'pendiente');
  const enProgreso = tasks.filter(task => task.estado === 'en progreso');
  const finalizadas = tasks.filter(task => task.estado === 'completada');

  const tareasAlta = pendientes.filter(t => t.prioridad.toLowerCase() === 'alta');
  const tareasMedia = pendientes.filter(t => t.prioridad.toLowerCase() === 'media');
  const tareasBaja = pendientes.filter(t => t.prioridad.toLowerCase() === 'baja');


  const tareasUsuario = tasks.filter(task => task.id_usuario === userId);

  return (
    <div className="bg">
      <div className="topbar">
        Bienvenido — <strong>Tareas</strong>
        <button onClick={() => setView('login')} style={{ float: 'right' }}>
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
        </div>

        {localView === 'home' && (
          <>
            <div className='card-group'>
              <p>Pendientes</p>
              <div className='card'>
                <span className="card-number">{pendientes.length}</span>
                <span className="card-label">Tareas pendientes</span>
              </div>

              <p>En progreso</p>
              <div className='card'>
                <span className="card-number">{enProgreso.length}</span>
                <span className="card-label">Tareas en progreso</span>
              </div>

              <p>Finalizadas</p>
              <div className='card'>
                <span className="card-number">{finalizadas.length}</span>
                <span className="card-label">Tareas completadas</span>
              </div>
            </div>

            <div className='task-group'>
              <h3>Prioridad Alta</h3>
              <div className="tasks">
                {tareasAlta.length > 0 ? tareasAlta.map(task => {
                  const user = users.find(u => u.id_usuario === task.id_usuario);
                  return <TaskCard key={task.id_tarea} task={task} user={user} />;
                }) : <p>No hay tareas con prioridad alta</p>}
              </div>
            </div>

            <div className='task-group'>
              <h3>Prioridad Media</h3>
              <div className="tasks">
                {tasks.length > 0 ? tasks.map(task => {
                  const user = users.find(u => u.id_usuario === task.id_usuario);
                  return <TaskCard key={task.id_tarea} task={task} user={user} />;
                }) : <p>No hay tareas disponibles</p>}
              </div>

            </div>

            <div className='task-group'>
              <h3>Prioridad Baja</h3>
              <div className="tasks">
                {tareasBaja.length > 0 ? tareasBaja.map(task => {
                  const user = users.find(u => u.id_usuario === task.id_usuario);
                  return <TaskCard key={task.id_tarea} task={task} user={user} />;
                }) : <p>No hay tareas con prioridad baja</p>}
              </div>
            </div>

            <div className='task-group'>
              <h3>Mis tareas</h3>
              <div className="tasks">
                {tareasUsuario.length > 0 ? tareasUsuario.map(task => {
                  const user = users.find(u => u.id_usuario === task.id_usuario);
                  return <TaskCard key={task.id_tarea} task={task} user={user} />;
                }) : <p>No tienes tareas asignadas.</p>}
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
