import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element, isAuthenticated, fallbackPath = '/signin' }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={fallbackPath} replace />
  );
};

export default AuthRoute;
