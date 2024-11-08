import React from 'react';
import './HotelCard.css';
const HotelCard = ({ name,description,image }) => {
    const imagePath = require(`../../../assets/images/${image}`);
    return (
        <div className="hotel-card">
            <img src={imagePath} alt={name} className="hotel-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            
        </div>
    );
};

export default HotelCard;
