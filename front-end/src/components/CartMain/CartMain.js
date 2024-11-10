import React, { useEffect, useState } from 'react';
import { getCart } from '../../api/axiosConfig';
import CartItem from '../CartItem/CartItem';
import CartSummary from '../CartSummary/CartSummary';
import './CartMain.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    const loadCart = async () => {
        const cartData = await getCart();
        setCart(cartData);
    };

    useEffect(() => {
        loadCart(); 
    }, []);

    return (
        <div className="cart-page">
            <h1>Ваш кошик</h1>
            <div className="cart-items-list">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <CartItem key={item.id} item={item} onCartUpdate={loadCart} />
                    ))
                ) : (
                    <p className="cart-empty-message">Кошик порожній</p>
                )}
            </div>
            <CartSummary cart={cart} />
            {cart.length > 0 && (
                <button className="checkout-button">Завершити покупку</button>
            )}
        </div>
    );
};

export default Cart;
