const supabase = require('../Config/supabase');

const createUser = async (name, email, password) => {
  try {
    const { data, error } = await supabase
      .from('user')  // Aqui, 'users' é o nome da tabela no PostgreSQL
      .insert([
        { name, email, password },
      ]);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    throw new Error('Erro ao criar usuário');
  }
};

// Função para listar todos os usuários
const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*');  // Retorna todos os registros

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    throw new Error('Erro ao buscar usuários');
  }
};

module.exports = { createUser, getUsers };
