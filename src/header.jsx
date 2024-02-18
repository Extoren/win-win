import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import logo from './Bilder/Logo_CC.png';
import { database } from './firebaseConfig';
import { ref, get } from "firebase/database";
import { useTranslation } from 'react-i18next'


function Header({ onClose }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
    const headerRef = useRef(null);
    const [isLinkClicked, setLinkClicked] = useState(false);
    const location = useLocation();
    const [userName, setUserName] = useState({ firstName: '', lastName: '' });
    const isMakeUserRoute = location.pathname === "/makeUser";
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    // Function to toggle the theme
    const toggleTheme = () => {
      const newTheme = theme === 'dark-mode' ? '' : 'dark-mode';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    const handleSignOut = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        setIsLoggedIn(false); // Update context state
        window.location.href = '/'; // Redirect to root path and reload the page
      }).catch((error) => {
        // An error happened.
        console.error('Error signing out:', error);
      });
    };
    
    
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
      localStorage.setItem('appLanguage', language); // Save the selected language to localStorage
    };
    
    useEffect(() => {
      const savedLanguage = localStorage.getItem('appLanguage');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
      // Include other initialization logic here as necessary
    }, []); // The empty array ensures this effect runs only once on mount
    
  
    // Load theme from local storage on mount
    useEffect(() => {
      document.body.className = theme;
  
    }, [theme]);

    useEffect(() => {
      setIsLoading(true); // Start loading
      if (isLoggedIn && auth.currentUser) {
          const userId = auth.currentUser.uid;
          const dbRef = ref(database, 'users/' + userId);
  
          get(dbRef).then((snapshot) => {
              if (snapshot.exists()) {
                  const userData = snapshot.val();
                  setUserName({ firstName: userData.name, lastName: userData.surname });
                  setRole(userData.role || '');
              } else {
                  console.log("No data available");
              }
              setIsLoading(false); // End loading once data is fetched
          }).catch((error) => {
              console.error(error);
              setIsLoading(false); // Ensure loading ends even if there's an error
          });
      } else {
          setIsLoading(false); // Not logged in, so not loading
      }
  }, [isLoggedIn, auth.currentUser]);
  

    const handleDivClick = () => {
      setShowDropdown(!showDropdown);
    };

    useEffect(() => {
      setLinkClicked(false);
    }, [location]);

    useEffect(() => {
      if (isLoggedIn && auth.currentUser) {
          const userId = auth.currentUser.uid;
          const dbRef = ref(database, 'users/' + userId);
          
          get(dbRef).then((snapshot) => {
              if (snapshot.exists()) {
                  const userData = snapshot.val();
                  // Update the state for the user's name and surname.
                  setUserName({ firstName: userData.name, lastName: userData.surname });
                  // Also update the state for the user's type.
                  setRole(userData.role || ''); // use empty string as default if userType is not set
              } else {
                  console.log("No data available");
              }
          }).catch((error) => {
              console.error(error);
          });
      }
    }, [isLoggedIn]);

  return (
    <div className="header" ref={headerRef}>
      <div className="logo" onClick={onClose}>
        <Link to="/index.html">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <p>Winstinct!</p>
      </div>
      <div className="header-menu-container">
        <div className="header-menu">
          {!isLoading && role === 'Voksen' && (
            <NavLink to="/myJobs" activeClassName="active">{t('assignments')}</NavLink>
          )}
          {!isLoading && role !== 'Voksen' && (
            <NavLink to="/" activeClassName="active" onClick={onClose}>{t('find_job')}</NavLink>
          )}
          {!isLoading && (
            <NavLink to="/faq" activeClassName="active">{t('faq')}</NavLink>
          )}
          {!isLoading && role === 'Voksen' && (
            <NavLink to="/create" className={location.pathname === "/create" ? "" : "menu-background"} activeClassName="active">
              <i className="fas fa-plus-circle"></i> {t('create_job')}
            </NavLink>
          )}
          {!isLoading && role === 'Barn' && (
            <NavLink to="/favoritt" className={location.pathname === "/favoritt" ? "" : "menu-background"} activeClassName="active">
              <i className="fas fa-heart"></i> {t('favorites')}
            </NavLink>
          )}
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
              xlinkHref={i18n.language === 'en' ? "https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_the_United_Kingdom_reversed.svg" : "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg"}
              x={6}
              y={6}
              width={12}
              height={12}
            />
          </svg>
          <div className="dropdown-menu">
            <a href="#" className="selected-location" onClick={() => changeLanguage('no')}>
              {t('Norsk')}
            </a>
            <a href="#" onClick={() => changeLanguage('en')}>
              {t('English')}
            </a>
          </div>
        </div>
        {isLoading ? (
          <div>{t('loading')}</div>
        ) : isLoggedIn && !isMakeUserRoute ? (
          <div className="profile-container">
            <div className="profile" onClick={handleDivClick}>
              <div className="user-profile">
                  <i className="fas fa-user"></i>
              </div>
              <label htmlFor="text">{`${userName.firstName} ${userName.lastName}`}</label>
            </div>
            {showDropdown && (
                <div className="dropdown-menu2">
                    <button id="profile-btn">
                        <i className="fas fa-user"></i> {t('your_profile')}
                    </button>
                    <button id="settings-btn">
                      <i className="fas fa-cog"></i> {t('settings')}
                    </button>
                    <button id="sign-out-btn" onClick={handleSignOut}>
                        <i className="fas fa-sign-out-alt"></i> {t('sign_out')}
                    </button>
                </div>
            )}
          </div>
        ) : (
          <Link to="/Login">
              <div className="user-name">{t('login')}</div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
