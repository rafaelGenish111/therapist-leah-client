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

  // ✅ בדיקת token בטעינה ראשונית - בלי React Query
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.log('AuthContext: No token found');
        setLoading(false);
        return;
      }

      try {
        console.log('AuthContext: Verifying token...');
        const data = await authApi.verifyToken();
        console.log('AuthContext: Token valid, user:', data.user);
        setUser(data.user);
      } catch (error) {
        console.log('AuthContext: Token invalid, removing');
        localStorage.removeItem('authToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Login function
  const login = async (credentials) => {
    try {
      console.log('AuthContext: Starting login...', credentials);
      const data = await authApi.login(credentials);
      console.log('AuthContext: Login API success:', data);
      
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      
      console.log('AuthContext: User set successfully');
      toast.success(`ברוך הבא, ${data.user.username}!`);
      
      return data;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      toast.error(error.message || 'שגיאה בהתחברות');
      throw error;
    }
  };

  // ✅ Logout function
  const logout = () => {
    console.log('AuthContext: Logging out');
    localStorage.removeItem('authToken');
    setUser(null);
    toast.success('התנתקת בהצלחה');
  };

  // ✅ Change password function
  const changePassword = async (passwordData) => {
    try {
      await authApi.changePassword(passwordData);
      toast.success('הסיסמה שונתה בהצלחה');
    } catch (error) {
      toast.error(error.message || 'שגיאה בשינוי הסיסמה');
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    changePassword,
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