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
  userRole: number;
  setView: (view: View) => void;
}

const Homepage: React.FC<Props> = ({ userId, userRole, setView }) => {
  const [localView, setLocalView] = useState<'home' | 'profile'>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
const storedUserId = parseInt(localStorage.getItem('userId') || '0'); // ✅

useEffect(() => {
  axios.get('http://localhost:3000/api/usuarios')
    .then(response => setUsers(response.data))
    .catch(error => console.error('Error al obtener usuarios:', error));

  axios.get('http://localhost:3000/api/tareas')
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error al obtener tareas:', error));
}, []);


  return (
    <div className="bg">
      <div className="topbar">
        Bienvenido — <strong>Tareas</strong>
        <button onClick={() => {
            localStorage.removeItem('userId'); // ✅ limpiamos
            setView('login'); }} style={{ float: 'right' }}>Cerrar sesión
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
            onClick={() => setView('newProject')}
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
                {tasks.length > 0 ? tasks.map(task => {
                  const user = users.find(u => u.id_usuario === task.id_usuario);
                  return <TaskCard key={task.id_tarea} task={task} user={user} />;
                }) : <p>No hay tareas registradas.</p>}
              </div>
            </div>

            <div className="task-group">
              <h3>Mis tareas</h3>
              <div className="tasks">
                {tasks.filter(task => task.id_usuario === storedUserId).length > 0 ? (
                  tasks
                    .filter(task => task.id_usuario === storedUserId)
                    .map(task => {
                      const user = users.find(u => u.id_usuario === task.id_usuario);
                      return <TaskCard key={task.id_tarea} task={task} user={user} />;
                    })
                ) : (
                  <p>No tienes tareas asignadas.</p>
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
