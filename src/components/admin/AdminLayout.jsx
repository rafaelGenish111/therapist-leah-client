// src/components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminDashboard from './AdminDashboard';
import ArticlesManager from './ArticlesManager';
import GalleryManager from './GalleryManager';
import HealthDeclarations from './HealthDeclarations';
import WebsiteActivity from './WebsiteActivity';
import Settings from './Settings';
import './AdminLayout.css';

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'articles':
        return <ArticlesManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'declarations':
        return <HealthDeclarations />;
      case 'activity':
        return <WebsiteActivity />;
      case 'settings':
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsMobileSidebarOpen(false); // סגירת הסיידבר במובייל
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onToggleMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <main className={`admin-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;