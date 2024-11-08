import React from 'react';
import './HotelCard.css';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { useHotelContext } from '../../../context/HotelContext';

function HotelCard({ id }) {
  const navigate = useNavigate();
  const { hotels } = useHotelContext();

  // Знаходимо потрібний готель за його id
  const hotel = hotels.find(hotel => hotel.id === id);

  if (!hotel) {
    return <p>Готель не знайдено</p>;
  }

  const { name, visitors, rooms, image, price } = hotel;
  const handleNavigate = () => {
    navigate(`/hotel/${id}`);
  };
  const imagePath = require(`../../../assets/images/${image}`);

  return (
    <div className="hotel-card">
      <img src={imagePath} alt={name} className="hotel-image" />
      <h3>{name}</h3>
      <p><strong>Кількість відвідувачів:</strong> {visitors}</p>
      <p><strong>Кількість номерів:</strong> {rooms}</p>
      <p><strong>Ціна:</strong> {price} грн / за добу</p>

      <PrimaryButton label="Дізнатись більше" onClick={handleNavigate} />
    </div>
  );
}

export default HotelCard;
