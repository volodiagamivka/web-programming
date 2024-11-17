import React, { useEffect, useState } from "react";
import './CartMain.css';
import api from '../../api/axiosConfig';
import CartItem from '../CartItem/CartItem';
import CartSummary from '../CartSummary/CartSummary';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadCart = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/cart');
            setCart(response.data);
            setError(null);
        } catch (err) {
            setError('Не вдалося завантажити кошик. Спробуйте пізніше.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`);
            loadCart();
        } catch (err) {
            alert('Не вдалося видалити елемент. Спробуйте знову.');
        }
    };

    const handleUpdate = async (itemId, nights, people) => {
        try {
            await api.put(`/cart/${itemId}`, { nights, people });
            loadCart();
        } catch (err) {
            alert('Не вдалося оновити елемент. Спробуйте знову.');
        }
    };

    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

    const handleOrder = async () => {
        try {
            await api.delete('/cart');
            navigate('/checkout');
            setCart([]);
        } catch (err) {
            alert('Не вдалося очистити кошик. Спробуйте знову.');
        }
    };

    return (
        <div className="cart-page">
            <h1>Ваш кошик</h1>
            {isLoading ? (
                <p>Завантаження кошика...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    onCartUpdate={handleUpdate} 
                                    onRemove={handleRemove} 
                                />
                            ))
                        ) : (
                            <p className="cart-empty-message">Кошик порожній</p>
                        )}
                    </div>
                    {cart.length > 0 && (
                        <>
                            <CartSummary cart={cart} />
                            <div className="cart-actions">
                                <button onClick={() => navigate('/catalog')} className="go-back-button">
                                    Повернутись до каталогу
                                </button>
                                <button onClick={handleOrder} className="checkout-button">
                                    Оформити замовлення
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
