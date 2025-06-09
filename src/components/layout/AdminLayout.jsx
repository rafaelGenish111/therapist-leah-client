import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../admin/AdminHeader';
import AdminSidebar from '../admin/AdminSidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      {/* Admin Header */}
      <AdminHeader 
        onMenuToggle={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />

      <div className="admin-container">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="sidebar-overlay" 
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <AdminSidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={closeSidebar}
          onToggleCollapse={toggleSidebarCollapse}
        />

        {/* Main Content */}
        <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
          <div className="admin-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;