import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Header({ showSearch, onSearchChange }) {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token'); 

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/')
    };
    return (
        <header>
            <img src={logo} alt="Logo" className="logo" />
            <h1>Готелі</h1>
            <nav>
            {isAuthenticated && (
                    <button className="logout-button" onClick={handleLogout}>
                        Вийти
                    </button>
                )}
                <ul>
                    <li><Link to="/">Головна</Link></li>
                    <li><Link to="/catalog">Каталог</Link></li>
                    
                    <li><Link to="/cart">Кошик</Link></li>
                    <li>
                        {showSearch && (
                            <input
                                type="text"
                                placeholder="Пошук"
                                className="search-bar"
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
