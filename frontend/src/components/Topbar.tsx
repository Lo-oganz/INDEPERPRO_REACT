import React from 'react';
import { View } from '../types'; 

interface TopbarProps {
  setView: (view: View) => void;
}

const Topbar: React.FC<TopbarProps> = ({ setView }) => (
  <div className="topbar">
    <button onClick={() => setView('login')}>Iniciar sesión</button>
    <button onClick={() => setView('register')}>Crear cuenta</button>
  </div>
);

export default Topbar;
