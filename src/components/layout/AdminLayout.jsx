import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../admin/AdminHeader';
import AdminSidebar from '../admin/AdminSidebar';
import AdminDashboard from '../admin/AdminDashboard';
import ArticlesManager from '../admin/ArticlesManager';
import GalleryManager from '../admin/GalleryManager';
import HealthDeclarations from '../admin/HealthDeclarations';
import StatsPage from '../admin/StatsPage';
import SettingsPage from '../admin/SettingsPage';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <AdminHeader 
        onToggleSidebar={toggleSidebar}
        onToggleMobileSidebar={toggleMobileSidebar}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Admin Sidebar */}
      <AdminSidebar 
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      {/* Main Content Area */}
      <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="admin-content">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="declarations" element={<HealthDeclarations />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;