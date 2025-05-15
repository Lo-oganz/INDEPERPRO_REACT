import React from 'react';
import '../pages/CSS/topbar.css';

interface TopbarProjectProps {
  username: string;
  projectName: string;
  onLogout: () => void;
}

const TopbarProject: React.FC<TopbarProjectProps> = ({ username, projectName, onLogout }) => {
  return (
    <div className="topbar">
      <div className="topbar-center">
        <h2 className="project-name">{projectName}</h2>
      </div>
      <div className="topbar-right">
        <span className="username">{username}</span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default TopbarProject;
