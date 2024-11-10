import React, { createContext, useContext, useState } from 'react';
import hotelsData from '../data/Hotels.json'; 

const HotelContext = createContext();

export const useHotelContext = () => {
  return useContext(HotelContext);
};

export const HotelProvider = ({ children }) => {
  const [hotels] = useState(hotelsData); 

  return (
    <HotelContext.Provider value={{ hotels }}>
      {children}
    </HotelContext.Provider>
  );
};
