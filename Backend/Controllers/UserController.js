// controllers/userController.js
const { createUser, getUsers } = require('../Models/User');

// Função para criar um novo usuário
const createUserController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await createUser(name, email, password);
    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Função para listar todos os usuários
const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createUserController, getUsersController };
