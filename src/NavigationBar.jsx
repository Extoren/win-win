import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './App.css'; // Ensure this path is correct for your CSS file

const NavigationBar = (onClose) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveIndex(0);
        break;
      case '/faq':
        setActiveIndex(1);
        break;
      default:
        setActiveIndex(-1);
        break;
    }
    
  }, [location]);
  

  return (
    <div className="nav-container">
      <nav className="nav-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            {/* Use onClick to call handleClick */}
            <NavLink to="/" className={`nav-link ${activeIndex === 0 ? 'active' : ''}`} onClick={onClose}>
              <i className="nav-icon fas fa-home"></i>
              <span className="nav-text">Hjem</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/faq" className={`nav-link ${activeIndex === 1 ? 'active' : ''}`}>
              <i className="nav-icon fas fa-question"></i>
              <span className="nav-text">FAQ</span>
            </NavLink>
          </li>
          {/* Add other NavLink items here as needed, with onClick={handleClick} if they should perform the same action */}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
