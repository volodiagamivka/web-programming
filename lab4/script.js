import { hotels, displayHotels, sortHotels, searchHotels, calculateTotalVisitors, sortminHotels, addHotel,editHotel } from './createmodules.js';

document.addEventListener('DOMContentLoaded', () => {
    displayHotels();

    document.querySelector('button[onclick="sortHotels()"]').addEventListener('click', () => {
        sortHotels();
    });

    document.querySelector('button[onclick="sortminHotels()"]').addEventListener('click', () => {
        sortminHotels();
    });

    document.querySelector('button[onclick="calculateTotalVisitors()"]').addEventListener('click', () => {
        calculateTotalVisitors();
    });

    document.getElementById('searchInput').addEventListener('input', () => {
        searchHotels();
    });

    document.getElementById('addHotelForm').addEventListener('submit', (event) => {
        event.preventDefault(); 
        addHotel(); 
    });
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => editHotel(button.dataset.hotelName));
    });
});