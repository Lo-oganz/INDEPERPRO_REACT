const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_contraseña',
  database: 'DBINDEPERPRO' // Nombre de tu base de datos
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

module.exports = db;
