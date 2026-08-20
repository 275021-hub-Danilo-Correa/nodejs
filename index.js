const http = require('http');
const hostname = '0.0.0.0' ;
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('Olá! Meu servidor web no Codespaces está no ar 🚀\n');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando e escutando na porta ${PORT}`);
});