const express = require('express');
const jwt = require('jsonwebtoken');
const { pool } = require('../db'); 
require('dotenv').config();
const path = require('path');
const hotels = require(path.resolve(__dirname, '../data/hotels.json')); 

const router = express.Router();


const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Необхідна авторизація' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Недійсний токен' });
  }
};

router.get('/cart', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    console.log('Виконання запиту до бази даних: SELECT * FROM carts WHERE user_id = ?', userId);
    const [cartItems] = await pool.query('SELECT * FROM carts WHERE user_id = ?', [userId]);

    
    const enrichedCartItems = cartItems.map((item) => {
      const hotel = hotels.find((h) => h.id === item.hotel_id);
      return {
        ...item,
        hotelName: hotel ? hotel.name : 'Невідомий готель',
        hotelImage: hotel ? hotel.image : null,
        hotelDescription: hotel ? hotel.description : 'Опис недоступний',
      };
    });

    console.log('Отримання корзини: успіх');
    res.json(enrichedCartItems);
  } catch (error) {
    console.error('Помилка отримання кошика:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});



router.post('/cart', authenticate, async (req, res) => {
  const userId = req.user.id; 
  const { hotelId, people, nights, price } = req.body;

  console.log('Додавання до кошика: старт');
  console.log('Вхідні дані:', { userId, hotelId, people, nights, price });

  if (!hotelId || !people || !nights || !price) {
    console.error('Помилка: відсутні необхідні поля');
    return res.status(400).json({ message: 'Всі поля повинні бути заповнені' });
  }

  try {
    const [existingItem] = await pool.query(
      'SELECT * FROM carts WHERE user_id = ? AND hotel_id = ?',
      [userId, hotelId]
    );

    console.log('Результат перевірки наявності елемента:', existingItem);

    if (existingItem.length > 0) {
      console.log('Елемент вже існує, оновлюємо його');
      await pool.query(
        'UPDATE carts SET people = ?, nights = ?, price = ? WHERE user_id = ? AND hotel_id = ?',
        [people, nights, price, userId, hotelId]
      );
    } else {
      console.log('Елемент не знайдено, додаємо новий запис');
      await pool.query(
        'INSERT INTO carts (user_id, hotel_id, people, nights, price) VALUES (?, ?, ?, ?, ?)',
        [userId, hotelId, people, nights, price]
      );
    }

    res.status(201).json({ message: 'Готель додано до корзини' });
    console.log('Додавання до кошика: успіх');
  } catch (error) {
    console.error('Помилка додавання до кошика:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});


router.delete('/cart/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
      const [result] = await pool.query('DELETE FROM carts WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Елемент не знайдено' });
      }
      res.status(200).json({ message: 'Елемент видалено успішно' });
  } catch (error) {
      console.error('Помилка видалення елемента з кошика:', error);
      res.status(500).json({ message: 'Помилка сервера' });
  }
});

router.put('/cart/:id', authenticate, async (req, res) => {
    const { id } = req.params; 
    const { nights, people } = req.body;

    console.log('Запит на оновлення:', { id, nights, people });

    if (!nights || !people) {
        console.error('Помилка: відсутні необхідні поля');
        return res.status(400).json({ message: 'Всі поля повинні бути заповнені' });
    }

    try {
        
        const [cartItem] = await pool.query('SELECT hotel_id FROM carts WHERE id = ?', [id]);

        if (cartItem.length === 0) {
            console.error('Помилка: елемент у кошику не знайдено');
            return res.status(404).json({ message: 'Елемент у кошику не знайдено' });
        }

        const hotelId = cartItem[0].hotel_id;

        
        const hotel = hotels.find((h) => h.id === hotelId);

        if (!hotel) {
            console.error('Помилка: готель не знайдено в JSON');
            return res.status(404).json({ message: 'Готель не знайдено' });
        }

        
        const totalPrice = hotel.price * nights * people;

        console.log('Оновлюється запис:', { id, nights, people, totalPrice });

        
        const [result] = await pool.query(
            'UPDATE carts SET nights = ?, people = ?, price = ? WHERE id = ?',
            [nights, people, totalPrice, id]
        );

        if (result.affectedRows === 0) {
            console.error('Помилка: елемент для оновлення не знайдено');
            return res.status(404).json({ message: 'Елемент для оновлення не знайдено' });
        }

        res.status(200).json({ message: 'Елемент оновлено успішно', totalPrice });
    } catch (error) {
        console.error('Помилка оновлення елемента кошика:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
});
router.delete('/cart', authenticate, async (req, res) => {
  const userId = req.user.id; 

  try {
      await pool.query('DELETE FROM carts WHERE user_id = ?', [userId]); 
      res.status(200).json({ message: 'Кошик очищено успішно' });
  } catch (error) {
      console.error('Помилка очищення кошика:', error);
      res.status(500).json({ message: 'Помилка сервера' });
  }
});




module.exports = router;
