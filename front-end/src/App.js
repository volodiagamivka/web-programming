// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import { HotelProvider } from './context/HotelContext';

function App() {
  return (
    <HotelProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/hotel/:id" element={<ItemPage />} />
        </Routes>
      </Router>
    </HotelProvider>
  );
}

export default App;
