import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Image, 
  Heart, 
  Settings, 
  User,
  BarChart3,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = ({ 
  isCollapsed, 
  setIsCollapsed,
  isMobileOpen, 
  setIsMobileOpen 
}) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      path: '/admin',
      icon: <Home size={20} />,
      label: 'לוח בקרה',
      exact: true
    },
    {
      path: '/admin/articles',
      icon: <FileText size={20} />,
      label: 'ניהול מאמרים'
    },
    {
      path: '/admin/gallery',
      icon: <Image size={20} />,
      label: 'גלריית תמונות'
    },
    {
      path: '/admin/declarations',
      icon: <Heart size={20} />,
      label: 'הצהרות בריאות'
    },
    {
      path: '/admin/stats',
      icon: <BarChart3 size={20} />,
      label: 'סטטיסטיקות'
    },
    {
      path: '/admin/settings',
      icon: <Settings size={20} />,
      label: 'הגדרות'
    }
  ];

  const handleLogout = () => {
    logout();
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const closeMobileMenu = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const toggleSidebar = () => {
    if (setIsCollapsed) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-circle">ל</div>
            {!isCollapsed && (
              <div className="logo-text">
                <h3>אזור ניהול</h3>
                <p>קליניקת ליאה גניש</p>
              </div>
            )}
          </div>
          
          {/* Desktop Collapse Toggle */}
          <button 
            className="sidebar-toggle desktop-only"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
          >
            <Menu size={20} />
          </button>

          {/* Mobile Close Button */}
          <button 
            className="sidebar-close mobile-only"
            onClick={closeMobileMenu}
            aria-label="סגור תפריט"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="sidebar-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <span className="user-name">{user?.username}</span>
              <span className="user-role">{user?.role === 'admin' ? 'מנהלת' : 'מטפלת'}</span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  end={item.exact}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button 
            className="logout-button"
            onClick={handleLogout}
            title="התנתק"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>התנתק</span>}
          </button>
          
          {!isCollapsed && (
            <div className="sidebar-version">
              <small>גירסה 1.0.0</small>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;