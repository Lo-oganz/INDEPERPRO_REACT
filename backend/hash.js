const bcrypt = require('bcrypt');
// Esto es un ejemplo de como hashear una contraseña para realizar 2 cuentas nuevas. 
const passwords = ['123456', '123456']; 

passwords.forEach(async (pass, i) => {
  const hash = await bcrypt.hash(pass, 10);
  console.log(`Hash ${i + 1}: ${hash}`);
});
