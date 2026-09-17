const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Olá! Meu servidor Express está no ar!\n');
});

const produto = [
    {"id": 1, "nome": "notebook", "preco": 2500.00},
    {"id": 2, "nome": "mouse", "preco": 200.00}
];

app.get('/produtos', (req, res) => {
    res.status(200).json(produto);
});

app.listen(PORT,  () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});

