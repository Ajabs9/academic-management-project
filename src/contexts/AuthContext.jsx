import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a Firebase listener that runs whenever the auth state changes
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup the listener on unmount
  }, []);

  const value = {
    currentUser,
    userData,
    setUserData, // Expose setter so you can update after login
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}