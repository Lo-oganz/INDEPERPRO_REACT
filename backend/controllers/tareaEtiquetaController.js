const TareaEtiqueta = require('../models/TareaEtiqueta');

exports.getAllTareaEtiquetas = (req, res) => {
  TareaEtiqueta.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getTareaEtiquetaById = (req, res) => {
  const id = req.params.id;
  TareaEtiqueta.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length) return res.status(404).json({ error: 'Relación no encontrada' });
    res.json(result[0]);
  });
};

exports.assignEtiquetaToTarea = (req, res) => {
  const { id_tarea, id_etiqueta } = req.body;
  if (!id_tarea || !id_etiqueta) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  TareaEtiqueta.assignEtiquetaToTarea(id_tarea, id_etiqueta, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Etiqueta asignada a tarea', id: result.insertId });
  });
};

exports.deleteTareaEtiqueta = (req, res) => {
  const id = req.params.id;
  TareaEtiqueta.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Relación eliminada' });
  });
};
