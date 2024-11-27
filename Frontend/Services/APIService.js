import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export const apiLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao autenticar');
  }
};
export const isloggin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/is-login`, { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao autenticar');
    }
  };
