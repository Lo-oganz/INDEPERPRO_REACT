const bcrypt = require('bcrypt');

const passwords = ['123456', '123456']; // para ambos usuarios, puedes cambiar

passwords.forEach(async (pass, i) => {
  const hash = await bcrypt.hash(pass, 10);
  console.log(`Hash ${i + 1}: ${hash}`);
});
