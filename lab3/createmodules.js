export let hotels = [
    { name: 'Готель Rixos', visitors: 1200, rooms: 329, image: 'images/rixos.jpg' },
    { name: 'Готель Hilton', visitors: 8000, rooms: 300, image: 'images/hilton.JPEG' },
    { name: 'Готель Grand Hotel', visitors: 1600, rooms: 220, image: 'images/grand_hotel.jpg' },
    { name: 'Готель Три сини та донька', visitors: 500, rooms: 20, image: 'images/try_syny.jpeg' },
    { name: 'Готель Буковель', visitors: 1400, rooms: 60, image: 'images/bukovel.jpg' },
    { name: 'Готель Sultan Gardens', visitors: 1100, rooms: 63, image: 'images/fairmont.jpg' },
    { name: 'Готель F and B', visitors: 900, rooms: 30, image: 'images/fandb.jpg' },
    { name: 'Готель Raddison Blue', visitors: 1900, rooms: 89, image: 'images/raddison.jpg' },
];

let currentHotels = hotels;

export function displayHotels(filteredHotels = hotels) {
    currentHotels = filteredHotels;
    const hotelsList = document.getElementById('hotelsList');
    hotelsList.innerHTML = '';

    filteredHotels.forEach(hotel => {
        const hotelDiv = document.createElement('div');
        hotelDiv.className = 'hotel-item';
        hotelDiv.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <strong>${hotel.name}</strong><br>
            Відвідувачів в рік: ${hotel.visitors}<br>
            Кількість номерів: ${hotel.rooms}
        `;
        hotelsList.appendChild(hotelDiv);
    });
}

export function searchHotels() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();
    let filteredHotels = hotels.filter(hotel => hotel.name.toLowerCase().includes(searchValue));
    
    if (searchValue === '') {
        document.getElementById('totalVisitors').innerText = ''; 
    }
    
    displayHotels(filteredHotels);
}

export function sortHotels() {
    currentHotels.sort((a, b) => b.visitors - a.visitors);
    displayHotels(currentHotels);
}

export function sortminHotels() {
    currentHotels.sort((a, b) => a.visitors - b.visitors);
    displayHotels(currentHotels);
}

export function calculateTotalVisitors() {
    const totalVisitors = currentHotels.reduce((sum, hotel) => sum + hotel.visitors, 0);
    document.getElementById('totalVisitors').innerText = `Загальна кількість відвідувачів: ${totalVisitors} людей`;
}
