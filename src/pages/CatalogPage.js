import React, { useState } from 'react';
import Header from '../components/Header/Header';
import HotelsList from '../components/HotelsList/HotelsList';
import Footer from '../components/Footer/Footer';

function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };
  return (
    <div>
      
      <Header showSearch={true} onSearchChange={handleSearchChange} />
      <HotelsList searchTerm={searchTerm} />
      
      <Footer/>
      
    </div>
  );
}

export default CatalogPage;
