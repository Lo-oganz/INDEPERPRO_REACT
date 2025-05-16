import React, { useState } from 'react';
import TopbarAuth from '../components/TopbarAuth.tsx';
import Footer from '../components/Footer.tsx';
import InputField from '../components/InputField.tsx';
import Button from '../components/Button.tsx';
import { View } from '../types';
import axios from 'axios';
import './CSS/login.css';

interface LoginViewProps {
  setView: (view: View) => void;
  setUsername: (name: string) => void;
  setUserId: (id: number) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ setView, setUsername, setUserId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');

  const handleLogin = () => {
    const loginData = { email, password };

    axios.post('http://localhost:3000/api/auth/login', loginData)
      .then(response => {
        const { id_usuario, nombre } = response.data;
        setUserId(id_usuario);
        setUsername(nombre);
        setView('homepage');
      })


      .catch(() => {
        setError('Credenciales incorrectas.');
      });
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
