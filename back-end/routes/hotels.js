// routes/hotels.js
const express = require('express');
const router = express.Router();
const hotels = require('../data/hotels.json');

// Маршрут для отримання всіх готелів із фільтрацією
router.get('/', (req, res) => {
  const { searchTerm, price, visitors, rooms } = req.query;

  let filteredHotels = hotels;

  // Фільтрація за пошуковим терміном
  if (searchTerm) {
    filteredHotels = filteredHotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Фільтрація за ціною
  if (price) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.price <= Number(price));
  }

  // Фільтрація за кількістю відвідувачів
  if (visitors) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.visitors <= Number(visitors));
  }

  // Фільтрація за кількістю кімнат
  if (rooms) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.rooms <= Number(rooms));
  }

  res.json(filteredHotels);
});

module.exports = router;
