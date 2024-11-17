const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { pool } = require('../db'); 
require('dotenv').config();

const router = express.Router();


router.post('/register', 
    [
        body('email').isEmail().withMessage('Некоректний email'),
        body('password').isLength({ min: 6 }).withMessage('Пароль має містити мінімум 6 символів')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            
            const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            if (existingUser.length > 0) {
                return res.status(400).json({ message: 'Користувач з таким email вже існує' });
            }

            
            const hashedPassword = await bcrypt.hash(password, 10);

            
            await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

            res.status(201).json({ message: 'Користувача зареєстровано успішно' });
        } catch (error) {
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
);

router.post(
    '/login',
    [
      body('email').isEmail().withMessage('Некоректний email'),
      body('password').notEmpty().withMessage('Пароль є обов’язковим'),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
          return res.status(400).json({ message: 'Некоректний email або пароль' });
        }
  
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Некоректний email або пароль' });
        }
  
        // Генеруємо JWT токен
        const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, {
          expiresIn: '1h', // Токен діє протягом 1 години
        });
  
        res.json({ message: 'Вхід успішний', token });
      } catch (error) {
        console.error('Помилка входу користувача:', error);
        res.status(500).json({ message: 'Помилка сервера' });
      }
    }
  );
  


module.exports = router;
