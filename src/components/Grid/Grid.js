import React from 'react';
import './Grid.css'; 
import rixos from '../../assets/images/rixos.jpg';
import Hilton from '../../assets/images/hilton.JPEG';
import Bukovel from '../../assets/images/bukovel.jpg';
import HotelCard from './HotelCard/HotelCard';
const hotels = [
    {
        id: 1,
        image: rixos,
        
        name: "Готель Rixos",
        visitors:3000,
        rooms:350,
        price:3000,
        description: "Розкішний курорт, відомий своїм винятковим сервісом, сучасними зручностями та неперевершеною гостинністю. Він пропонує ідеальні умови для відпочинку на узбережжі з чудовими ресторанами, спа та розвагами для всієї родини."
    },
    {
        id: 2,
        image: Hilton,
        rooms:200,
        price:29000,
        visitors:230,
        name: "Готель Hilton",
        description: "Всесвітньо відома мережа, яка пропонує високий рівень комфорту та зручностей для мандрівників. Він відомий своїм бездоганним сервісом, сучасними номерами та вигідним розташуванням у ключових місцях по всьому світу."
    },
    {
        id: 3,
        image: Bukovel,
        rooms:120,
        price:8000,
        visitors:400,
        name: "Готель Буковель",
        description: "Найбільший гірськолижний комплекс України, відомий своїми сучасними трасами та інфраструктурою для активного зимового відпочинку. Тут можна насолодитися катанням на лижах і сноуборді, а також оздоровитися в численних спа-комплексах і насолодитися мальовничими карпатськими пейзажами."
    }
];

function Grid() {
    return (
        <div className="grid">
            {hotels.map((hotel, index) => (
                <HotelCard
                    key={index}
                    name={hotel.name}
                    visitors={hotel.visitors}
                    rooms={hotel.rooms}
                    image={hotel.image}
                    price={hotel.price}
                />
            ))}
            <button className="view-more">Переглянути всі</button>
        </div>
        
    );
}

export default Grid;
