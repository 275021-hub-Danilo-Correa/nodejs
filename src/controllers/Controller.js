// controllers/UserController.js

// Importamos a camada de serviço (substitua pelo caminho real do seu projeto)
const UserService = require('../services/UserService');

class UserController {
  
  // Método para criar um recurso (Ex: POST /users)
  async create(req, res) {
    try {
      // 1. Lê os dados enviados no corpo (body) da requisição
      const { name, email, password } = req.body;

      // 2. Chama a camada de serviço para executar a lógica de negócio
      const newUser = await UserService.createUser({ name, email, password });

      // 3. Define o status HTTP (201 Created) e retorna o JSON com o resultado
      return res.status(201).json(newUser);
      
    } catch (error) {
      // Tratamento de erro básico: define status 400 (Bad Request) ou 500
      return res.status(error.status || 500).json({ error: error.message });
    }
  }

  // Método para atualizar um recurso por ID (Ex: PUT /users/:id)
  async update(req, res) {
    try {
      // 1. Lê os parâmetros da URL (params) e o corpo (body) da requisição
      const { id } = req.params;
      const dataToUpdate = req.body;

      // 2. Chama o serviço passando os parâmetros coletados
      const updatedUser = await UserService.updateUser(id, dataToUpdate);

      // 3. Define o status HTTP (200 OK) e retorna o JSON atualizado
      return res.status(200).json(updatedUser);

    } catch (error) {
      return res.status(error.status || 500).json({ error: error.message });
    }
  }
}

// Exporta uma instância da classe para ser utilizada no arquivo de rotas
module.exports = new UserController();
