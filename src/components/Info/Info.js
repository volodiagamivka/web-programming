import React from "react";
import './Info.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotelContext } from '../../context/HotelContext';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const { hotels } = useHotelContext(); 

    
    const hotel = hotels.find((hotel) => hotel.id === parseInt(id));

    if (!hotel) {
        return <div>Готель не знайдено.</div>;
    }

    
    const goBackToCatalog = () => {
        navigate('/catalog');
    };

    return (
        <div className="hotel-details">
            <img 
                src={require(`../../assets/images/${hotel.image}`)} 
                alt={hotel.name} 
                className="hotel-details-image"
            />
            <div className="hotel-info">
                <div className="characteristics">
                    <span className="characteristic">1 characteristic</span>
                    <span className="characteristic">2 characteristic</span>
                </div>
                <h2>{hotel.name}</h2>
                <p><strong>Опис:</strong> {hotel.description}</p>
                <p><strong>Кількість відвідувачів:</strong> {hotel.visitors}</p>
                <p><strong>Кількість номерів:</strong> {hotel.rooms}</p>

                <select className="ItemsFilter">
                <option value="">Кількість ночей</option>
                <option value="1">1</option>
                <option value="2">2</option>
                </select>
                <select className="ItemsFilter">
                    <option value="">Кількість осіб</option>
                    <option value="1">1</option>
                    <option value=''>2 і більше</option>
                </select>
            </div>
            
            <p className="price">Price: {hotel.price} грн / за добу</p>
            <div className="buttons">
                <button className="go-back-button" onClick={goBackToCatalog}>Повернутись</button>
                <button className="add-to-cart-button">Додати до кошика</button>
            </div>
        </div>
    );
};

export default ItemPage;
