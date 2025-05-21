import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard.tsx';
import UserView from './Profile.tsx';
import { Home, User, MoreHorizontal, Plus } from 'lucide-react';
import { View } from '../types.tsx';
import './CSS/jefeProyecto.css';

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

const JefeProyectoView: React.FC<Props> = ({ userId, userRole, setView }) => {
  const [localView, setLocalView] = useState<'home' | 'profile' | 'options'>('home');
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

  return (
    <div className="bg-jp">
      <div className="topbar-jp">
        Bienvenido — <strong>Jefe de Proyecto</strong>
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

      <div className="content-jp">
        <div className="navbar-jp">
          <div className="icon" onClick={() => setLocalView('home')}>
            <Home size={24} />
          </div>
          <div className="icon" onClick={() => setLocalView('profile')}>
            <User size={24} />
          </div>

          {/* Botón de 3 puntitos para opciones (view especial) */}
          <div
            className="icon"
            title="Opciones"
            onClick={() => setLocalView('options')}
          >
            <MoreHorizontal size={24} />
          </div>

          <button
            onClick={() => setView('newTask')}
            className="btn-new-task-jp"
            title="Nueva tarea"
          >
            <Plus size={20} />
          </button>
        </div>

        {localView === 'home' && (
          <div className="task-group-jp">
            <h3>Rol: Jefe de Proyecto</h3>
            <p className="descripcion-rol">
              Como Jefe de Proyecto, puedes asignar tareas, crear nuevas, modificarlas o eliminarlas. 
              También gestionas la información general del proyecto para mantenerlo actualizado.
            </p>

            <h3>Todas las tareas</h3>
            <div className="tasks-jp">
              {tasks.length > 0 ? tasks.map(task => {
                const user = users.find(u => u.id_usuario === task.id_usuario);
                return <TaskCard key={task.id_tarea} task={task} user={user} />;
              }) : <p>No hay tareas registradas.</p>}
            </div>
          </div>
        )}

        {localView === 'profile' && <UserView setView={setView} />}

        {localView === 'options' && (
          <div className="options-view-jp">
            <h3>Gestión de Proyecto</h3>
            <p>Aquí podrás modificar la información del proyecto, asignar tareas, eliminarlas y más funcionalidades futuras.</p>
            {/* Aquí puedes agregar más UI o botones para esas funcionalidades */}
          </div>
        )}
      </div>
    </div>
  );
};

export default JefeProyectoView;
