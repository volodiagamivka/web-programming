import React, { useState, useEffect } from "react";
import './Info.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions';
import { addToCartToServer, getHotelById } from '../../api/axiosConfig';

const ItemPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hotel, setHotel] = useState(null); 
    const [nights, setNights] = useState(1);
    const [people, setPeople] = useState(1);

    
    useEffect(() => {
        const loadHotelData = async () => {
            try {
                const data = await getHotelById(id);
                setHotel(data); 
            } catch (error) {
                console.error("Помилка завантаження готелю:", error);
            }
        };
        loadHotelData();
    }, [id]);

   
    if (!hotel) {
        return <div>Завантаження...</div>;
    }

    const goBackToCatalog = () => {
        navigate('/catalog');
    };

    const handleAddToCart = async () => {
        const hotelWithDetails = { ...hotel,hotelId: hotel.id, nights, people, totalPrice: hotel.price * nights * people };
        
        try {
            await addToCartToServer(hotelWithDetails);
            dispatch(addToCart(hotelWithDetails));
            alert('Товар додано до кошика');
        } catch (error) {
            alert('Помилка додавання товару до кошика');
        }
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
                <h2>{hotel.name}</h2>
                <p><strong>Опис:</strong> {hotel.description}</p>
                <p><strong>Кількість відвідувачів:</strong> {hotel.visitors}</p>
                <p><strong>Кількість номерів:</strong> {hotel.rooms}</p>

                <label>
                    <span>Кількість ночей:</span>
                    <select 
                        className="ItemsFilter" 
                        value={nights} 
                        onChange={(e) => setNights(Number(e.target.value))}
                    >
                        {Array.from({ length: hotel.maxNights }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <span>Кількість осіб:</span>
                    <select 
                        className="ItemsFilter" 
                        value={people} 
                        onChange={(e) => setPeople(Number(e.target.value))}
                    >
                        {Array.from({ length: hotel.maxPeople }, (_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </label>
            </div>
            
            <p className="price">Загальна Вартість: {totalPrice} грн</p>
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
