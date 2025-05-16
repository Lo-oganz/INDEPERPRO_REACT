import React from 'react';
import './TaskCard.css';

interface Task {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  id_usuario: number;
}

interface User {
  id_usuario: number;
  nombre: string;
}

interface Props {
  task: Task;
  user: User | undefined;
}

const TaskCard: React.FC<Props> = ({ task, user }) => {
  const getClassName = () => {
    if (task.estado === 'completada') return 'task-card completada';
    switch (task.prioridad.toLowerCase()) {
      case 'alta':
        return 'task-card alta';
      case 'media':
        return 'task-card media';
      case 'baja':
        return 'task-card baja';
      default:
        return 'task-card';
    }
  };

  return (
    <div className={getClassName()}>
      <h3>{task.titulo}</h3>
      <p>{task.descripcion}</p>
      <p><strong>Estado:</strong> {task.estado}</p>
      <p><strong>Prioridad:</strong> {task.prioridad || 'N/A'}</p>
      <p><strong>Asignado a:</strong> {user ? user.nombre : 'Desconocido'}</p>
    </div>
  );
};

export default TaskCard;
