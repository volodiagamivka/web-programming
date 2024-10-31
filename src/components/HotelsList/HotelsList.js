import React, { useState } from 'react';
import hotelsData from '../../data/Hotels.json';
import HotelCard from './HotelCard/HotelCard';
import Filters from '../Filters/Filters';
import './HotelsList.css';

function HotelsList({ searchTerm }) {
    const [filters, setFilters] = useState({ price: '', visitors: '', rooms: '' });

    const handleFilterChange = (selectedFilters) => {
        setFilters(selectedFilters);
    };

    const filteredHotels = hotelsData.filter((hotel) => {
      const priceMatch = filters.price ? hotel.price <= Number(filters.price) : true;
      const visitorsMatch = filters.visitors ? hotel.visitors <= Number(filters.visitors) : true;
      const roomsMatch = filters.rooms ? hotel.rooms <= Number(filters.rooms) : true;
      const searchMatch = searchTerm 
          ? hotel.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) 
          : true;
  
      return priceMatch && visitorsMatch && roomsMatch && searchMatch;
  });
  

    return (
        <div>
            <Filters onFilterChange={handleFilterChange} />

            <div className="hotels-list">
                {filteredHotels.map((hotel) => (
                    <HotelCard
                        key={hotel.id}
                        id={hotel.id}
                        name={hotel.name}
                        visitors={hotel.visitors}
                        rooms={hotel.rooms}
                        image={hotel.image}
                        price={hotel.price}
                        description={hotel.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default HotelsList;
