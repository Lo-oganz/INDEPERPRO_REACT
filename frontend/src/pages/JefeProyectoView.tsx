import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard.tsx';
import UserView from './Profile.tsx';
import ProjectInfo from './ProjectInfo.tsx';
import { Home, User, Edit3, Plus } from 'lucide-react';
import { View } from '../types.tsx';
import './CSS/jefeproyecto.css';
//Este view también es importante, ya que es el que solo puede ver el JEFE de proyecto, una cuenta dada por el administrador en persona al trabajador elegido.
//Muestra las tareas totales, deja crear nuevas tareas y nuevas etiquetas y deja modificar los datos del proyecto actual.

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
  const [localView, setLocalView] = useState<'home' | 'profile' | 'projectInfo'>('home');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projectId] = useState<number>(1);

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuarios')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error al obtener usuarios:', err));

    axios.get('http://localhost:3000/api/tareas')
  .then(res => {
    const tareasConEtiqueta = res.data.map((t: any) => ({
      ...t,
      etiqueta: t.nombre_etiqueta ? { nombre: t.nombre_etiqueta } : null,
    }));
    setTasks(tareasConEtiqueta);
  })
  .catch(err => console.error('Error al obtener tareas:', err));
  }, []);

  

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

      <div className="content">
        <div className="navbar">
          <div className="icon" onClick={() => setLocalView('home')}>
            <Home size={24} />
          </div>
          <div className="icon" onClick={() => setLocalView('profile')}>
            <User size={24} />
          </div>
          <div className="icon" onClick={() => setLocalView('projectInfo')} title="Info del Proyecto">
            <Edit3 size={24} />
          </div>
          <div className="icon" onClick={() => setView('newTask')} title="Nueva Tarea">
            <Plus size={20} />
          </div>
        </div>

        {localView === 'home' && (
          <div className="task-group">
            <h3 className='titulo'>Jefe de Proyecto</h3>
            <p className="descripcion-rol">
              Puedes crear tareas y etiquetas, así como gestionar la información del proyecto.
            </p>
          <div style={{ marginBottom: '20px' }}>
                <button className="btn-new-task" onClick={() => setView('newEtiqueta')}>
                  Crear nueva etiqueta
                </button>
              </div>
            <h4>Todas las tareas</h4>
            <div className="tasks">
              {tasks.length > 0 ? tasks.map(task => {
                const user = users.find(u => u.id_usuario === task.id_usuario);
                return <TaskCard key={task.id_tarea} task={task} user={user} />;
              }) : <p>No hay tareas registradas.</p>}
            </div>
          </div>
        )}

        {localView === 'profile' && <UserView setView={setView} />}

        {localView === 'projectInfo' && <ProjectInfo />}
      </div>
    </div>
  );
};

export default JefeProyectoView;
