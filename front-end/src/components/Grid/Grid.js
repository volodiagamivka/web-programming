// src/components/Grid/Grid.js
import React, { useState, useEffect } from 'react';
import './Grid.css'; 
import HotelCard from './HotelCard/HotelCard';

function Grid() {
    const [hotels, setHotels] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/hotels');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const visibleHotels = showAll ? hotels : hotels.slice(0, 4);

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
