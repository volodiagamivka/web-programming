function saveHotelsToLocalStorage(hotels) {
    localStorage.setItem('hotels', JSON.stringify(hotels));
}

function loadHotelsFromLocalStorage() {
    const storedHotels = localStorage.getItem('hotels');
    return storedHotels ? JSON.parse(storedHotels) : null;
}

export let hotels = loadHotelsFromLocalStorage() || [
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
            <button class="edit-btn" data-hotel-name="${hotel.name}">Редагувати</button>
        `;
        hotelsList.appendChild(hotelDiv);
    });

    saveHotelsToLocalStorage(hotels); 
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

export function addHotel() {
    const name = document.getElementById('hotel-name').value.trim();
    const visitors = parseInt(document.getElementById('visitors').value);
    const rooms = parseInt(document.getElementById('rooms').value);
    
    if (!name || isNaN(visitors) || isNaN(rooms)) {
        alert('Будь ласка, заповніть всі поля!');
        return;
    }

    const existingHotel = hotels.find(hotel => hotel.name.toLowerCase() === `Готель ${name}`.toLowerCase());

    if (existingHotel) {
        alert('Готель з такою назвою вже існує!');
        return; 
    }

    const newHotel = {
        name: `Готель ${name}`,
        visitors: visitors,
        rooms: rooms,
        image: 'images/background.jpg'
    };

    hotels.push(newHotel);
    displayHotels(); 

    document.getElementById('hotel-name').value = '';
    document.getElementById('visitors').value = '';
    document.getElementById('rooms').value = '';

    saveHotelsToLocalStorage(hotels);
}

export function editHotel(existingName) {
    const hotelToEdit = hotels.find(hotel => hotel.name === existingName);
    if (hotelToEdit) {
        const newName = prompt('Введіть нову назву:', existingName.replace('Готель ', ''));
        const newVisitors = parseInt(prompt('Введіть нову кількість відвідувачів:', hotelToEdit.visitors));
        const newRooms = parseInt(prompt('Введіть нову кількість номерів:', hotelToEdit.rooms));

        const existingHotel = hotels.find(hotel => hotel.name.toLowerCase() === `Готель ${newName}`.toLowerCase());

        if (newName && !isNaN(newVisitors) && !isNaN(newRooms)) {
            if (existingHotel) {
                alert('Готель з такою назвою вже існує!'); 
            } else {
                hotelToEdit.name = `Готель ${newName}`;
                hotelToEdit.visitors = newVisitors;
                hotelToEdit.rooms = newRooms;
                alert(`Готель ${existingName} оновлено на: ${hotelToEdit.name}`);
                displayHotels(currentHotels);
                saveHotelsToLocalStorage(hotels); 
            }
        } else {
            alert('Будь ласка, введіть дійсні дані!');
        }
    }
}