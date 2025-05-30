const express = require('express');
const cors = require('cors');

const etiquetaRoutes = require('./routes/etiquetaRoutes');
const prioridadRoutes = require('./routes/prioridadRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
// En este fichero se usa la app de express para definir todos los endpoints y el puerto donde escucha la app del backend.
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/etiquetas', etiquetaRoutes);
app.use('/api/prioridades', prioridadRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/tareas', tareaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
