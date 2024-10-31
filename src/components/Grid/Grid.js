import React, { useState, useEffect } from 'react';
import './Grid.css'; 
import hotelsData from '../../data/Hotels.json';
import HotelCard from './HotelCard/HotelCard';

function Grid() {
    const [hotels, setHotels] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        setHotels(hotelsData);
    }, []);

    const visibleHotels = showAll ? hotels : hotels.slice(0, 4);

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="grid">
            {visibleHotels.map((hotel) => (
                <HotelCard
                    key={hotel.id}
                    name={hotel.name}
                    image={hotel.image}
                    description={hotel.description}
                />
            ))}
            <button className="view-more" onClick={handleToggle}>
                {showAll ? 'Приховати' : 'Переглянути всі'}
            </button>
        </div>
    );
}

export default Grid;
