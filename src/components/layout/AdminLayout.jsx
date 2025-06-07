import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';
import AdminDashboard from '../admin/AdminDashboard';
import ArticlesManager from '../admin/ArticlesManager';
import GalleryManager from '../admin/GalleryManager';
import HealthDeclarations from '../admin/HealthDeclarations';
import WebsiteActivity from '../admin/WebsiteActivity';
import Settings from './settings';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
          isMobileOpen={mobileMenuOpen}
          onMobileToggle={handleMobileMenuToggle}
          onMobileClose={closeMobileMenu}
        />
        
        <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/articles" element={<ArticlesManager />} />
            <Route path="/gallery" element={<GalleryManager />} />
            <Route path="/declarations" element={<HealthDeclarations />} />
            <Route path="/activity" element={<WebsiteActivity />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-sidebar-toggle"
          onClick={handleMobileMenuToggle}
          aria-label="פתח תפריט"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div 
            className="mobile-sidebar-overlay"
            onClick={closeMobileMenu}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;