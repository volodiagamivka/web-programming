import React, { useState } from 'react';
import './CartItem.css';

const CartItem = ({ item, onCartUpdate, onRemove }) => {
    const { id, hotelName, hotelImage, hotelDescription, nights, people, price } = item;

    const [editedNights, setEditedNights] = useState(nights);
    const [editedPeople, setEditedPeople] = useState(people);

    const handleUpdate = () => {
        if (editedNights > 0 && editedPeople > 0) {
            onCartUpdate(id, editedNights, editedPeople); 
        } else {
            alert('Кількість ночей та людей має бути більше 0.');
        }
    };

    return (
        <div className="cart-item">
            <img 
    src={`http://localhost:3000/static/media/${hotelImage}`} 
    alt={hotelName} 
    className="item-image" 
/>

             <div className="item-details">

             
            <h3>{hotelName}</h3>
            
            <label>
                Кількість ночей:
                <input
                    type="number"
                    value={editedNights}
                    onChange={(e) => setEditedNights(Number(e.target.value))}
                    min="1"
                />
            </label>
            <label>
                Кількість людей:
                <input
                    type="number"
                    value={editedPeople}
                    onChange={(e) => setEditedPeople(Number(e.target.value))}
                    min="1"
                />
            </label>
            </div>
            <p>Ціна: {price} грн</p>
            <button onClick={handleUpdate} className="update-item-button">
                Оновити
            </button>
            <button onClick={() => onRemove(id)} className="remove-item-button">
                Видалити
            </button>
        </div>
    );
};

export default CartItem;
