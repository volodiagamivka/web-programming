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

export const updateCart = async (id, updatedDetails) => {
  const response = await axios.put(`${API_URL}/cart/${id}`, updatedDetails);
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axios.delete(`${API_URL}/cart/${id}`);
  return response.data;
};