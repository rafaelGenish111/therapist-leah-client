import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '../admin/AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Create a query client for this admin layout
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
      },
    },
  });

  // Close mobile sidebar when window resizes
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
    <QueryClientProvider client={queryClient}>
      <div className="admin-layout">
        <AdminSidebar 
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onMobileToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />
        
        {/* Mobile Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="mobile-sidebar-overlay"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="admin-content">
            <Outlet />
          </div>
        </main>

        {/* Toast Notifications */}
        <Toaster
          position="top-left"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--white)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              fontSize: 'var(--font-size-sm)',
            },
            success: {
              iconTheme: {
                primary: 'var(--success)',
                secondary: 'var(--white)',
              },
            },
            error: {
              iconTheme: {
                primary: 'var(--error)',
                secondary: 'var(--white)',
              },
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
};

export default AdminLayout;