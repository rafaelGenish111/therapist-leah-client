// src/components/admin/AdminSidebar.jsx
import React from 'react';
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
  LogOut,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './AdminSidebar.css';

const AdminSidebar = ({
  activeSection,
  onSectionChange,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onToggleMobile
}) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: <Home size={20} />, 
      label: 'לוח בקרה',
      description: 'סקירה כללית של המערכת'
    },
    { 
      id: 'articles', 
      icon: <FileText size={20} />, 
      label: 'ניהול מאמרים',
      description: 'כתיבה ועריכה של מאמרים'
    },
    { 
      id: 'gallery', 
      icon: <Image size={20} />, 
      label: 'גלריית תמונות',
      description: 'ניהול תמונות הקליניקה'
    },
    { 
      id: 'declarations', 
      icon: <Heart size={20} />, 
      label: 'הצהרות בריאות',
      description: 'צפייה בהצהרות מטופלים'
    },
    { 
      id: 'activity', 
      icon: <Activity size={20} />, 
      label: 'פעילות באתר',
      description: 'סטטיסטיקות ואנליטיקס'
    },
    { 
      id: 'settings', 
      icon: <Settings size={20} />, 
      label: 'הגדרות',
      description: 'הגדרות מערכת וקליניקה'
    }
  ];

  const handleLogout = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתנתק?')) {
      logout();
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={onToggleMobile}
        aria-label="פתח תפריט"
      >
        <Menu size={24} />
      </button>

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
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
            title={isCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
          >
            <Menu size={20} />
          </button>

          {/* Mobile Close Button */}
          <button 
            className="sidebar-close mobile-only"
            onClick={onToggleMobile}
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
              <span className="user-name">{user?.username || 'משתמש'}</span>
              <span className="user-role">
                {user?.role === 'admin' ? 'מנהלת' : 'מטפלת'}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => onSectionChange(item.id)}
                  title={isCollapsed ? item.label : item.description}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="nav-label">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button 
            className="logout-button"
            onClick={handleLogout}
            title="התנתק מהמערכת"
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