import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import ArticlesManager from '../components/admin/ArticlesManager';
import GalleryManager from '../components/admin/GalleryManager';
import HealthDeclarations from '../components/admin/HealthDeclarations';

// Import styles
import './AdminPage.css';
import '../components/admin/AdminSidebar.css';
import '../components/admin/AdminDashboard.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="admin-container">
        <AdminSidebar />
        <main className="admin-main">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="declarations" element={<HealthDeclarations />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;