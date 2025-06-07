import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';

import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import ArticlesManager from '../components/admin/ArticlesManager';
import GalleryManager from '../components/admin/GalleryManager';
import HealthDeclarations from '../components/admin/HealthDeclarations';

// Import all the CSS files
import '../styles/global.css';
import '../components/admin/AdminDashboard.css';
import '../pages/AdminPage.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AdminPage = () => {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="admin-page">
        {/* Mobile Sidebar Toggle */}
        <button 
          className="mobile-sidebar-toggle"
          onClick={toggleMobileSidebar}
          aria-label="פתח תפריט"
        >
          <Menu size={24} />
        </button>

        {/* Mobile Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="mobile-sidebar-overlay"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        <div className="admin-container">
          <AdminSidebar 
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            mobileOpen={mobileSidebarOpen}
            onMobileClose={() => setMobileSidebarOpen(false)}
          />
          
          <main className={`admin-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/articles" element={<ArticlesManager />} />
              <Route path="/gallery" element={<GalleryManager />} />
              <Route path="/declarations" element={<HealthDeclarations />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="/stats" element={<AdminStats />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-left"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Default options for all toasts
            className: '',
            duration: 4000,
            style: {
              background: 'var(--white)',
              color: 'var(--text-primary)',
              border: '1px solid rgba(212, 181, 176, 0.2)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              padding: 'var(--spacing-md) var(--spacing-lg)',
            },
            // Success toast styles
            success: {
              style: {
                borderColor: 'var(--success)',
                background: 'rgba(34, 197, 94, 0.05)',
              },
              iconTheme: {
                primary: 'var(--success)',
                secondary: 'var(--white)',
              },
            },
            // Error toast styles
            error: {
              style: {
                borderColor: 'var(--error)',
                background: 'rgba(239, 68, 68, 0.05)',
              },
              iconTheme: {
                primary: 'var(--error)',
                secondary: 'var(--white)',
              },
            },
            // Loading toast styles
            loading: {
              style: {
                borderColor: 'var(--primary-color)',
                background: 'rgba(212, 181, 176, 0.05)',
              },
              iconTheme: {
                primary: 'var(--primary-color)',
                secondary: 'var(--white)',
              },
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
};

// Placeholder components for routes that aren't fully implemented yet
const AdminSettings = () => (
  <div className="admin-settings">
    <div className="settings-container">
      <div className="settings-header">
        <h1>הגדרות מערכת</h1>
        <p>נהל את הגדרות הקליניקה והמערכת</p>
      </div>
      
      <div className="settings-content">
        <div className="settings-card">
          <h2>הגדרות כלליות</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <label>שם הקליניקה</label>
              <input type="text" defaultValue="קליניקת ליאה גניש" />
            </div>
            <div className="setting-item">
              <label>כתובת</label>
              <input type="text" defaultValue="רחוב הרצל 123, תל אביב" />
            </div>
            <div className="setting-item">
              <label>טלפון</label>
              <input type="tel" defaultValue="050-123-4567" />
            </div>
            <div className="setting-item">
              <label>אימייל</label>
              <input type="email" defaultValue="info@leahgenish.co.il" />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>הגדרות אבטחה</h2>
          <div className="settings-grid">
            <div className="setting-item">
              <label>שינוי סיסמה</label>
              <button className="btn btn--outline">שנה סיסמה</button>
            </div>
            <div className="setting-item">
              <label>אימות דו-שלבי</label>
              <button className="btn btn--outline">הפעל</button>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h2>הגדרות הודעות</h2>
          <div className="settings-checkboxes">
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span>הודעות על הצהרות בריאות חדשות</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span>הודעות על מאמרים חדשים</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" />
              <span>דוח יומי</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminStats = () => (
  <div className="admin-stats">
    <div className="stats-container">
      <div className="stats-header">
        <h1>סטטיסטיקות ודוחות</h1>
        <p>מידע מפורט על הפעילות בקליניקה</p>
      </div>
      
      <div className="stats-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>הצהרות בריאות - מגמות</h3>
            <div className="chart-placeholder">
              <p>גרף מגמות הצהרות בריאות לאורך זמן</p>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>מאמרים פופולריים</h3>
            <div className="chart-placeholder">
              <p>רשימת המאמרים הנצפים ביותר</p>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>גלריה - שימוש</h3>
            <div className="chart-placeholder">
              <p>סטטיסטיקות על השימוש בגלריה</p>
            </div>
          </div>
          
          <div className="stat-card">
            <h3>דוח חודשי</h3>
            <div className="chart-placeholder">
              <p>סיכום פעילות חודשית</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminPage;