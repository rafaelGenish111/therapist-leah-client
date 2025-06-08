import { useState, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  // ✅ כשהמשתמש מתחבר בהצלחה, נווט לאדמין
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state?.from?.pathname]);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data) => {
    console.log('LoginPage: Form submitted with:', data);
    
    try {
      setIsLoading(true);
      
      const result = await login(data);
      console.log('LoginPage: Login successful, result:', result);
      
      // המתן רגע קצר ואז בדוק שוב את הstate
      setTimeout(() => {
        console.log('LoginPage: Checking auth state after login...');
        console.log('isAuthenticated:', isAuthenticated);
        
        if (isAuthenticated) {
          console.log('LoginPage: Navigating to admin...');
          navigate('/admin', { replace: true });
        } else {
          console.log('LoginPage: Still not authenticated, something went wrong');
        }
      }, 100);
      
    } catch (error) {
      console.error('LoginPage: Login error:', error);
      setError('root', {
        type: 'manual',
        message: error.message || 'שגיאה בהתחברות'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <Card className="login-card">
            <div className="login-header">
              <h1>כניסה לאזור האישי</h1>
              <p>אזור מוגבל למטפלת בלבד</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <div className="form-group">
                <label htmlFor="username">שם משתמש</label>
                <input
                  type="text"
                  id="username"
                  {...register('username', { 
                    required: 'שם משתמש נדרש',
                    minLength: {
                      value: 3,
                      message: 'שם משתמש חייב להכיל לפחות 3 תווים'
                    }
                  })}
                  className={errors.username ? 'error' : ''}
                  placeholder="הכנס שם משתמש"
                  disabled={isLoading}
                />
                {errors.username && (
                  <span className="error-message">{errors.username.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">סיסמה</label>
                <input
                  type="password"
                  id="password"
                  {...register('password', { 
                    required: 'סיסמה נדרשת',
                    minLength: {
                      value: 6,
                      message: 'סיסמה חייבת להכיל לפחות 6 תווים'
                    }
                  })}
                  className={errors.password ? 'error' : ''}
                  placeholder="הכנס סיסמה"
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="error-message">{errors.password.message}</span>
                )}
              </div>

              {/* ✅ הצגת שגיאות כלליות */}
              {errors.root && (
                <div className="form-group">
                  <span className="error-message">{errors.root.message}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading}
                className="login-submit"
              >
                {isLoading ? (
                  <>
                    <Spinner size="small" />
                    מתחבר...
                  </>
                ) : (
                  'כניסה'
                )}
              </Button>
            </form>

            <div className="demo-info">
              <p><strong>חשבון הדגמה:</strong></p>
              <p>שם משתמש: demo</p>
              <p>סיסמה: 123456</p>
              <p><small>⚠️ זכור ליצור משתמש אמיתי עם npm run create-admin</small></p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;