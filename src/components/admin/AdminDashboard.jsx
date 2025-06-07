// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Image, 
  Heart, 
  Eye, 
  Plus, 
  Download, 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from './components/StatsCard';
import { mockStats } from '../../services/mockData';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // סימולציה של טעינת נתונים
    const loadStats = async () => {
      try {
        setLoading(true);
        // כאן יהיה קריאה אמיתית ל-API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const quickActions = [
    {
      title: 'כתיבת מאמר חדש',
      description: 'הוסף מאמר חדש לאתר',
      icon: <Plus size={20} />,
      action: () => alert('פתיחת עורך מאמרים...'),
      variant: 'primary',
      color: 'blue'
    },
    {
      title: 'העלאת תמונות',
      description: 'הוסף תמונות לגלריה',
      icon: <Image size={20} />,
      action: () => alert('פתיחת מנהל גלריה...'),
      variant: 'secondary',
      color: 'green'
    },
    {
      title: 'יצוא נתונים',
      description: 'הורד דוח של הצהרות בריאות',
      icon: <Download size={20} />,
      action: () => alert('מייצא נתונים...'),
      variant: 'outline',
      color: 'purple'
    },
    {
      title: 'צפיה בדוחות',
      description: 'סטטיסטיקות מפורטות',
      icon: <BarChart3 size={20} />,
      action: () => alert('פתיחת דוחות...'),
      variant: 'outline',
      color: 'orange'
    }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'בוקר טוב';
    if (hour < 17) return 'צהריים טובים';
    if (hour < 21) return 'ערב טוב';
    return 'לילה טוב';
  };

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>{getGreeting()}, {user?.username}! 👋</h1>
          <p>ברוכה הבאה לאזור הניהול של הקליניקה</p>
          <div className="last-login">
            <Clock size={16} />
            <span>כניסה אחרונה: {new Date(user?.lastLogin).toLocaleDateString('he-IL')}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn--primary">
            <Plus size={16} />
            פעולה מהירה
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatsCard
          title="מאמרים"
          value={stats.articles.published}
          subtitle={`מתוך ${stats.articles.total} כוללם`}
          icon={<FileText size={24} />}
          color="primary"
          trend={{ value: 12, isPositive: true }}
          onClick={() => alert('מעבר לניהול מאמרים')}
        />
        
        <StatsCard
          title="צפיות במאמרים"
          value={stats.articles.totalViews.toLocaleString()}
          subtitle="צפיות כוללות"
          icon={<Eye size={24} />}
          color="success"
          trend={{ value: 8, isPositive: true }}
          onClick={() => alert('מעבר לסטטיסטיקות')}
        />
        
        <StatsCard
          title="תמונות בגלריה"
          value={stats.gallery.visible}
          subtitle={`מתוך ${stats.gallery.total} תמונות`}
          icon={<Image size={24} />}
          color="info"
          trend={{ value: 3, isPositive: false }}
          onClick={() => alert('מעבר לגלריה')}
        />
        
        <StatsCard
          title="הצהרות השבוע"
          value={stats.declarations.thisWeek}
          subtitle={`מתוך ${stats.declarations.total} כוללם`}
          icon={<Heart size={24} />}
          color="warning"
          trend={{ value: 15, isPositive: true }}
          onClick={() => alert('מעבר להצהרות')}
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>פעולות מהירות</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className={`quick-action-item quick-action--${action.color}`}>
              <div className="action-content">
                <div className="action-icon">{action.icon}</div>
                <div className="action-text">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
              </div>
              <button 
                className={`btn btn--${action.variant} btn--small`}
                onClick={action.action}
              >
                בצע
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Dashboard */}
      <div className="dashboard-grid">
        {/* Popular Articles */}
        <div className="dashboard-card recent-articles">
          <div className="card-header">
            <h3>מאמרים פופולריים</h3>
            <button className="btn btn--outline btn--small">
              צפה בכל המאמרים
            </button>
          </div>
          
          {stats.articles.popularArticles && stats.articles.popularArticles.length > 0 ? (
            <div className="articles-list">
              {stats.articles.popularArticles.map((article) => (
                <div key={article._id} className="article-item">
                  <div className="article-info">
                    <h4>{article.title}</h4>
                    <div className="article-meta">
                      <span className="views">
                        <Eye size={14} />
                        {article.views} צפיות
                      </span>
                      <span className="date">
                        <Calendar size={14} />
                        {new Date(article.createdAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  </div>
                  <button className="btn btn--outline btn--small">
                    עריכה
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FileText size={48} />
              <p>אין מאמרים עדיין</p>
              <button className="btn btn--primary btn--small">
                צור מאמר ראשון
              </button>
            </div>
          )}
        </div>

        {/* Recent Images */}
        <div className="dashboard-card recent-images">
          <div className="card-header">
            <h3>תמונות אחרונות</h3>
            <button className="btn btn--outline btn--small">
              צפה בגלריה
            </button>
          </div>
          
          {stats.gallery.recentImages && stats.gallery.recentImages.length > 0 ? (
            <div className="images-list">
              {stats.gallery.recentImages.map((image) => (
                <div key={image._id} className="image-item">
                  <div className="image-thumbnail">
                    <Image size={24} />
                  </div>
                  <div className="image-info">
                    <h4>{image.originalName}</h4>
                    <div className="image-meta">
                      <span className="category">{image.category}</span>
                      <span className="date">
                        {new Date(image.uploadedAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Image size={48} />
              <p>אין תמונות עדיין</p>
              <button className="btn btn--primary btn--small">
                העלה תמונה ראשונה
              </button>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="system-status">
        <div className="status-card">
          <div className="status-header">
            <h3>סטטוס המערכת</h3>
            <div className="status-indicator status--healthy">
              <div className="status-dot"></div>
              <span>תקין</span>
            </div>
          </div>
          <div className="status-details">
            <div className="status-item">
              <span>שרת:</span>
              <span className="status-value">פעיל</span>
            </div>
            <div className="status-item">
              <span>בסיס נתונים:</span>
              <span className="status-value">מחובר</span>
            </div>
            <div className="status-item">
              <span>נפח אחסון:</span>
              <span className="status-value">{stats.gallery.totalSize} MB בשימוש</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;