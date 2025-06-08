import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import toast from 'react-hot-toast';

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

  // Check if user is logged in on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await authApi.verifyToken();
          setUser(response.user);
        } catch (error) {
          localStorage.removeItem('authToken');
          console.error('Token verification failed:', error);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.token);
      
      // Set user in state
      setUser(response.user);
      
      toast.success(`ברוך הבא, ${response.user.username}!`);
      return response;
    } catch (error) {
      toast.error(error.message || 'שגיאה בהתחברות');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast.success('התנתקת בהצלחה');
  };

  const changePassword = async (passwordData) => {
    try {
      const response = await authApi.changePassword(passwordData);
      toast.success('הסיסמה שונתה בהצלחה');
      return response;
    } catch (error) {
      toast.error(error.message || 'שגיאה בשינוי סיסמה');
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    changePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};