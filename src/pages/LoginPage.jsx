import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import './LoginPage.css';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data);
      navigate('/admin');
    } catch (error) {
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
              {errors.root && (
                <div className="error-message" style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                  {errors.root.message}
                </div>
              )}

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

              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading}
                className="login-submit"
              >
                {isLoading ? (
                  <>
                    <Spinner size="small" color="white" />
                    מתחבר...
                  </>
                ) : (
                  'כניסה'
                )}
              </Button>
            </form>

            <div className="demo-info">
              <strong>חשבון הדגמה:</strong>
              <p>שם משתמש: demo</p>
              <p>סיסמה: 123456</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;