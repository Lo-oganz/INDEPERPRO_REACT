import React, { useEffect, useState } from 'react';
import TopbarDashboard from '../components/TopbarDashboard.tsx';
import Button from '../components/Button.tsx';
import axios from 'axios';
import type { View } from '../NavManager';

interface Props {
  setView: (view: View) => void;
  onProjectSelect: (projectId: number) => void;
  username: string;
  userId: number;
}

interface Proyecto {
  id_proyecto: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

const DashboardView: React.FC<Props> = ({ setView, onProjectSelect, username, userId }) => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:3000/api/user-projects/proyectos`, {
      params: { id_usuario: userId }
    })
    .then(res => setProyectos(res.data))
    .catch(err => console.error('Error al cargar proyectos del usuario:', err));
  }, [userId]);

  return (
    <div>
      <TopbarDashboard username={username} onLogout={() => setView('welcome')} />
      
      <h2>Mi Panel</h2>

      <h3>Proyectos</h3>
      {proyectos.length === 0 && <p>No tienes proyectos aún.</p>}
      {proyectos.map(proyecto => (
        <div
          key={proyecto.id_proyecto}
          className="project-card"
          onClick={() => onProjectSelect(proyecto.id_proyecto)}
        >
          {proyecto.nombre}
        </div>
      ))}

      <Button
        onClick={() => setView('newProject')}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear nuevo proyecto
      </Button>

      <h3>Tareas Pendientes</h3>
      <div className="task-card">Tarea de Proyecto 1</div>
      <div className="task-card">Tarea de Proyecto 2</div>
    </div>
  );
};

export default DashboardView;