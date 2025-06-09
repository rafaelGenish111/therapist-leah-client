import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Image, 
  Heart, 
  Settings, 
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
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

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isOpen ? 'open' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <button 
          className="collapse-btn desktop-only"
          onClick={onToggleCollapse}
          title={isCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <button 
          className="close-btn mobile-only"
          onClick={onClose}
          title="סגור תפריט"
        >
          <X size={20} />
        </button>
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
                onClick={() => window.innerWidth <= 768 && onClose()}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="footer-info">
            <p>גירסה 1.0.0</p>
            <p>© 2024 ליאה גניש</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;