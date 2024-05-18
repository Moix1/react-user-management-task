import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth ? <Navigate to="/users" /> : children;
};

export default PublicRoute;
