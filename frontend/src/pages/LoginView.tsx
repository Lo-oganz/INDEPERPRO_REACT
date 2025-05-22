import React, { useState } from 'react';
import TopbarAuth from '../components/TopbarAuth.tsx';
import Footer from '../components/Footer.tsx';
import InputField from '../components/InputField.tsx';
import Button from '../components/Button.tsx';
import { View } from '../types';
import axios from 'axios';
import './CSS/login.css';

//Aquí se inicia sesión correctamente

interface LoginViewProps {
  setView: (view: View) => void;
  setUsername: (name: string) => void;
  setUserId: (id: number) => void;
  setUserRole: (role: number) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ setView, setUsername, setUserId, setUserRole  }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const loginData = { email, password };

  const handleLogin = () => {
    axios.post('http://localhost:3000/api/auth/login', loginData)
      .then(response => {
        const { id_usuario, nombre, id_rol } = response.data.usuario;
        setUserId(id_usuario);
        setUsername(nombre);
        setUserRole(id_rol);
        localStorage.setItem('userId', id_usuario.toString());
        localStorage.setItem('userRole', id_rol.toString());

        if (id_rol === 1) setView('adminView');
        else if (id_rol === 3) setView('jefeProyectoView');
        else setView('homepage');
      })
      .catch(() => setError('Credenciales incorrectas.'));
  };

  return (
    <div className="bg">
      <TopbarAuth setView={setView} />
      
      <div className="auth-content">
        <div className="auth-containerr">
          <h2>Iniciar sesión</h2>
          <hr />
          <InputField
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <Button onClick={handleLogin}>Entrar</Button>
          <p className="small-link" onClick={() => setView('register')}>
            ¿No tienes cuenta? Regístrate
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginView;
