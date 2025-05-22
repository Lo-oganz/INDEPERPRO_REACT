import React from 'react';
import { View } from '../types';
import logo from '../assets/logo.png';
import '../pages/CSS/topbar.css';

interface TopbarAuthProps {
  setView: (view: View) => void;
}
//Para la barra superior de navegación en la autenticación.
const TopbarAuth: React.FC<TopbarAuthProps> = ({ setView }) => {
  return (
    <div className="topbar">
      <img
        src={logo}
        alt="Logo"
        style={{ height: '40px', cursor: 'pointer' }}
        onClick={() => setView('welcome')}
      />
      <div style={{ marginLeft: 'auto' }}>
        <button onClick={() => setView('login')}>Iniciar sesión</button>
        <button onClick={() => setView('register')}>Crear cuenta</button>
      </div>
    </div>
  );
};

export default TopbarAuth;
