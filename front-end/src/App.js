// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import { HotelProvider } from './context/HotelContext';
import PrivateRoute from './components/PrivateRoutes';
function App() {
  return (
    <HotelProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/hotel/:id" element={<ItemPage />} />
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/success' element={<SuccessPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <CartPage/>
                        </PrivateRoute>
                    }
                />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </HotelProvider>
  );
}

export default App;
