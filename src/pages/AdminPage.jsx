import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import './AdminPage.css';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div className="admin-page">
      <div className="admin-container">
        <AdminSidebar />
        
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;