// server.js
require('dotenv').config();  // Carrega as variáveis de ambiente
const express = require('express');
const userRoutes = require('./Routes/UserRoutes');
const cors = require('cors');
const app = express();
const { createClient } = require('@supabase/supabase-js');

// Permitir que o frontend React Native se conecte ao servidor
app.use(cors());
app.use(express.json()); // Para parsear o corpo das requisições JSON
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Função para gerar o JWT
const generateToken = (user) => {
  return jwt.sign(
    { user_id: user.id, email: user.email },
    process.env.JWT_SECRET, // Defina uma chave secreta no .env
    { expiresIn: '1h' } // Expiração do token (1 hora)
  );
};

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // Verificar se o usuário existe no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = generateToken(data.user);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
});
// Função para verificar o token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Espera o token no formato "Bearer token"

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado' });
    }

    // Se o token for válido, podemos verificar a sessão no Supabase (ou outros dados)
    const { data, error } = await supabase.auth.api.getUser(decoded.user_id);
    if (error || !data) {
      return res.status(403).json({ error: 'Sessão expirada ou inválida' });
    }

    // Adicionar as informações do usuário na requisição
    req.user = data;
    next();
  });
};

// Rota de verificação da sessão
app.get('/check-session', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Usuário autenticado', user: req.user });
});
// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
// Roteamento
app.use('/api/users', userRoutes);

