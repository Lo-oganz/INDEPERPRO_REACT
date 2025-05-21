import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  setView: (view: string) => void;
}

const NewTagView: React.FC<Props> = ({ setView }) => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('El nombre de la etiqueta es obligatorio.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/api/etiquetas', { nombre });
      alert('Etiqueta creada con éxito.');
      setView('home'); // o la vista que corresponda tras creación
    } catch (err) {
      setError('Error al crear la etiqueta.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Nueva Etiqueta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la etiqueta:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear etiqueta'}
        </button>

        <button type="button" onClick={() => setView('home')} disabled={loading}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default NewTagView;
