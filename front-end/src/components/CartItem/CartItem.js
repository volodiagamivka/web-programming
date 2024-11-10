import React, { useState } from 'react';
import { updateCart, removeFromCart } from '../../api/cartAPI'; // Імпортуйте функції API
import './CartItem.css';

const CartItem = ({ item, onCartUpdate }) => {
    const [nights, setNights] = useState(item.nights || 1);
    const [people, setPeople] = useState(item.people || 1);

    // Оновлення кількості ночей та осіб і відправлення на бекенд
    const handleNightsChange = async (e) => {
        const updatedNights = Number(e.target.value);
        setNights(updatedNights);
        await updateCart(item.id, { nights: updatedNights, people });
        onCartUpdate(); // оновлення кошика в основному компоненті
    };

    const handlePeopleChange = async (e) => {
        const updatedPeople = Number(e.target.value);
        setPeople(updatedPeople);
        await updateCart(item.id, { nights, people: updatedPeople });
        onCartUpdate(); // оновлення кошика в основному компоненті
    };

    const handleRemove = async () => {
        await removeFromCart(item.id);
        onCartUpdate(); // оновлення кошика в основному компоненті
    };

    // Обчислення загальної ціни
    const totalPrice = item.totalPrice || (item.price * nights * people);

    return (
        <div className="cart-item">
            <div className="item-image">
                <img src={require(`../../assets/images/${item.image}`)} alt={item.name} />
            </div>
            <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">Ціна за добу: {item.price} ГРН</p>
                
                <label>
                    Кількість ночей:
                    <select value={nights} onChange={handleNightsChange}>
                        {[1, 2, 3, 4, 5].map(night => (
                            <option key={night} value={night}>{night}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Кількість осіб:
                    <select value={people} onChange={handlePeopleChange}>
                        {[1, 2, 3, 4, 5].map(person => (
                            <option key={person} value={person}>{person}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div className="item-total">
                Загальна Вартість: {totalPrice} ГРН
            </div>
            
            <button className="remove-button" onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default CartItem;
