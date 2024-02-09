import React from 'react';
import './App.css'; // Make sure to create a CSS file for styling
import Logo from './Bilder/Logo_CC.png';

const Footer = () => {
    return (
        <footer className="site-footer" id='footer'>
            <div className="footer-container">
                <div className="footer-logo">
                    <img src={Logo} alt="logo" id="logo" />
                </div>
                <div className="footer-social-media">
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <div className="footer-links">
                    <a href="/about">Om oss</a>
                    <a href="/contact">Kontakt oss</a>
                    <a href="/privacy">Personvernerklæring</a>
                </div>
                <div className="footer-newsletter">
                    <form>
                        <input type="email" placeholder="Abonner på vårt nyhetsbrev" />
                        <button type="submit">Abonner</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
