import { useState } from 'react';
import { useQuery } from 'react-query';
import { FileText, Image, Heart, Eye, Plus, Download, BarChart, Bug } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { articlesApi, galleryApi, healthDeclarationsApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import DebugUpload from './DebugUpload';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [showDebug, setShowDebug] = useState(false);

  // Fetch stats from different APIs
  const { data: articlesStats, isLoading: articlesLoading } = useQuery(
    'articlesStats',
    articlesApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: galleryStats, isLoading: galleryLoading } = useQuery(
    'galleryStats',
    galleryApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: declarationsStats, isLoading: declarationsLoading } = useQuery(
    'declarationsStats',
    healthDeclarationsApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const isLoading = articlesLoading || galleryLoading || declarationsLoading;

  const statsCards = [
    {
      title: 'מאמרים',
      value: articlesStats?.published || 0,
      subtitle: `סה"כ ${articlesStats?.total || 0} מאמרים`,
      icon: <FileText size={24} />,
      color: 'primary'
    },
    {
      title: 'צפיות במאמרים',
      value: articlesStats?.totalViews || 0,
      subtitle: 'צפיות כוללות',
      icon: <Eye size={24} />,
      color: 'success'
    },
    {
      title: 'תמונות בגלריה',
      value: galleryStats?.visible || 0,
      subtitle: `סה"כ ${galleryStats?.total || 0} תמונות`,
      icon: <Image size={24} />,
      color: 'info'
    },
    {
      title: 'הצהרות בריאות',
      value: declarationsStats?.thisWeek || 0,
      subtitle: 'השבוע',
      icon: <Heart size={24} />,
      color: 'warning'
    }
  ];

  const quickActions = [
    {
      title: 'כתיבת מאמר חדש',
      description: 'הוסף מאמר חדש לאתר',
      icon: <Plus size={20} />,
      action: () => console.log('Navigate to new article'),
      variant: 'primary'
    },
    {
      title: 'העלאת תמונות',
      description: 'הוסף תמונות לגלריה',
      icon: <Image size={20} />,
      action: () => console.log('Navigate to gallery upload'),
      variant: 'secondary'
    },
    {
      title: 'יצוא נתונים',
      description: 'הורד דוח של הצהרות בריאות',
      icon: <Download size={20} />,
      action: () => console.log('Export data'),
      variant: 'outline'
    },
    {
      title: 'צפיה בדוחות',
      description: 'סטטיסטיקות מפורטות',
      icon: <BarChart size={20} />,
      action: () => console.log('View reports'),
      variant: 'outline'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>שלום {user?.username}! 👋</h1>
          <p>ברוכה הבאה לאזור הניהול של הקליניקה</p>
        </div>
        <div className="header-actions">
          <Button 
            variant={showDebug ? "danger" : "outline"} 
            onClick={() => setShowDebug(!showDebug)}
          >
            <Bug size={16} />
            {showDebug ? 'סגור Debug' : 'כלי Debug'}
          </Button>
          <Button variant="primary">
            <Plus size={16} />
            פעולה מהירה
          </Button>
        </div>
      </div>

      {/* Debug Panel */}
      {showDebug && <DebugUpload />}

      {isLoading ? (
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען נתונים...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="stats-grid">
            {statsCards.map((stat, index) => (
              <Card key={index} className={`stat-card stat-card--${stat.color}`}>
                <div className="stat-header">
                  <div className="stat-icon">{stat.icon}</div>
                  <h3>{stat.title}</h3>
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value.toLocaleString()}</div>
                  <div className="stat-subtitle">{stat.subtitle}</div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="quick-actions-card">
            <h2>פעולות מהירות</h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <div key={index} className="quick-action-item">
                  <div className="action-content">
                    <div className="action-icon">{action.icon}</div>
                    <div>
                      <h4>{action.title}</h4>
                      <p>{action.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={action.variant} 
                    onClick={action.action}
                    size="small"
                  >
                    בצע
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <div className="dashboard-grid">
            <Card className="recent-articles">
              <h3>מאמרים פופולריים</h3>
              {articlesStats?.popularArticles?.length > 0 ? (
                <div className="articles-list">
                  {articlesStats.popularArticles.map((article, index) => (
                    <div key={article._id} className="article-item">
                      <div className="article-info">
                        <h4>{article.title}</h4>
                        <span className="article-views">
                          {article.views} צפיות
                        </span>
                      </div>
                      <span className="article-date">
                        {new Date(article.createdAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">אין מאמרים עדיין</p>
              )}
            </Card>

            <Card className="recent-images">
              <h3>תמונות אחרונות</h3>
              {galleryStats?.recentImages?.length > 0 ? (
                <div className="images-list">
                  {galleryStats.recentImages.map((image, index) => (
                    <div key={image._id} className="image-item">
                      <div className="image-info">
                        <h4>{image.originalName}</h4>
                        <span className="image-category">{image.category}</span>
                      </div>
                      <span className="image-date">
                        {new Date(image.uploadedAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-state">אין תמונות עדיין</p>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;