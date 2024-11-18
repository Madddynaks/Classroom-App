import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if user is authenticated

  return (
    <Route
      {...rest}
      element={
        token ? (
          <Component /> // Render the component if authenticated
        ) : (
          <Navigate to="/login" replace /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
