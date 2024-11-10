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

export const addToCartToServer = async (item) => {
  try {
      const response = await axios.post(`${API_URL}/cart`, { item });
      return response.data;
  } catch (error) {
      console.error('Помилка додавання товару до кошика на сервері:', error);
      throw error;
  }
};
export const getCart = async () => {
  try {
      const response = await axios.get(`${API_URL}/cart`);
      return response.data;
  } catch (error) {
      console.error("Помилка отримання кошика:", error);
      return []; // Повертає порожній масив, якщо є помилка
  }
};

export const updateCart = async (id, updatedDetails) => {
  const response = await axios.put(`${API_URL}/cart/${id}`, updatedDetails);
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await axios.delete(`${API_URL}/cart/${id}`);
  return response.data;
};

export const getHotelDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/hotels/${id}`);
        return response.data;
    } catch (error) {
        console.error('Помилка завантаження деталей готелю:', error);
        throw error;
    }
};
export const updateCartItemDetails = async (itemId, nights, people) => {
  try {
      const response = await axios.put(`${API_URL}/cart/${itemId}`, { nights, people });
      return response.data;
  } catch (error) {
      console.error('Помилка оновлення ночей та людей для товару в кошику:', error);
      throw error;
  }
};

export const getHotelById = async (id) => {
  try {
      const response = await axios.get(`${API_URL}/hotels/${id}`);
      return response.data;
  } catch (error) {
      console.error('Помилка завантаження готелю:', error);
      throw error;
  }
};