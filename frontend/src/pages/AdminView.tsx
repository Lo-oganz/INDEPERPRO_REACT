import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard.tsx';
import './CSS/admincss.css'; 
import { View } from '../types.tsx';

//View que muestra usuarios para eliminar, las tareas existentes y todas las etiquetas. Todos para eliminar

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
    <div className="admin-bg">
      <div className="topbar">
        <button
          onClick={() => {
            localStorage.clear();
            setView('login');
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2 className="section-title">Usuarios</h2>
          <div className="admin-cards">
            {users.map(user => (
              <div key={user.id_usuario} className="admin-card">
                <span>{user.nombre}</span>
                <button onClick={() => eliminarUsuario(user.id_usuario)}>Eliminar</button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <h2 className="section-title">Tareas</h2>
          <div className="admin-cards tareas-scroll">
            {tasks.map(task => {
              const user = users.find(u => u.id_usuario === task.id_usuario);
              return (
                <div key={task.id_tarea} className="task-wrapper">
                  <TaskCard task={task} user={user} />
                  <button
                    className="delete-task"
                    onClick={() => eliminarTarea(task.id_tarea)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-section">
          <h2 className="section-title">Etiquetas</h2>
          <div className="admin-cards">
            {etiquetas.map(et => (
              <div key={et.id_etiqueta} className="admin-card">
                <span>{et.nombre}</span>
                <button onClick={() => eliminarEtiqueta(et.id_etiqueta)}>Eliminar</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminView;
