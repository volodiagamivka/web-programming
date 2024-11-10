const express = require('express');
const router = express.Router();
const path = require('path');
const hotels = require(path.resolve(__dirname, '../data/Hotels.json'));


router.get('/hotels-test', (req, res) => {
  res.json(hotels); // Повертає всі дані з JSON файлу
});

router.get('/hotels', (req, res) => {
  const { price, visitors, rooms } = req.query;

  

  let filteredHotels = hotels;

 
  if (price) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price <= parseInt(price));
    
  }

  if (visitors) {
    filteredHotels = filteredHotels.filter(hotel => hotel.visitors <= parseInt(visitors));
    
  }

  if (rooms) {
    filteredHotels = filteredHotels.filter(hotel => hotel.rooms <= parseInt(rooms));
    
  }
  
  res.json(filteredHotels);
});


router.get('/hotels/:id', (req, res) => {
  const hotelId = parseInt(req.params.id, 10);
  const hotel = hotels.find(h => h.id === hotelId);
  
  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({ message: 'Готель не знайдено' });
  }
});

module.exports = router;