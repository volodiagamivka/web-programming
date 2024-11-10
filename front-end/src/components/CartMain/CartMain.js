import React, { useEffect, useState } from 'react';
import { getCart } from '../../api/cartAPI';
import CartItem from './CartItem';

const Cart = () => {
    const [cart, setCart] = useState([]);

    const loadCart = async () => {
        const cartData = await getCart();
        setCart(cartData);
    };

    useEffect(() => {
        loadCart(); // Завантаження кошика при завантаженні сторінки
    }, []);

    return (
        <div>
            {cart.map(item => (
                <CartItem key={item.id} item={item} onCartUpdate={loadCart} />
            ))}
            <CartSummary cart={cart} />
        </div>
    );
};

export default Cart;
