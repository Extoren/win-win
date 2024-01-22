import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from './Bilder/Logo_CC.png';

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
    const headerRef = useRef(null);
    const [isLinkClicked, setLinkClicked] = useState(false);
    const location = useLocation();
  
    // Function to toggle the theme
    const toggleTheme = () => {
      const newTheme = theme === 'dark-mode' ? '' : 'dark-mode';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };
  
    // Load theme from local storage on mount
    useEffect(() => {
      document.body.className = theme;
  
    }, [theme]);

    const handleLinkClick = () => {
      setLinkClicked(true);
    }

    useEffect(() => {
      setLinkClicked(false);
    }, [location]);

  return (
    <div className="header" ref={headerRef}>
      <div className="logo">
        <Link to="/index.html">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <p>Winstinct!</p>
      </div>
      <div className="header-menu-container">
        <div className="header-menu">
            <NavLink to="/" activeClassName="active">Finn Jobb</NavLink>
            {/*<NavLink to="/" activeClassName="active">Dinne oppdrag</NavLink>*/}
            <NavLink to="/faq" activeClassName="active">FAQ</NavLink>
            <NavLink to="/create" className={location.pathname === "/create" ? "" : "menu-background"} activeClassName="active">
              <i className="fas fa-plus-circle"></i> Lag Jobb
            </NavLink>
        </div>
      </div>
      <div className="user-settings">
        <div className={`App ${theme}`}>
          <div className="dark-light" onClick={toggleTheme}>
            <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </div>
        </div>
        <div className="user-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-square"
          >
            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
            <image
              xlinkHref="https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg"
              x={6}
              y={6}
              width={12}
              height={12}
            />
          </svg>
          <div className="dropdown-menu">
            {/* Dropdown menu content goes here */}
            <a href="#" className="selected-location">
              Norsk
            </a>
            <a href="#">English</a>
          </div>
        </div>
        {/*<img class="user-profile" src="#" alt="">
      <button id="sign-out-btn"></button>*/}
        <Link to="/Login">
          <div className="user-name">Logg inn</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
