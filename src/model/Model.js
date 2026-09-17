// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sua instância de conexão
const bcrypt = require('bcryptjs'); // Exemplo de biblioteca para hash de senha

// 1. Representação do Domínio como Classe
class User extends Model {
  
  // 2. Encapsulamento de Comportamento (Regras de Domínio/Métodos auxiliares)
  // Verifica se a senha fornecida bate com o hash salvo no banco
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  // Método de domínio para verificar se o usuário é maior de idade
  isAdult() {
    if (!this.birth_date) return false;
    const ageDifMs = Date.now() - new Date(this.birth_date).getTime();
    const ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
  }
}

// 3. Mapeamento da Tabela via ORM
User.init(
  {
    // O Sequelize cria o ID automaticamente (auto-increment) se omitido
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Validação nativa do ORM
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.VIRTUAL, // Campo virtual (não vai para o banco de dados)
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Nome da tabela no banco de dados
    hooks: {
      // Gatilho que executa automaticamente antes de salvar o registro
      beforeSave: async (user) => {
        if (user.password) {
          user.password_hash = await bcrypt.hash(user.password, 8);
        }
      },
    },
  }
);

module.exports = User;
