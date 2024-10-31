import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';
const Header = () => {
    return (
        <header>
            <img src={logo} alt="Logo" className="logo"  />
            <h1>Готелі</h1>
            <nav>
                <ul>
                    <li>Головна</li>
                    <li>Каталог</li>
                    <li>Кошик</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
