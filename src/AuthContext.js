import React, { createContext, useState, useEffect } from 'react';
import { auth } from './firebaseConfig'; // Make sure to import your Firebase auth instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); // !!user will be true if user is not null (i.e., logged in)
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
