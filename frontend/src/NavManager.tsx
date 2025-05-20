// frontend/src/NavManager.tsx
import React, { useState } from 'react';
import WelcomeView from './pages/WelcomeView.tsx';
import LoginView from './pages/LoginView.tsx';
import RegisterView from './pages/RegisterView.tsx';
import Homepage from './pages/HomePageView.tsx';
import NewProjectView from './pages/NewTaskView.tsx';

// Importa las vistas nuevas
import AdminView from './pages/AdminView.tsx';
import JefeProyectoView from './pages/JefeProyectoView.tsx';

export type View = 
  | 'welcome' 
  | 'login' 
  | 'register' 
  | 'homepage' 
  | 'profile' 
  | 'newProject'
  | 'adminView'          // Nueva vista admin
  | 'jefeProyectoView';  // Nueva vista jefe proyecto

const NavManager = () => {
  const [view, setView] = useState<View>('welcome');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

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

      {view === 'homepage' && userId !== null && (
        <Homepage userId={userId} setView={setView} />
      )}

      {view === 'newProject' && userId !== null && (
        <NewProjectView setView={setView} userId={userId} />
      )}

      {view === 'adminView' && (
        <AdminView />
      )}

      {view === 'jefeProyectoView' && (
        <JefeProyectoView />
      )}
    </>
  );
};

export default NavManager;
