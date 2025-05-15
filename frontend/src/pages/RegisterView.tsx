import React, { useState } from 'react';
import axios from 'axios';  // Importa axios
import './CSS/auth.css';
import { View } from '../types';
import TopbarAuth from '../components/TopbarAuth.tsx';  // IMPORTA EL COMPONENTE
import Footer from '../components/Footer.tsx';

interface RegisterViewProps {
  setView: (view: View) => void;
}

const RegisterView: React.FC<RegisterViewProps> = ({ setView }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  const [error, setError] = useState('');

  const validarContrasenia = (pass: string): boolean => {
    const tieneLetras = /[a-zA-Z]{5,}/.test(pass);
    const tieneNumeros = /\d{2,}/.test(pass);
    const tieneSimbolos = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return tieneLetras && tieneNumeros && tieneSimbolos;
  };

  const handleRegister = () => {
    if (contrasenia !== confirmarContrasenia) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (!validarContrasenia(contrasenia)) {
      setError('La contraseña debe tener mínimo 5 letras, 2 números y 1 símbolo.');
      return;
    }

    const userData = { nombre, email, contrasenia };

    axios.post('http://localhost:3000/api/usuarios', userData)
      .then(response => {
        console.log('Registro exitoso:', response.data);
        setError('');
        setView('login');
      })
      .catch(error => {
        console.error('Error al registrar el usuario:', error);
        setError('Hubo un error al registrar el usuario.');
      });
  };

  return (
    <div className='bg'>
      <TopbarAuth setView={setView} />  {/* AQUI USAMOS EL COMPONENTE */}

      <div className="auth-content">
        <div className="auth-container">
          <h2>Crear cuenta</h2>
          <hr />
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarContrasenia}
            onChange={(e) => setConfirmarContrasenia(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button onClick={handleRegister}>Crear cuenta</button>
          <p className="small-link" onClick={() => setView('login')}>
            ¿Ya tienes una cuenta? Inicia sesión
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterView;
