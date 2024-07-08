import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = () => {
    return (
      localStorage.getItem('profile') &&
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    );
  };

  return isAuthenticated() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
