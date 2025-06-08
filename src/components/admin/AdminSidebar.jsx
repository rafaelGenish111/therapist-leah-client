import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

const AdminSidebar = ({ isCollapsed, isMobileOpen, onClose, user }) => {
  const { logout } = useAuth();
  const location = useLocation();

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
    onClose();
  };

  const sidebarStyle = {
    position: 'fixed',
    top: '80px',
    right: 0,
    width: isCollapsed ? '80px' : '280px',
    height: 'calc(100vh - 80px)',
    background: '#FFFFFF',
    borderLeft: '1px solid #E7D1CD',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    zIndex: 50,
    overflowY: 'auto',
    transform: isMobileOpen ? 'translateX(0)' : 'translateX(100%)'
  };

  const sidebarHeaderStyle = {
    padding: '2rem',
    borderBottom: '1px solid #E7D1CD',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '80px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const logoCircleStyle = {
    width: '40px',
    height: '40px',
    background: '#D4B5B0',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const logoTextStyle = {
    display: isCollapsed ? 'none' : 'block'
  };

  const userInfoStyle = {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #E7D1CD',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  };

  const userAvatarStyle = {
    width: '35px',
    height: '35px',
    background: '#F5E6E3',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8B6F66'
  };

  const navStyle = {
    flex: 1,
    padding: '1.5rem 0'
  };

  const navListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const navItemStyle = {
    marginBottom: '0.25rem'
  };

  const getNavLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: isCollapsed ? '1rem' : '1rem 2rem',
    color: isActive ? '#FFFFFF' : '#8B6F66',
    textDecoration: 'none',
    transition: 'all 0.15s ease',
    borderRadius: 0,
    position: 'relative',
    background: isActive ? '#D4B5B0' : 'transparent',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  });

  const navIconStyle = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const navLabelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    display: isCollapsed ? 'none' : 'block'
  };

  const sidebarFooterStyle = {
    padding: '1.5rem 2rem',
    borderTop: '1px solid #E7D1CD'
  };

  const logoutButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    background: 'none',
    border: '2px solid #EF4444',
    color: '#EF4444',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    justifyContent: isCollapsed ? 'center' : 'flex-start'
  };

  return (
    <>
      <aside style={sidebarStyle}>
        {/* Sidebar Header */}
        <div style={sidebarHeaderStyle}>
          <div style={logoStyle}>
            <div style={logoCircleStyle}>ל</div>
            <div style={logoTextStyle}>
              <h3 style={{
                fontSize: '16px',
                margin: '0 0 2px 0',
                color: '#4A3429'
              }}>
                אזור ניהול
              </h3>
              <p style={{
                fontSize: '12px',
                margin: 0,
                color: '#8B6F66'
              }}>
                קליניקת ליאה גניש
              </p>
            </div>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8B6F66',
              padding: '0.5rem',
              borderRadius: '8px'
            }}
            onClick={onClose}
            className="mobile-close-btn"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info */}
        <div style={userInfoStyle}>
          <div style={userAvatarStyle}>
            <User size={20} />
          </div>
          {!isCollapsed && (
            <div style={{ flex: 1 }}>
              <span style={{
                display: 'block',
                fontWeight: '500',
                color: '#4A3429',
                fontSize: '14px'
              }}>
                {user?.username}
              </span>
              <span style={{
                display: 'block',
                fontSize: '12px',
                color: '#8B6F66'
              }}>
                {user?.role === 'admin' ? 'מנהלת' : 'מטפלת'}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav style={navStyle}>
          <ul style={navListStyle}>
            {menuItems.map((item) => (
              <li key={item.path} style={navItemStyle}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  style={({ isActive }) => getNavLinkStyle(isActive)}
                  onClick={onClose}
                  onMouseEnter={(e) => {
                    if (!e.target.matches('.active')) {
                      e.target.style.background = '#F5E6E3';
                      e.target.style.color = '#D4B5B0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.matches('.active')) {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#8B6F66';
                    }
                  }}
                >
                  <span style={navIconStyle}>{item.icon}</span>
                  <span style={navLabelStyle}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div style={sidebarFooterStyle}>
          <button 
            style={logoutButtonStyle}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.target.style.background = '#EF4444';
              e.target.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#EF4444';
            }}
            title="התנתק"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>התנתק</span>}
          </button>
          
          {!isCollapsed && (
            <div style={{
              textAlign: 'center',
              marginTop: '1rem'
            }}>
              <small style={{
                color: '#B89C94',
                fontSize: '12px'
              }}>
                גירסה 1.0.0
              </small>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          aside {
            width: 280px !important;
            z-index: 100 !important;
          }
          
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;