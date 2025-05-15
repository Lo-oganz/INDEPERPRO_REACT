import React from 'react';
import './CSS/welcome.css';
import { FaClipboardList, FaRocket, FaComments } from 'react-icons/fa';

interface Props {
  setView: (view: 'login' | 'register') => void;
}

const WelcomeView: React.FC<Props> = ({ setView }) => {
  return (
    <div className="welcome-bg">
      <div className="topbar">
        <button onClick={() => setView('login')}>Iniciar sesión</button>
        <button onClick={() => setView('register')}>Crear cuenta</button>
      </div>
      <div className="welcome-content">
        <h1 className="main-title">Convierte el caos en productividad</h1>
         <p className="subtitle">
          Gestiona proyectos sin complicaciones. Planifica, trabaja y colabora mejor.
        </p>

        <div className="features">
          <div className="feature-box">
            <FaClipboardList size={40} />
            <h2>Organizar</h2>
            <hr />
            <p>
              Con la gestión de proyectos, tareas y asignaciones, cada miembro sabe exactamente qué debe hacer y cuáles son los plazos.
              Además, los filtros y estados de tareas ayudan a visualizar el progreso del equipo en todo momento.
            </p>
          </div>

          <div className="feature-box">
            <FaRocket size={40} />
            <h2>Producir</h2>
            <hr />
            <p>
              La herramienta está diseñada para optimizar el flujo de trabajo y aumentar la productividad. 
              Al definir claramente las tareas y responsables, los desarrolladores pueden concentrarse en avanzar en sus proyectos sin distracciones ni confusión.
            </p>
          </div>

          <div className="feature-box">
            <FaComments size={40} />
            <h2>Comunicar</h2>
            <hr />
            <p>
              El éxito de un equipo depende de una buena comunicación. 
              La aplicación permite que los miembros colaboren dentro de cada tarea, dejando comentarios, adjuntando archivos 
              y manteniendo un historial de cambios para evitar malentendidos.
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <h3>Contacto</h3>
        <p>Correo: contacto@appfalsa.com</p>
        <p>Teléfono: +34 600 000 000</p>
      </footer>
    </div>
  );
};

export default WelcomeView;
