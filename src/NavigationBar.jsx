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
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  useEffect(() => {
    setIsLoading(true); // Start loading
    if (isLoggedIn && auth.currentUser) {
        const userId = auth.currentUser.uid;
        const dbRef = ref(database, 'users/' + userId);

        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
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

  return (
    <div className="nav-container">
      <nav className="nav-navigation">
        <ul className="nav-list">
          {role === 'Voksen' && (
            <li className="nav-item">
              <NavLink to="/myJobs" className={`nav-link ${activePath === '/myJobs' ? 'active' : ''}`} onClick={() => {setActivePath('/');}}>
                <i className="nav-icon fas fa-home"></i>
                <span className="nav-text">Oppdrag</span>
              </NavLink>
            </li>
          )}
          {!isLoading && role !== 'Voksen' && (
            <li className="nav-item">
              <NavLink to="/" className={`nav-link ${activePath === '/' ? 'active' : ''}`} onClick={() => {setActivePath('/'); onClose();}}>
                <i className="nav-icon fas fa-home"></i>
                <span className="nav-text">Hjem</span>
              </NavLink>
            </li>
          )}
          {!isLoading && role === 'Voksen' && (
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
