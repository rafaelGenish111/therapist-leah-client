import { Link } from 'react-router-dom';
import { Menu, Bell, Settings, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import './AdminHeader.css';

const AdminHeader = ({ onMenuToggle, sidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        {/* Left Side - Menu & Logo */}
        <div className="header-left">
          <button 
            className="menu-toggle-btn"
            onClick={onMenuToggle}
            aria-label="פתח/סגור תפריט"
          >
            <Menu size={20} />
          </button>

          <Link to="/admin" className="admin-logo">
            <div className="logo-circle">ל</div>
            <div className="logo-text">
              <h1>אזור ניהול</h1>
              <p> לאה גניש</p>
            </div>
          </Link>
        </div>

        {/* Center - Breadcrumb */}
        <div className="header-center">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              <Home size={16} />
              האתר הראשי
            </Link>
          </nav>
        </div>

        {/* Right Side - User Actions */}
        <div className="header-right">
          <div className="header-actions">
            <button className="action-btn" title="התראות">
              <Bell size={18} />
              <span className="notification-badge">3</span>
            </button>

            <button className="action-btn" title="הגדרות">
              <Settings size={18} />
            </button>

            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  <User size={16} />
                </div>
                <div className="user-details">
                  <span className="user-name">שלום {user?.username}</span>
                  <span className="user-role">{user?.role === 'admin' ? 'מנהלת' : 'מטפלת'}</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="small" 
                onClick={handleLogout}
                className="logout-btn"
              >
                <LogOut size={16} />
                יציאה
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;