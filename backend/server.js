const express = require('express');
const cors = require('cors');
const jwtMiddleware = require('./middleware/jwtMiddleware');

const etiquetaRoutes = require('./routes/etiquetaRoutes');
const prioridadRoutes = require('./routes/prioridadRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const tareaEtiquetaRoutes = require('./routes/tareaEtiquetaRoutes');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use(jwtMiddleware);

app.use('/api/etiquetas', etiquetaRoutes);
app.use('/api/prioridades', prioridadRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/tarea-etiqueta', tareaEtiquetaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
