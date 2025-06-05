import { createContext, useContext, useState, useEffect } from 'react';

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

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('authUser');
        const token = localStorage.getItem('authToken');
        
        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Demo login - replace with real API call
      if (credentials.username === 'demo' && credentials.password === '123456') {
        const userData = { 
          username: 'ליאה', 
          role: 'admin',
          id: '1'
        };
        
        setUser(userData);
        localStorage.setItem('authUser', JSON.stringify(userData));
        localStorage.setItem('authToken', 'demo-token-123');
        
        return Promise.resolve();
      }
      
      throw new Error('שם משתמש או סיסמה שגויים');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};