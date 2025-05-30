import React, { useEffect, useState } from 'react';
import WelcomeView from './pages/WelcomeView.tsx';
import LoginView from './pages/LoginView.tsx';
import RegisterView from './pages/RegisterView.tsx';
import Homepage from './pages/HomePageView.tsx';
import NewTaskView from './pages/NewTaskView.tsx';
import AdminView from './pages/AdminView.tsx';
import JefeProyectoView from './pages/JefeProyectoView.tsx';
import ProjectInfo from './pages/ProjectInfo.tsx';
import NewEtiquetaView from './pages/NewEtiqueta.tsx';

//Aquí, MUY IMPORTANTE, manejamos todas las views del proyecto.

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

      if (Number(storedRole) === 3) {
        setView('jefeProyectoView');
      } else if (Number(storedRole) === 1) {
        setView('adminView');
      } else {
        setView('homepage');
      }
    }
  }, []);

  return (
    <>
      {view === 'welcome' && <WelcomeView setView={setView} />}
      {view === 'login' && (
        <LoginView
          setView={setView}
          setUsername={setUsername}
          setUserId={setUserId}
          setUserRole={setUserRole}
        />
      )}
      {view === 'register' && <RegisterView setView={setView} />}

      {view === 'homepage' && userId !== null && userRole !== null && userRole !== 3 && userRole !== 1 && (
        <Homepage userId={userId} userRole={userRole} setView={setView} />
      )}

      {view === 'jefeProyectoView' && userId !== null && userRole === 3 && (
        <JefeProyectoView userId={userId} userRole={userRole} setView={setView} />
      )}

      {view === 'newTask' && userId !== null && userRole === 3 && (
        <NewTaskView setView={setView} userId={userId} userRole={userRole} />
      )}

      {view === 'adminView' && userRole === 1 && <AdminView setView={setView} />}

      {view === 'projectInfo' && <ProjectInfo />}

      {view === 'newEtiqueta' && userId !== null && userRole === 3 && (
        <NewEtiquetaView setView={setView} />
      )}
    </>
  );
};

export default NavManager;
