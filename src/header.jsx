import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import logo from './Bilder/Logo_CC.png';
import { database } from './firebaseConfig';
import { ref, get } from "firebase/database";
import { onValue, set, serverTimestamp } from 'firebase/database';
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

    const [notificationCount, setNotificationCount] = useState(0);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

    // Add state to hold the list of parent requests
    const [parentRequests, setParentRequests] = useState([]);

    useEffect(() => {
      if (role === 'Barn' && isLoggedIn && auth.currentUser) {
        const parentRequestsRef = ref(database, `parentRequests/${auth.currentUser.uid}`);
        const unsubscribe = onValue(parentRequestsRef, (snapshot) => {
          const requests = [];
          snapshot.forEach((childSnapshot) => {
            requests.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            });
          });
          setParentRequests(requests);
          setNotificationCount(requests.length); // Update the notification count
        });
        
        return () => unsubscribe(); // Unsubscribe when the component unmounts
      }
    }, [role, isLoggedIn, auth.currentUser]);
    
    

    // Function to format the timestamp received from Firebase
    const formatTimestamp = (timestamp) => {
      // Assuming timestamp is a Firebase Timestamp object
      if (!timestamp) return '';
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleTimeString(); // You can adjust this format as needed
    };

    // Function to handle the child's response to a parent request
    const handleParentRequestResponse = async (requestId, response) => {
      const currentUserUid = auth.currentUser.uid;
      const parentRequestRef = ref(database, `parentRequests/${currentUserUid}/${requestId}`);

      try {
        // Update the status of the parent request based on the child's response
        await set(parentRequestRef, {
          status: response, // 'accepted' or 'rejected'
          responseTimestamp: serverTimestamp() // Use Firebase server timestamp
        });
        alert(`Request ${response}.`);
      } catch (error) {
        console.error('Error updating parent request response:', error);
      }
    };


    // Update the render logic to include the parent request notifications
    const renderNotifications = () => {
      return parentRequests.map((request) => (
        <div key={request.id} className="notification-item">
          <i className="fas fa-user"></i>
          <div className="notification-content">
            <p className="notification-title">
              {splitTextWithLineBreaks(`Godkjenner du forespørsel fra ${request.parentEmail}?`, 30)}
            </p>
            <div className='notification-buttons'>
              <button id="no" onClick={() => handleParentRequestResponse(request.id, 'rejected')}>nei</button>
              <button id="yes" onClick={() => handleParentRequestResponse(request.id, 'accepted')}>ja</button>
            </div>
            <p className="notification-time">{formatTimestamp(request.timestamp)}</p> {/* Make sure to write a function to format the timestamp */}
          </div>
        </div>
      ));
    };

    const splitTextWithLineBreaks = (text, maxLineLength) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];
    
      words.slice(1).forEach(word => {
        if ((currentLine + " " + word).length > maxLineLength) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine += " " + word;
        }
      });
    
      // Push the last line
      lines.push(currentLine);
    
      const formattedText = lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}{index < lines.length - 1 && <br />}
        </React.Fragment>
      ));
    
      return formattedText;
    };
    


    const toggleNotificationDropdown = () => {
      setShowNotificationDropdown(!showNotificationDropdown);
    };


    useEffect(() => {
      // Simulate fetching notification count, for example, from Firebase or another API
      const fetchNotifications = async () => {
        // Simulated fetch logic
        const fetchedNotificationCount = 3; // Pretend we fetched this number from an API
        const displayCount = fetchedNotificationCount > 9 ? "9+" : fetchedNotificationCount.toString();
        setNotificationCount(displayCount);
      };
    
      if (isLoggedIn) {
        fetchNotifications();
      }
    }, [isLoggedIn]);
    
  
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
        <Link to="/">
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
          {!isLoading && ['Voksen', 'Barn'].includes(role) && (
          <div className="notification" onClick={toggleNotificationDropdown}>
            <i className="far fa-bell"></i>
            {notificationCount !== "0" && <span className="notification-count">{notificationCount}</span>}
            {showNotificationDropdown && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <span className="notification-title">Varsler</span>
                  <i className="fas fa-cog notification-settings-icon"></i>
                </div>
                {renderNotifications()}
                <div className="notification-item">
                  <i className="fas fa-check"></i>
                  <div className="notification-content">
                    <p className="notification-title">Verifiser din bruker</p>
                    <p className="notification-time">3 timer siden</p>
                  </div>
                </div>
                {/* ... other notifications */}
              </div>
            )}
          </div>
        )}
        <div className={`App ${theme}`}>
          {/*<div className="dark-light" onClick={toggleTheme}>
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
          </div>*/}
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
                    <Link to={`/win/${auth.currentUser.uid}`}>
                        <button id="profile-btn">
                            <i className="fas fa-user"></i> {t('your_profile')}
                        </button>
                    </Link>
                    <Link to="/settings">
                        <button id="settings-btn">
                            <i className="fas fa-cog"></i> {t('settings')}
                        </button>
                    </Link>
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
