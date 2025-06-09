import { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Eye, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { articlesApi, galleryApi, healthDeclarationsApi } from '../../services/api';
import Spinner from '../ui/Spinner';
import './AdminStats.css';

const StatsPage = () => {
  const [dateRange, setDateRange] = useState('30'); // Last 30 days
  const [refreshing, setRefreshing] = useState(false);

  // Fetch all stats
  const { data: articlesStats, isLoading: articlesLoading, refetch: refetchArticles } = useQuery(
    'articlesStats',
    articlesApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: galleryStats, isLoading: galleryLoading, refetch: refetchGallery } = useQuery(
    'galleryStats',
    galleryApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const { data: declarationsStats, isLoading: declarationsLoading, refetch: refetchDeclarations } = useQuery(
    'declarationsStats',
    healthDeclarationsApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const isLoading = articlesLoading || galleryLoading || declarationsLoading;

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      refetchArticles(),
      refetchGallery(),
      refetchDeclarations()
    ]);
    setRefreshing(false);
  };

  const handleExport = () => {
    // Mock export functionality
    const data = {
      articles: articlesStats,
      gallery: galleryStats,
      declarations: declarationsStats,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinic-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Main stats cards
  const mainStats = [
    {
      title: 'סה"כ מאמרים',
      value: articlesStats?.total || 0,
      subtitle: `${articlesStats?.published || 0} פורסמו`,
      icon: <FileText size={24} />,
      color: 'primary',
      trend: '+12%'
    },
    {
      title: 'צפיות במאמרים',
      value: (articlesStats?.totalViews || 0).toLocaleString(),
      subtitle: 'צפיות כוללות',
      icon: <Eye size={24} />,
      color: 'success',
      trend: '+28%'
    },
    {
      title: 'תמונות בגלריה',
      value: galleryStats?.total || 0,
      subtitle: `${galleryStats?.visible || 0} מוצגות`,
      icon: <BarChart3 size={24} />,
      color: 'info',
      trend: '+5%'
    },
    {
      title: 'הצהרות בריאות',
      value: declarationsStats?.total || 0,
      subtitle: `${declarationsStats?.thisMonth || 0} החודש`,
      icon: <Users size={24} />,
      color: 'warning',
      trend: '+15%'
    }
  ];

  // Weekly activity data (mock)
  const weeklyActivity = [
    { day: 'ראשון', articles: 3, declarations: 8, gallery: 2 },
    { day: 'שני', articles: 5, declarations: 12, gallery: 1 },
    { day: 'שלישי', articles: 2, declarations: 15, gallery: 4 },
    { day: 'רביעי', articles: 7, declarations: 10, gallery: 3 },
    { day: 'חמישי', articles: 4, declarations: 18, gallery: 5 },
    { day: 'שישי', articles: 1, declarations: 6, gallery: 1 },
    { day: 'שבת', articles: 0, declarations: 2, gallery: 0 }
  ];

  if (isLoading) {
    return (
      <div className="stats-page">
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען סטטיסטיקות...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-page">
      {/* Page Header */}
      <div className="stats-header">
        <div className="header-content">
          <h1>סטטיסטיקות ודוחות</h1>
          <p>מבט כללי על פעילות הקליניקה</p>
        </div>
        
        <div className="header-actions">
          <div className="date-filter">
            <Filter size={16} />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="7">7 ימים אחרונים</option>
              <option value="30">30 ימים אחרונים</option>
              <option value="90">3 חודשים אחרונים</option>
              <option value="365">שנה אחרונה</option>
            </select>
          </div>
          
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={16} className={refreshing ? 'spinning' : ''} />
            רענן
          </Button>
          
          <Button variant="primary" onClick={handleExport}>
            <Download size={16} />
            יצוא נתונים
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="main-stats-grid">
        {mainStats.map((stat, index) => (
          <Card key={index} className={`stat-card stat-card--${stat.color}`}>
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-trend positive">
                <TrendingUp size={14} />
                {stat.trend}
              </div>
            </div>
            
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-subtitle">{stat.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-grid">
          {/* Weekly Activity Chart */}
          <Card className="chart-card">
            <div className="chart-header">
              <h3>פעילות שבועית</h3>
              <p>מאמרים, הצהרות ותמונות</p>
            </div>
            
            <div className="chart-container">
              <div className="simple-bar-chart">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="bar-group">
                    <div className="bars">
                      <div 
                        className="bar bar--articles" 
                        style={{ height: `${(day.articles / 10) * 100}%` }}
                        title={`מאמרים: ${day.articles}`}
                      ></div>
                      <div 
                        className="bar bar--declarations" 
                        style={{ height: `${(day.declarations / 20) * 100}%` }}
                        title={`הצהרות: ${day.declarations}`}
                      ></div>
                      <div 
                        className="bar bar--gallery" 
                        style={{ height: `${(day.gallery / 5) * 100}%` }}
                        title={`תמונות: ${day.gallery}`}
                      ></div>
                    </div>
                    <span className="bar-label">{day.day}</span>
                  </div>
                ))}
              </div>
              
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color legend--articles"></span>
                  מאמרים
                </div>
                <div className="legend-item">
                  <span className="legend-color legend--declarations"></span>
                  הצהרות בריאות
                </div>
                <div className="legend-item">
                  <span className="legend-color legend--gallery"></span>
                  תמונות גלריה
                </div>
              </div>
            </div>
          </Card>

          {/* Popular Articles */}
          <Card className="chart-card">
            <div className="chart-header">
              <h3>מאמרים פופולריים</h3>
              <p>לפי מספר צפיות</p>
            </div>
            
            <div className="popular-list">
              {articlesStats?.popularArticles?.map((article, index) => (
                <div key={article._id} className="popular-item">
                  <div className="item-rank">#{index + 1}</div>
                  <div className="item-content">
                    <h4>{article.title}</h4>
                    <p>{article.views} צפיות</p>
                  </div>
                  <div className="item-progress">
                    <div 
                      className="progress-bar"
                      style={{ 
                        width: `${(article.views / Math.max(...(articlesStats?.popularArticles?.map(a => a.views) || [1]))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              )) || (
                <div className="empty-state">
                  <p>אין נתונים זמינים</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="additional-stats">
          <Card className="insights-card">
            <div className="insights-header">
              <Calendar size={24} />
              <div>
                <h3>תובנות מהחודש</h3>
                <p>ניתוח מגמות ודפוסי שימוש</p>
              </div>
            </div>
            
            <div className="insights-content">
              <div className="insight-item">
                <h4>יום הכי פעיל השבוע</h4>
                <p>יום חמישי - עם {weeklyActivity.find(d => d.day === 'חמישי')?.declarations || 0} הצהרות בריאות</p>
              </div>
              
              <div className="insight-item">
                <h4>קטגוריה פופולרית בגלריה</h4>
                <p>תמונות טיפולים - {Math.round((galleryStats?.visible || 0) * 0.4)} תמונות</p>
              </div>
              
              <div className="insight-item">
                <h4>שעת השיא להצהרות</h4>
                <p>בין 14:00-16:00 - 35% מכלל ההצהרות</p>
              </div>
              
              <div className="insight-item">
                <h4>מגמת צמיחה</h4>
                <p>עלייה של 23% בפעילות בחודש האחרון</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;