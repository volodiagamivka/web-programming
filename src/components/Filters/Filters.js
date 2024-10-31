import React, { useState } from 'react';
import './Filters.css';

function Filters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState('');
  const [visitorsRange, setVisitorsRange] = useState('');
  const [roomsRange, setRoomsRange] = useState('');

  const handleFilterChange = () => {
    onFilterChange({
      price: priceRange,
      visitors: visitorsRange,
      rooms: roomsRange,
    });
  };
  const handleResetFilters = () => {
    setPriceRange('');
    setVisitorsRange('');
    setRoomsRange('');
    onFilterChange({ price: '', visitors: '', rooms: '' });
  };

  return (
    <div className="filters">
      <select
        className="filter-select"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="">Ціна</option>
        <option value="2000">До 2000</option>
        <option value="5000">До 5000</option>
        <option value="30000">До 30000</option>
      </select>

      <select
        className="filter-select"
        value={visitorsRange}
        onChange={(e) => setVisitorsRange(e.target.value)}
      >
        <option value="">Кількість відвідувачів</option>
        <option value="100">До 100</option>
        <option value="1000">До 1000</option>
        <option value="10000">До 10000</option>
      </select>

      <select
        className="filter-select"
        value={roomsRange}
        onChange={(e) => setRoomsRange(e.target.value)}
      >
        <option value="">Кількість номерів</option>
        <option value="50">До 50</option>
        <option value="200">До 200</option>
        <option value="500">До 500</option>
      </select>

      <button className="apply-button" onClick={handleFilterChange}>
        Підтвердити
      </button>
      <button className="reset-button" onClick={handleResetFilters}>
        Скинути
      </button>
    </div>
  );
}

export default Filters;
