const db = require('./config/db');

db.query('SHOW TABLES', (err, results) => {
  if (err) {
    console.error('Error al hacer la consulta:', err);
    return;
  }
  console.log('Tablas en la base de datos:', results);
});
