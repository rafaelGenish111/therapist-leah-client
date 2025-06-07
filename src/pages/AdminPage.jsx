// src/pages/AdminPage.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../components/admin/AdminLayout';
import Spinner from '../components/ui/Spinner';
import './AdminPage.css';

const AdminPage = () => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="loading-container">
          <Spinner size="large" color="primary" />
          <h2>מאמת הרשאות...</h2>
          <p>אנא המתן בזמן שאנו מוודאים את הרשאות הגישה שלך</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Show admin layout if authenticated
  return (
    <div className="admin-page">
      <AdminLayout />
    </div>
  );
};

export default AdminPage;