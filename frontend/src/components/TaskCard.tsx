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
  return (
    <div className="task-card">
      <h3>{task.titulo}</h3>
      <p>{task.descripcion}</p>
      <p><strong>Estado:</strong> {task.estado}</p>
      <p><strong>Prioridad:</strong> {task.prioridad || 'N/A'}</p>
      <p><strong>Asignado a:</strong> {user ? user.nombre : 'Desconocido'}</p>
    </div>
  );
};

export default TaskCard;
