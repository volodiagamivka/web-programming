// CartSummary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartSummary.css';

const CartSummary = ({ cart }) => {
    const navigate = useNavigate();
    const totalAmount = cart.reduce((total, item) => total + (item.totalPrice || (item.price * item.nights * item.people)), 0);

    return (
        <div className="cart-summary">
            <p>Сума: {totalAmount} ГРН</p>
            <button className="back-button" onClick={() => navigate('/catalog')}>Повернутись до каталогу</button>
            <button className="continue-button">Замовити</button>
        </div>
    );
};


export default CartSummary;
