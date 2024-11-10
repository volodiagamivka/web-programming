import React, { useState } from "react";
import './Info.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useHotelContext } from '../../context/HotelContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { hotels } = useHotelContext();
    const dispatch = useDispatch();

    const hotel = hotels.find((hotel) => hotel.id === parseInt(id));

    // Локальний стан для кількості ночей і кількості осіб
    const [nights, setNights] = useState(1);
    const [people, setPeople] = useState(1);

    if (!hotel) {
        return <div>Готель не знайдено.</div>;
    }

    const goBackToCatalog = () => {
        navigate('/catalog');
    };

    const handleAddToCart = () => {
        const hotelWithDetails = { ...hotel, nights, people, totalPrice: hotel.price * nights * people };
        dispatch(addToCart(hotelWithDetails));
        alert('Товар додано до кошика');
    };

    
    const totalPrice = hotel.price * nights * people;

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

                <label>
                    <span>Кількість ночей:</span>
                    <select className="ItemsFilter" value={nights} onChange={(e) => setNights(Number(e.target.value))}>
                        <option value="">Виберіть кількість ночей</option>
                        {[1, 2, 3, 4, 5].map(night => (
                            <option key={night} value={night}>{night}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>Кількість осіб:</span>
                    <select className="ItemsFilter" value={people} onChange={(e) => setPeople(Number(e.target.value))}>
                        <option value="">Виберіть кількість осіб</option>
                        {[1, 2, 3, 4, 5].map(person => (
                            <option key={person} value={person}>{person}</option>
                        ))}
                    </select>
                </label>
            </div>
            
            <p className="price">Total Price: {totalPrice} грн</p>
            <div className="buttons">
                <button className="go-back-button" onClick={goBackToCatalog}>Повернутись</button>
                <button 
                    className="add-to-cart-button" 
                    onClick={handleAddToCart} 
                    disabled={!nights || !people} 
                >
                    Додати до кошика
                </button>
            </div>
        </div>
    );
};

export default ItemPage;
