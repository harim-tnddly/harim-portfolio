import React from 'react';
import './Header.css';

const Header = ({ className }) => {
    return (
        <header className={`header-container ${className}`}>
            {/* Navigation Bar */}
            <nav className="nav-bar">
                <ul className="nav-list">
                    <li className="nav-item active">Home</li>
                    <li className="nav-item">About</li>
                    <li className="nav-item">Portfolio</li>
                    <li className="nav-item">Coding</li>
                    <li className="nav-item">AI</li>
                    <li className="nav-item last">FAQ</li>
                </ul>
            </nav>

            {/* Contact Button */}
            <a href="#contact" className="contact-btn">contact</a>
        </header>
    );
};

export default Header;
