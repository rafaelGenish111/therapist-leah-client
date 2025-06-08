import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import ArticlesManager from '../components/admin/ArticlesManager';
import GalleryManager from '../components/admin/GalleryManager';
import HealthDeclarations from '../components/admin/HealthDeclarations';
import './AdminPage.css';

const AdminPage = () => {
  const { isAuthenticated } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="admin-page">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={toggleMobileSidebar}
        aria-label="פתח תפריט"
      >
        <Menu size={24} />
      </button>

      <div className="admin-container">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          isMobileOpen={mobileSidebarOpen}
          setIsMobileOpen={setMobileSidebarOpen}
        />
        
        <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="declarations" element={<HealthDeclarations />} />
            <Route path="stats" element={<div>סטטיסטיקות בפיתוח...</div>} />
            <Route path="settings" element={<div>הגדרות בפיתוח...</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;