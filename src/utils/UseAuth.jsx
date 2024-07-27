import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthentic, setIsAuthentic] = useState(!!localStorage.getItem('user'));

  return (
    <AuthContext.Provider value={{ isAuthentic, setIsAuthentic }}>
      {children}
    </AuthContext.Provider>
  );
};
