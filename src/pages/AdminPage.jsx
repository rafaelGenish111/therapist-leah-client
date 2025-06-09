import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Menu } from 'lucide-react';

const AdminPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // טעינה ראשונית
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="container">
          <div className="loading-container">
            <div className="spinner">
              <div className="spinner__circle"></div>
            </div>
            <p>טוען אזור ניהול...</p>
          </div>
        </div>
      </div>
    );
  }

  // אם לא מחובר - הפניה לעמוד התחברות
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // סגירת תפריט נייד בעת שינוי גודל מסך
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="admin-page">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        aria-label="פתח תפריט ניהול"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div className="admin-container">
        {/* Admin Sidebar */}
        <AdminSidebar 
          collapsed={sidebarCollapsed}
          mobileOpen={mobileSidebarOpen}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;