import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard/HotelCard';
import Filters from '../Filters/Filters';
import Loader from '../Loader/Loader';
import { getProducts } from '../../api/axiosConfig';
import './HotelsList.css';

function HotelsList({ searchTerm }) {
    const [hotels, setHotels] = useState([]); 
    const [filters, setFilters] = useState({ price: '', visitors: '', rooms: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const fetchHotels = async (filters) => {
        setLoading(true);
        try {
            const response = await getProducts(filters); 
            setHotels(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message); 
            setLoading(false);
        }
    };

   
    useEffect(() => {
        fetchHotels(filters);
    }, [filters]);

    
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    
    const filteredHotels = hotels.filter((hotel) =>
        searchTerm
            ? hotel.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
            : true
    );

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />
            {loading ? (
                <Loader /> 
            ) : error ? (
                <div>Error: {error}</div> 
            ) : (
                <div className="hotels-list">
                    {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                            <HotelCard
                                id={hotel.id}
                                key={hotel.id}
                                name={hotel.name}
                                price={hotel.price}
                                rooms={hotel.rooms}
                                visitors={hotel.visitors}
                                image={hotel.image}
                                description={hotel.description}
                            />
                        ))
                    ) : (
                        <div>Готель не знайдено</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default HotelsList;
