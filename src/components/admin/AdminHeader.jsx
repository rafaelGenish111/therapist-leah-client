import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search, Settings, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader = ({ onToggleSidebar, onToggleMobileSidebar, sidebarCollapsed }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">
        {/* Left Side - Menu & Search */}
        <div className="header-left">
          {/* Desktop Sidebar Toggle */}
          <button 
            className="sidebar-toggle desktop-only"
            onClick={onToggleSidebar}
            title={sidebarCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
          >
            <Menu size={20} />
          </button>

          {/* Mobile Sidebar Toggle */}
          <button 
            className="sidebar-toggle mobile-only"
            onClick={onToggleMobileSidebar}
            title="פתח תפריט"
          >
            <Menu size={20} />
          </button>

          {/* Logo & Title */}
          <div className="admin-logo">
            <Link to="/admin" className="logo-link">
              <div className="logo-circle">ל</div>
              <div className="logo-text">
                <h1>אזור ניהול</h1>
                <span>קליניקת ליאה גניש</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Center - Search */}
        <div className="header-center">
          <div className={`search-container ${searchOpen ? 'open' : ''}`}>
            <button 
              className="search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search size={20} />
            </button>
            {searchOpen && (
              <input
                type="text"
                placeholder="חיפוש..."
                className="search-input"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            )}
          </div>
        </div>

        {/* Right Side - Actions & User */}
        <div className="header-right">
          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/" className="action-btn" title="חזרה לאתר">
              <Home size={20} />
            </Link>
            
            <button className="action-btn" title="התראות">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            
            <button className="action-btn" title="הגדרות">
              <Settings size={20} />
            </button>
          </div>

          {/* User Menu */}
          <div className="user-menu">
            <button 
              className="user-menu-trigger"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div className="user-info">
                <span className="user-name">{user?.username}</span>
                <span className="user-role">מנהלת</span>
              </div>
            </button>

            {userMenuOpen && (
              <div className="user-menu-dropdown">
                <div className="dropdown-header">
                  <div className="user-avatar large">
                    <User size={24} />
                  </div>
                  <div>
                    <div className="user-name">{user?.username}</div>
                    <div className="user-email">admin@leahgenish.co.il</div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <div className="dropdown-menu">
                  <button className="dropdown-item">
                    <User size={16} />
                    פרופיל אישי
                  </button>
                  <button className="dropdown-item">
                    <Settings size={16} />
                    הגדרות חשבון
                  </button>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <LogOut size={16} />
                  התנתק
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;