const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MysqlPassword',
  database: 'DBINDEPERPRO'
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar con la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

module.exports = db;
