import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './App.css'; 
import { AuthContext } from './AuthContext';
import { auth, database } from './firebaseConfig'; // Ensure you import your Firebase services
import { ref, get } from "firebase/database";

const NavigationBar = ({ onClose }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { isLoggedIn } = useContext(AuthContext);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (isLoggedIn && auth.currentUser) {
      const userId = auth.currentUser.uid;
      const dbRef = ref(database, `users/${userId}`);
      
      get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUserType(snapshot.val().userType || ''); // Set userType or default to an empty string
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="nav-container">
      <nav className="nav-navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" className={`nav-link ${activePath === '/' ? 'active' : ''}`} onClick={() => {setActivePath('/'); onClose();}}>
              <i className="nav-icon fas fa-home"></i>
              <span className="nav-text">Hjem</span>
            </NavLink>
          </li>
          {userType === 'Offentlig' && (
            <li className="nav-item">
              <NavLink to="/create" className={`nav-link ${activePath === '/create' ? 'active' : ''}`} onClick={() => setActivePath('/create')}>
                <i id="bigger-stronger" className="nav-icon fas fa-plus-circle"></i>
                <span className="nav-text">Jobb</span>
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink to="/faq" className={`nav-link ${activePath === '/faq' ? 'active' : ''}`} onClick={() => setActivePath('/faq')}>
              <i className="nav-icon fas fa-question"></i>
              <span className="nav-text">FAQ</span>
            </NavLink>
          </li>
          {/* Additional NavLink items can be added here */}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
