import React from 'react';
import logo from '../assets/logo.png';
import '../pages/CSS/topbar.css';

interface TopbarDashboardProps {
  username: string;
  onLogout: () => void;
}

const TopbarDashboard: React.FC<TopbarDashboardProps> = ({ username, onLogout }) => {
  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="topbar-logo" />
      <div className="topbar-right">
        <span className="username">{username}</span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default TopbarDashboard;
