// src/components/routes/ProtectedRoute.js
// This component ensures that only authenticated users can access certain routes.
// If the user is not authenticated, they are redirected to the login page.
// It also shows a loading spinner while authentication state is being checked.

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

const ProtectedRoute = () => {
  // Access user authentication status and loading state from context
  const { user, loading } = useAuth();

  // If authentication check is still in progress, show a fullscreen loading spinner
  if (loading) return <Spinner fullScreen />;

  // If user is authenticated, render the child route components (Outlet)
  // If not authenticated, redirect to login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
