// CartItem.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart, updateItemDetails } from '../../redux/actions';
import './CartItem.css';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    // Локальні стани для вибору кількості ночей та осіб
    const [nights, setNights] = useState(item.nights || 1);
    const [people, setPeople] = useState(item.people || 1);
    

    // Функції для оновлення кількості ночей та осіб і їх відправлення в Redux
    const handleNightsChange = (e) => {
        const updatedNights = Number(e.target.value);
        setNights(updatedNights);
        dispatch(updateItemDetails(item.id, updatedNights, people));
    };

    const handlePeopleChange = (e) => {
        const updatedPeople = Number(e.target.value);
        setPeople(updatedPeople);
        dispatch(updateItemDetails(item.id, nights, updatedPeople));
    };

    const handleIncrease = () => {
        dispatch(increaseQuantity(item.id));
    };

    const handleDecrease = () => {
        dispatch(decreaseQuantity(item.id));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    // Обчислюємо загальну ціну з перевіркою числових значень
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
