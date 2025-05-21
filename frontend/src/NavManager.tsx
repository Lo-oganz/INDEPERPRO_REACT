import React, { useEffect, useState } from 'react';
import WelcomeView from './pages/WelcomeView.tsx';
import LoginView from './pages/LoginView.tsx';
import RegisterView from './pages/RegisterView.tsx';
import Homepage from './pages/HomePageView.tsx';
import NewProjectView from './pages/NewTaskView.tsx';
import AdminView from './pages/AdminView.tsx';
import JefeProyectoView from './pages/JefeProyectoView.tsx';
import { View } from './types';

const NavManager = () => {
  const [view, setView] = useState<View>('welcome');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<number | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('userRole');
    const storedName = localStorage.getItem('username');

    if (storedId && storedRole) {
      setUserId(Number(storedId));
      setUserRole(Number(storedRole));
      setUsername(storedName || '');
      setView('homepage');
    }
  }, []);
  
  return (
    <>
      {view === 'welcome' && <WelcomeView setView={setView} />}
      {view === 'login' && (
        <LoginView
          setView={(v) => setView(v)}
          setUsername={setUsername}
          setUserId={setUserId}
          setUserRole={setUserRole}
        />
      )}
      {view === 'register' && <RegisterView setView={setView} />}
      {view === 'homepage' && userId !== null && userRole !== null && (
        <Homepage userId={userId} userRole={userRole} setView={setView} />
      )}
      {view === 'newProject' && userId !== null && userRole === 3 && (
        <NewProjectView setView={setView} userId={userId} />
      )}
      {view === 'adminView' && userRole === 1 && <AdminView />}
      {view === 'jefeProyectoView' && userRole === 3 && <JefeProyectoView />}
    </>
  );
};

export default NavManager;
