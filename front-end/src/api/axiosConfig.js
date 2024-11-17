import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export const registerUser = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    console.error('Помилка реєстрації користувача:', error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token); 
    return response.data;
  } catch (error) {
    console.error('Помилка входу користувача:', error);
    throw error;
  }
};

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return api.get(`/hotels?${params}`);
};

export const getFilteredHotels = async (filters) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await api.get(`/hotels?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Помилка завантаження готелів:", error);
    return [];
  }
};

export const addToCartToServer = async ({ hotelId, people, nights, price }) => {
  console.log('Дані для надсилання:', { hotelId, people, nights, price });
  try {
    const response = await api.post(`/cart`, { hotelId, people, nights, price });
    console.log('Відповідь сервера:', response.data);
    return response.data;
  } catch (error) {
    console.error('Помилка додавання товару до кошика на сервері:', error.response?.data || error.message);
    throw error;
  }
};



export const getCart = async () => {
  try {
      const response = await api.get(`/cart`);
      return response.data;
  } catch (error) {
      console.error("Помилка отримання кошика:", error);
      return [];
  }
};



export const updateCart = async (itemId, updatedData) => {
  return await api.put(`/cart/${itemId}`, updatedData);
};


export const removeFromCart = async (itemId) => {
  return await api.delete(`/cart/${itemId}`);
};


export const getHotelDetails = async (id) => {
  try {
      const response = await api.get(`/hotels/${id}`);
      return response.data;
  } catch (error) {
      console.error('Помилка завантаження деталей готелю:', error);
      throw error;
  }
};

export const updateCartItemDetails = async (itemId, nights, people) => {
  try {
      const response = await api.put(`/cart/${itemId}`, { nights, people });
      return response.data;
  } catch (error) {
      console.error('Помилка оновлення ночей та людей для товару в кошику:', error);
      throw error;
  }
};

export const getHotelById = async (id) => {
  try {
      const response = await api.get(`/hotels/${id}`);
      return response.data;
  } catch (error) {
      console.error('Помилка завантаження готелю:', error);
      throw error;
  }
};

export default api;
