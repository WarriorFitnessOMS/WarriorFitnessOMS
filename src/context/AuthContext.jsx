/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // In a real app, you might fetch this from localStorage or an API on load
  const [user, setUser] = useState(null); 
  
  // Example function to log in (you will replace this with real API logic later)
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create and EXPORT the Custom Hook (This is what was missing!)
export const useAuth = () => {
  return useContext(AuthContext);
};