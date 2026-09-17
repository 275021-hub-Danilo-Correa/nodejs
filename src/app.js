const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Olá! Meu servidor Express está no ar!\n');
});

app.listen(PORT,  () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});