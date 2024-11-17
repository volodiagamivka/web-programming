const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../db'); 
require('dotenv').config();

const router = express.Router();


router.post(
    '/register',
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
            console.error('Помилка реєстрації користувача:', error);
            res.status(500).json({ message: 'Помилка сервера' });
        }
    }
);

module.exports = router;
