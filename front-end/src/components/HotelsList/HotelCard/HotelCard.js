import React from 'react';
import './HotelCard.css';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../PrimaryButton/PrimaryButton';

const HotelCard = ({ id, name, visitors, rooms, image, price }) => {
  const navigate = useNavigate();

  const imagePath = require(`../../../assets/images/${image}`);

  const handleNavigate = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/hotel/${id}`); // Перенаправлення до деталей готелю
    } else {
      navigate('/login', { state: { redirectTo: `/hotel/${id}` } });
    }
  };

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
};

export default HotelCard;
