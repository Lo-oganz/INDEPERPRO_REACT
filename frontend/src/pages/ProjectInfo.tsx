import React, { useState } from 'react';

const ProjectInfo: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [titulo, setTitulo] = useState('Proyecto de Ejemplo');
  const [descripcion, setDescripcion] = useState('Este es un proyecto de ejemplo con una descripción editable.');

  const [draftTitulo, setDraftTitulo] = useState(titulo);
  const [draftDescripcion, setDraftDescripcion] = useState(descripcion);

  const handleSave = () => {
    setTitulo(draftTitulo);
    setDescripcion(draftDescripcion);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraftTitulo(titulo);
    setDraftDescripcion(descripcion);
    setEditing(false);
  };

  return (
    <div className="project-info p-4 border rounded-xl shadow-md max-w-xl mx-auto bg-white">
      <h2 className="text-xl font-bold mb-4">Información del Proyecto</h2>
      {editing ? (
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="font-medium">Título:</span>
            <input
              className="border p-2 rounded"
              type="text"
              value={draftTitulo}
              onChange={e => setDraftTitulo(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="font-medium">Descripción:</span>
            <textarea
              className="border p-2 rounded resize-none"
              value={draftDescripcion}
              onChange={e => setDraftDescripcion(e.target.value)}
              rows={4}
            />
          </label>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Guardar
            </button>
            <button onClick={handleCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p><strong>Título:</strong> {titulo}</p>
          <p><strong>Descripción:</strong> {descripcion}</p>
          <button onClick={() => setEditing(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectInfo;
