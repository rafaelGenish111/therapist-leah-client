import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // שימוש ב-AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted!');
    
    // Clear previous error
    setErrorMessage('');
    
    // Basic validation
    if (!username.trim() || !password) {
      setErrorMessage('יש למלא את כל השדות');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Using AuthContext login...');
      
      // שימוש ב-AuthContext במקום fetch ישיר
      await login({
        username: username.trim(),
        password: password
      });
      
      console.log('Login successful via AuthContext!');
      navigate('/admin');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'שם משתמש או סיסמה שגויים');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F5E6E3',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#4A3429' }}>כניסה לאזור האישי</h1>
          <p style={{ margin: 0, color: '#8B6F66' }}>אזור מוגבל למטפלת בלבד</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#DC2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#8B6F66'
            }}>
              שם משתמש
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="הכנס שם משתמש"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F5E6E3',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#8B6F66'
            }}>
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הכנס סיסמה"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #F5E6E3',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              background: isLoading ? '#B89C94' : '#D4B5B0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isLoading ? 'מתחבר...' : 'כניסה'}
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#F5E6E3',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#8B6F66'
        }}>
          <p style={{ margin: '0 0 5px 0' }}><strong>חשבון לבדיקה:</strong></p>
          <p style={{ margin: '0 0 5px 0' }}>שם משתמש: admin</p>
          <p style={{ margin: 0 }}>סיסמה: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;