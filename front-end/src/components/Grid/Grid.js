import React, { useState, useEffect } from 'react';
import './Grid.css'; 
import HotelCard from './HotelCard/HotelCard';
import { getProducts } from '../../api/axiosConfig';
import Loader from '../Loader/Loader';

function Grid() {
    const [hotels, setHotels] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true); 
            try {
                const response = await getProducts();
                

                setTimeout(() => {
                    setHotels(response.data);
                    setLoading(false);
                }, 2000); 
            } catch (error) {
                setError(error.message); 
                setLoading(false); 
            }
        };

        fetchHotels(); 
    }, []);

    const visibleHotels = showAll ? hotels : hotels.slice(0, 4);

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    if (loading) return <Loader />; 
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
