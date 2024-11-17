import React from 'react';
import './CartSummary.css';

const CartSummary = ({ cart }) => {
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    return (
        <div className="cart-summary">
            <h3>Загальна вартість: {totalPrice.toFixed(2)} грн</h3>
        </div>
    );
};

export default CartSummary;
