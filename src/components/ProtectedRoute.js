import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = document.cookie.includes('token');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
