import React, { useState } from 'react';
import { JPMorganLogo } from '../Logo/JPMorganLogo';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <JPMorganLogo />
        </div>
        
        <nav className={`header-nav ${isMenuOpen ? 'header-nav--open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#dashboard" className="nav-link">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="#portfolios" className="nav-link">Portfolios</a>
            </li>
            <li className="nav-item">
              <a href="#strategies" className="nav-link">Strategies</a>
            </li>
            <li className="nav-item">
              <a href="#reports" className="nav-link">Reports</a>
            </li>
            <li className="nav-item">
              <a href="#settings" className="nav-link">Settings</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="user-menu-btn" type="button">
            <span className="user-icon">👤</span>
            <span className="user-text">User Menu</span>
          </button>
          
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
