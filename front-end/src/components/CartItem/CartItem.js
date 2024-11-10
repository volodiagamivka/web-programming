import React, { useState } from 'react';
import { updateCart, removeFromCart } from '../../api/axiosConfig'; 
import './CartItem.css';

const CartItem = ({ item, onCartUpdate }) => {
    const [nights, setNights] = useState(item.nights || 1);
    const [people, setPeople] = useState(item.people || 1);

    const handleNightsChange = async (e) => {
        const updatedNights = Number(e.target.value);
        setNights(updatedNights);
        await updateCart(item.id, { nights: updatedNights, people });
        onCartUpdate(); 
    };

    const handlePeopleChange = async (e) => {
        const updatedPeople = Number(e.target.value);
        setPeople(updatedPeople);
        await updateCart(item.id, { nights, people: updatedPeople });
        onCartUpdate(); 
    };

    const handleRemove = async () => {
        await removeFromCart(item.id);
        onCartUpdate(); 
    };

    
    const maxNights = item.maxNights || 5; 
    const maxPeople = item.maxPeople || 5; 

    const totalPrice = item.price * nights * people;

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
                        {Array.from({ length: maxNights }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Кількість осіб:
                    <select value={people} onChange={handlePeopleChange}>
                        {Array.from({ length: maxPeople }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
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
