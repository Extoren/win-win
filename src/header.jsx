import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import logo from './Bilder/Logo_CC.png';
import { database } from './firebaseConfig';
import { ref, get } from "firebase/database";

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
  
    // Function to toggle the theme
    const toggleTheme = () => {
      const newTheme = theme === 'dark-mode' ? '' : 'dark-mode';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };

    // Function to handle user sign out
    const handleSignOut = () => {
      signOut(auth).then(() => {
          // Sign-out successful.
          setIsLoggedIn(false); // Update context state
      }).catch((error) => {
          // An error happened.
          console.error('Error signing out:', error);
      });
  };
  
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
                    <NavLink to="/myJobs" activeClassName="active">Oppdrag</NavLink>
                )}
                {!isLoading && role !== 'Voksen' && (
                    <NavLink to="/" activeClassName="active" onClick={onClose}>Finn Jobb</NavLink>
                )}
                {!isLoading && (
                    <NavLink to="/faq" activeClassName="active">FAQ</NavLink>
                )}
                {!isLoading && role === 'Voksen' && (
                    <NavLink to="/create" className={location.pathname === "/create" ? "" : "menu-background"} activeClassName="active">
                        <i className="fas fa-plus-circle"></i> Lag Jobb
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
        {isLoading ? (
        // Show a loading indicator or simply nothing while checking user status
        <div>Laster...</div> // You can replace this with a more subtle loader or placeholder
          ) : isLoggedIn && !isMakeUserRoute ? (
              // Once loading is complete and user is logged in, show user profile and settings
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
                              <i className="fas fa-user"></i> Din profil
                          </button>
                          <button id="settings-btn">
                            <i className="fas fa-cog"></i> Innstillinger
                          </button>
                          <button id="sign-out-btn" onClick={handleSignOut}>
                              <i className="fas fa-sign-out-alt"></i> Logg ut
                          </button>
                      </div>
                  )}
              </div>
          ) : (
              // If not loading, not logged in, or on the MakeUser route, show the login link
              <Link to="/Login">
                  <div className="user-name">Logg inn</div>
              </Link>
          )}
      </div>
    </div>
  );
}

export default Header;
