import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          console.log('AuthContext: Found token, verifying...');
          const response = await authApi.verifyToken();
          console.log('AuthContext: Token verified, user:', response.user);
          setUser(response.user);
        } catch (error) {
          console.log('AuthContext: Token verification failed:', error.message);
          localStorage.removeItem('authToken');
        }
      } else {
        console.log('AuthContext: No token found');
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Attempting login with:', credentials);
      const response = await authApi.login(credentials);
      
      console.log('AuthContext: Raw response:', response);
      
      if (!response || !response.token) {
        throw new Error('לא התקבל טוקן מהשרת');
      }
      
      // Save token
      localStorage.setItem('authToken', response.token);
      console.log('AuthContext: Token saved to localStorage');
      
      // Set user
      setUser(response.user);
      
      console.log('AuthContext: Login successful, user set:', response.user);
      
      return response;
    } catch (error) {
      console.error('AuthContext: Login failed:', error);
      
      // Clean up any existing token on failed login
      localStorage.removeItem('authToken');
      setUser(null);
      
      // Re-throw the error so the component can handle it
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };

  console.log('AuthContext render:', { 
    user: user?.username || null, 
    isAuthenticated: !!user, 
    loading 
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};