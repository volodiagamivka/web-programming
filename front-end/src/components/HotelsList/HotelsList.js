import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard/HotelCard';
import Filters from '../Filters/Filters';

function HotelsList() {
    const [hotels, setHotels] = useState([]);          // Початкові дані (всі готелі)
    const [filteredHotels, setFilteredHotels] = useState([]); // Відфільтровані дані
    const [filters, setFilters] = useState({ price: '', visitors: '', rooms: '' });
    const [loading, setLoading] = useState(true);

    // Завантаження всіх готелів при першому рендері
    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/api/hotels');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHotels(data);           // Зберігаємо всі готелі
                setFilteredHotels(data);    // Встановлюємо їх як початкові відфільтровані дані
            } catch (error) {
                console.error('Error fetching hotels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // Застосування фільтрів при зміні значень у `filters`
    useEffect(() => {
        if (!filters.price && !filters.visitors && !filters.rooms) {
            // Якщо фільтри порожні, повертаємо всі готелі
            setFilteredHotels(hotels);
        } else {
            // Застосовуємо фільтри до готелів
            const filtered = hotels.filter((hotel) => {
                const priceMatch = filters.price ? hotel.price <= Number(filters.price) : true;
                const visitorsMatch = filters.visitors ? hotel.visitors <= Number(filters.visitors) : true;
                const roomsMatch = filters.rooms ? hotel.rooms <= Number(filters.rooms) : true;
                return priceMatch && visitorsMatch && roomsMatch;
            });
            setFilteredHotels(filtered);
        }
    }, [filters, hotels]);

    // Функція обробки змін у фільтрах
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="hotels-list">
                    {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                name={hotel.name}
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
