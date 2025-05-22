import React from 'react';
import './CSS/welcome.css';
import { FaClipboardList, FaRocket, FaComments } from 'react-icons/fa';

interface Props {
  setView: (view: 'login' | 'register') => void;
}
//Este es el view q recibirá al usuario si no ha iniciado nadie sesión antes.
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
          Gestiona tareas sin complicaciones. Planifica, trabaja y colabora mejor.
        </p>

        <div className="features">
          <div className="feature-box">
            <FaClipboardList size={40} />
            <h2>Organizar</h2>
            <hr />
            <p>
              Con la gestión de tareas, el etiquetado y las prioridades, cada miembro sabe exactamente qué debe hacer.
              Además, los filtros y estados de tareas ayudan a visualizar el progreso del equipo en todo momento.
            </p>
          </div>

          <div className="feature-box">
            <FaRocket size={40} />
            <h2>Producir</h2>
            <hr />
            <p>
              La herramienta está diseñada para optimizar el flujo de trabajo y aumentar la productividad. 
              Al definir claramente las tareas y responsables, los desarrolladores pueden concentrarse en avanzar en el proyecto sin distracciones ni confusión.
            </p>
          </div>

          <div className="feature-box">
            <FaComments size={40} />
            <h2>Comunicar</h2>
            <hr />
            <p>
              El éxito de un equipo depende de una buena comunicación. 
              La aplicación permite que se adjudiquen etiquetas para poder comunicar de qué tipo trata susodicha tarea.
            </p>
          </div>
        </div>
      </div>

        <footer className="footer">
          <h3>Contacto</h3>
          <p>Correo: robigarcia@gmail.com</p>
          <p>Teléfono: +34 717 710 900</p>
        </footer>
    </div>
  );
};

export default WelcomeView;
