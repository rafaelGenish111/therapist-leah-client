import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Spinner from '../ui/Spinner';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute:', { isAuthenticated, loading }); // Debug

  if (loading) {
    return (
      <div className="private-route-loading">
        <div className="container">
          <div className="loading-container">
            <Spinner size="large" />
            <p>מאמת הרשאות...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('PrivateRoute: Not authenticated, redirecting to login'); // Debug
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('PrivateRoute: Authenticated, rendering children'); // Debug
  return children;
};

export default PrivateRoute;