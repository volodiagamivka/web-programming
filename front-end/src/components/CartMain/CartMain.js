import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem/CartItem';  // Передбачаємо, що CartItem у папці components/CartItem
import CartSummary from '../CartSummary/CartSummary'; // Передбачаємо, що CartSummary у папці components/CartSummary
import './CartMain.css';

const CartMain = () => {
    const cart = useSelector(state => state.cart); // Отримуємо дані кошика з Redux

    return (
        <div className="cart-page">
            <h2>Кошик</h2>
            {cart.length === 0 ? (
                <p>Ваш кошик пустий.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    <CartSummary cart={cart} />
                </div>
            )}
        </div>
    );
};

export default CartMain;
