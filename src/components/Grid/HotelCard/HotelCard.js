import React from 'react';
import './HotelCard.css';
const HotelCard = ({ name, visitors, rooms, image, price }) => {
    return (
        <div className="hotel-card">
            <img src={image}  />
            <h3>{name}</h3>
            <p>Відвідувачі: {visitors}</p>
            <p>Кількість кімнат: {rooms}</p>
            <p>Ціна за ніч: {price} грн</p>
        </div>
    );
};

export default HotelCard;
