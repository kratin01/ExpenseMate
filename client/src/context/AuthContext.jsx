import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Store logged-in user info
  const [user, setUser] = useState(null);
  // Show loading state while checking authentication
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (token) {
          const { data } = await getCurrentUser(); // Fetch user details
          setUser(data); // Save user info
        }
      } catch (error) {
        console.error('Auth check failed', error);
        localStorage.removeItem('token'); // Remove invalid token
      } finally {
        setLoading(false); // Stop loading after check
      }
    };
    
    loadUser();
  }, []);

  // Login function → save user info + token
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // Logout function → remove token + clear user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Values shared with all components
  const value = { user, login, logout, loading };

  return (
    // Provide auth values to children components
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
