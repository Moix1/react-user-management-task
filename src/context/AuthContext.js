import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setAuth({
        userId: decodedToken.userId,
        role: decodedToken.role,
        token,
      });
    }
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    setAuth({
      userId: decodedToken.userId,
      role: decodedToken.role,
      token,
    });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
