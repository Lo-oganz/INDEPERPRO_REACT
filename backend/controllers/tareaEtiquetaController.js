const TareaEtiqueta = require('../models/TareaEtiqueta');

exports.agregarEtiqueta = (req, res) => {
  const { id_tarea, id_etiqueta } = req.body;
  if (!id_tarea || !id_etiqueta) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  TareaEtiqueta.add(id_tarea, id_etiqueta, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al asociar etiqueta' });
    res.json({ message: 'Etiqueta agregada a la tarea' });
  });
};

exports.obtenerEtiquetasDeTarea = (req, res) => {
  const id_tarea = req.params.id;

  TareaEtiqueta.getEtiquetasByTarea(id_tarea, (err, etiquetas) => {
    if (err) return res.status(500).json({ error: 'Error al obtener etiquetas' });
    res.json(etiquetas);
  });
};

exports.eliminarEtiquetasDeTarea = (req, res) => {
  const id_tarea = req.params.id;

  TareaEtiqueta.deleteAllForTarea(id_tarea, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar etiquetas' });
    res.json({ message: 'Etiquetas eliminadas de la tarea' });
  });
};
