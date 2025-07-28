import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');
    
    if (authStatus === 'true' && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
    setLoading(false);
  }, []);

  const login = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const value = {
    isAuthenticated,
    username,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};