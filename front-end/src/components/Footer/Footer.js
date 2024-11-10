import React from 'react';
import './Footer.css';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.webp';
import instagram from '../../assets/images/instagram.png';
import x from '../../assets/images/ч.png';
const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="branding">
                    <h3>Готелі для всіх!</h3>
                    <p>Найкращі підбірки готелів</p>
                </div>
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="social-icons">
                    <a href="https://facebook.com"><img src={facebook} alt="Facebook" /></a>
                    <a href="https://www.instagram.com"><img src={instagram} alt="Instagram" /></a>
                    <a href="https://x.com"><img src={x} alt="X" /></a>
                    
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <p>2024 Hotels © Copyright all rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
