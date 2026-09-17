// services/UserService.js

// Importamos a camada de dados/repositório (substitua pelo seu ORM, ex: Prisma, Sequelize ou Mongoose)
const UserRepository = require('../repositories/UserRepository');

class UserService {
  
  // 1. REGRA DE NEGÓCIO E CRIAÇÃO
  async createUser(userData) {
    const { name, email, password } = userData;

    // Validação da regra da aplicação: O e-mail deve ser único
    const emailExists = await UserRepository.findByEmail(email);
    if (emailExists) {
      // Lançamos um erro de negócio puro. O controller decidirá o status HTTP (ex: 400 ou 409)
      const error = new Error('Este e-mail já está em uso.');
      error.status = 400; 
      throw error;
    }

    // Orquestração: Se passou na validação, envia para persistência
    // (Aqui você também poderia criptografar a senha com bcrypt antes de salvar)
    const newUser = await UserRepository.create({ name, email, password });

    return newUser;
  }

  // 2. BUSCA DE DADOS
  async getUserById(id) {
    const user = await UserRepository.findById(id);

    // Validação da regra da aplicação: Usuário precisa existir
    if (!user) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    return user;
  }

  // 3. ALTERAÇÃO DE DADOS
  async updateUser(id, updateData) {
    // Orquestração: Primeiro garante que o usuário existe
    const user = await this.getUserById(id);

    // Validação da regra da aplicação: Se o e-mail está mudando, verifica se já existe
    if (updateData.email && updateData.email !== user.email) {
      const emailExists = await UserRepository.findByEmail(updateData.email);
      if (emailExists) {
        const error = new Error('Este novo e-mail já está em uso por outro usuário.');
        error.status = 400;
        throw error;
      }
    }

    // Orquestração: Atualiza os dados após passar por todas as regras
    const updatedUser = await UserRepository.update(id, updateData);
    
    return updatedUser;
  }
}

// Exporta uma instância da classe para ser injetada/usada nos Controllers
module.exports = new UserService();
