import React, { useState } from 'react';
import WelcomeView from './pages/WelcomeView.tsx';
import LoginView from './pages/LoginView.tsx';
import RegisterView from './pages/RegisterView.tsx';
import DashboardView from './pages/DashboardView.tsx';
import Homepage from './pages/HomePageView.tsx';
import NewProjectView from './pages/NewProjectView.tsx';

export type View = 'welcome' | 'login' | 'register' | 'dashboard' | 'homepage' | 'profile' | 'newProject';

const NavManager = () => {
  const [view, setView] = useState<View>('welcome');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  const handleProjectSelect = (projectId: number) => {
    setSelectedProjectId(projectId);
    setView('homepage');
  };

  return (
    <>
      {view === 'welcome' && <WelcomeView setView={setView} />}

      {view === 'login' && (
        <LoginView
          setView={setView}
          setUsername={setUsername}
          setUserId={setUserId}
        />
      )}

      {view === 'register' && <RegisterView setView={setView} />}

      {view === 'dashboard' && userId !== null && (
        <DashboardView
          setView={setView}
          onProjectSelect={handleProjectSelect}
          username={username}
          userId={userId} 
        />
      )}

      {view === 'homepage' && selectedProjectId !== null && userId !== null && (
        <Homepage projectId={selectedProjectId} userId={userId} setView={setView} />
      )}

      {view === 'newProject' && userId !== null && (
        <NewProjectView setView={setView} userId={userId} />
      )}
      
    </>
  );
};

export default NavManager;
