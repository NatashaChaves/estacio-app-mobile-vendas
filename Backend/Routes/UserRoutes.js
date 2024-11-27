// routes/userRoutes.js
const express = require('express');
const { createUserController, getUsersController } = require('../Controllers/UserController');

const router = express.Router();

// Rota para criar usuário
router.post('/', createUserController);

// Rota para listar todos os usuários
router.get('/', getUsersController);

module.exports = router;
