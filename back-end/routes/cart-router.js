const express = require('express');
const router = express.Router();

// Ініціалізація кошика як пустого масиву для зберігання
let cart = [];

// Отримати вміст кошика
router.get('/cart', (req, res) => {
    res.json(cart);
});

// Додати товар до кошика
router.post('/cart', (req, res) => {
    const { item } = req.body;
    const existingItem = cart.find(i => i.id === item.id && i.size === item.size);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push({ ...item });
    }
    res.json(cart);
});

// Оновити кількість ночей та людей для товару в кошику
router.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { nights, people } = req.body; // Отримуємо нові значення ночей і людей
    const item = cart.find(i => i.id === parseInt(id, 10));

    if (item) {
        // Оновлюємо кількість ночей і людей
        item.nights = nights;
        item.people = people;
        item.totalPrice = item.price * nights * people; // Перерахунок загальної ціни
        res.json({ message: 'Кількість ночей та людей оновлена', cart });
    } else {
        res.status(404).json({ message: 'Товар не знайдено в кошику' });
    }
});

// Видалити товар з кошика
router.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter(i => i.id !== parseInt(id, 10));
    res.json(cart);
});

module.exports = router;
