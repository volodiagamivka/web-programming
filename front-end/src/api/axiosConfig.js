import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Базовий URL сервера
});

export default api;