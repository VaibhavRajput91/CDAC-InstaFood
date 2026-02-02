import { Navigate } from 'react-router-dom';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error decoding token', e);
    return null;
  }
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  if (requiredRole) {
    const payload = decodeToken(token);
    const roles = payload?.authorities || [];

    if (!roles.includes(requiredRole)) {
      // Redirect to home if user doesn't have the required role
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
