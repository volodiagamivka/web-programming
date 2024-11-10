import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const getProducts = (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  return axios.get(`${API_URL}/hotels?${params}`);
};
export const getFilteredHotels = async (filters) => {
  try {
    
    const queryString = new URLSearchParams(filters).toString();
    
    
    const response = await axios.get(`http://localhost:3000/api/hotels?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Помилка завантаження готелів:", error);
    return [];
  }
};

export const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart`);
  return response.data;
};

// Додати товар до кошика
export const addToCart = async (item) => {
  const response = await axios.post(`${API_URL}/cart`, { item });
  return response.data;
};

// Оновити кількість товару
export const updateCart = async (id, quantity) => {
  const response = await axios.put(`${API_URL}/cart/${id}`, { quantity });
  return response.data;
};

// Видалити товар з кошика
export const removeFromCart = async (id) => {
  const response = await axios.delete(`${API_URL}/cart/${id}`);
  return response.data;
};
