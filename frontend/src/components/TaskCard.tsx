import React, { useState } from 'react';
import axios from 'axios';
import './TaskCard.css';

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
  task: Task;
  user: User | undefined;
  editable?: boolean; // para permitir abrir popup
  onStatusChange?: (updatedTask: Task) => void; // callback para actualizar estado en homepage
}

const TaskCard: React.FC<Props> = ({ task, user, editable = false, onStatusChange }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [newStatus, setNewStatus] = useState(task.estado);
  const [loading, setLoading] = useState(false);

  const getClassName = () => {
    if (task.estado === 'completada') return 'task-card completada';

    const prioridad = task.prioridad?.toLowerCase?.();

    switch (prioridad) {
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

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      const updated = { ...task, estado: newStatus };
      await axios.put(`http://localhost:3000/api/tareas/${task.id_tarea}`, updated);
      onStatusChange?.(updated);
      setShowPopup(false);
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={getClassName()}
        onClick={() => editable && setShowPopup(true)}
        style={{ cursor: editable ? 'pointer' : 'default' }}
      >
        <h3>{task.titulo}</h3>
        <p>{task.descripcion}</p>
        <p>
          <strong>Estado:</strong> {task.estado}
        </p>
        <p>
          <strong>Prioridad:</strong> {task.prioridad || 'N/A'}
        </p>
        <p>
          <strong>Asignado a:</strong> {user ? user.nombre : 'Desconocido'}
        </p>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => !loading && setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h4>Cambiar estado</h4>
            <select
              value={newStatus}
              onChange={(e) =>
                setNewStatus(e.target.value as 'pendiente' | 'en progreso' | 'completada')
              }
              disabled={loading}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
            <div className="popup-buttons">
              <button onClick={handleUpdateStatus} disabled={loading}>
                {loading ? 'Guardando...' : 'Aceptar'}
              </button>
              <button onClick={() => !loading && setShowPopup(false)} disabled={loading}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskCard;
