import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Sidebar */}
        <AdminSidebar 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content */}
        <main className={`admin-main ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
          {/* Top Bar with Menu Button */}
          <div className="admin-top-bar">
            {/* Desktop Sidebar Toggle */}
            <button 
              className="sidebar-toggle-btn desktop-only"
              onClick={toggleSidebar}
              title={isCollapsed ? 'הרחב תפריט' : 'כווץ תפריט'}
            >
              <Menu size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle mobile-only"
              onClick={toggleMobileMenu}
              aria-label="פתח תפריט"
            >
              <Menu size={24} />
            </button>

            <div className="page-title">
              <h1>אזור ניהול</h1>
            </div>
          </div>

          {/* Page Content */}
          <div className="admin-content">
            <Outlet />
          </div>
        </main>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div 
            className="mobile-sidebar-overlay"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;