import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  PieChart, 
  Eye, 
  FileText, 
  Mail, 
  Heart,
  BarChart3,
  Activity,
  Monitor,
  Smartphone,
  Calendar
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const WebsiteAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with real API calls
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalVisits: 1567,
      uniqueVisitors: 892,
      averageTime: '3:45',
      bounceRate: 34,
      pageViews: 4231
    },
    trends: {
      visitsChange: 12,
      visitorsChange: 8,
      timeChange: 0,
      bounceChange: -5
    },
    topPages: [
      { page: 'עמוד הבית', views: 1245, percentage: 29.4 },
      { page: 'אודות', views: 567, percentage: 13.4 },
      { page: 'טיפולים', views: 489, percentage: 11.6 },
      { page: 'יצירת קשר', views: 378, percentage: 8.9 },
      { page: 'מאמרים', views: 298, percentage: 7.0 }
    ],
    deviceStats: {
      desktop: 58,
      mobile: 35,
      tablet: 7
    },
    recentActivity: [
      { 
        type: 'page_view', 
        page: 'עמוד הבית', 
        count: 45, 
        time: '10:30',
        icon: <Eye size={16} />
      },
      { 
        type: 'article_view', 
        page: 'היתרונות של עיסוי שוודי', 
        count: 23, 
        time: '09:15',
        icon: <FileText size={16} />
      },
      { 
        type: 'contact_form', 
        page: 'יצירת קשר', 
        count: 8, 
        time: '14:22',
        icon: <Mail size={16} />
      },
      { 
        type: 'health_declaration', 
        page: 'הצהרת בריאות', 
        count: 5, 
        time: '16:45',
        icon: <Heart size={16} />
      }
    ],
    hourlyData: [
      { hour: '00:00', visits: 12 },
      { hour: '01:00', visits: 8 },
      { hour: '02:00', visits: 5 },
      { hour: '03:00', visits: 3 },
      { hour: '04:00', visits: 4 },
      { hour: '05:00', visits: 7 },
      { hour: '06:00', visits: 15 },
      { hour: '07:00', visits: 28 },
      { hour: '08:00', visits: 45 },
      { hour: '09:00', visits: 67 },
      { hour: '10:00', visits: 89 },
      { hour: '11:00', visits: 78 },
      { hour: '12:00', visits: 65 },
      { hour: '13:00', visits: 72 },
      { hour: '14:00', visits: 85 },
      { hour: '15:00', visits: 92 },
      { hour: '16:00', visits: 88 },
      { hour: '17:00', visits: 76 },
      { hour: '18:00', visits: 58 },
      { hour: '19:00', visits: 45 },
      { hour: '20:00', visits: 32 },
      { hour: '21:00', visits: 25 },
      { hour: '22:00', visits: 18 },
      { hour: '23:00', visits: 14 }
    ]
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [timeFilter]);

  const handleTimeFilterChange = (filter) => {
    setIsLoading(true);
    setTimeFilter(filter);
    // Here you would fetch new data based on the filter
  };

  const formatTrend = (value) => {
    const sign = value > 0 ? '+' : '';
    const className = value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral';
    return (
      <span className={`stat-change ${className}`}>
        {sign}{value}% מ{timeFilter === 'today' ? 'אתמול' : timeFilter === 'week' ? 'השבוע הקודם' : 'החודש הקודם'}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="analytics-manager">
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען נתוני אנליטיקה...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-manager">
      <div className="manager-header">
        <div>
          <h1>אנליטיקה ופעילות</h1>
          <p>מעקב אחר ביצועי האתר ופעילות המשתמשים</p>
        </div>
        <div className="time-filters">
          <Button 
            variant={timeFilter === 'today' ? 'primary' : 'outline'} 
            size="small"
            onClick={() => handleTimeFilterChange('today')}
          >
            היום
          </Button>
          <Button 
            variant={timeFilter === 'week' ? 'primary' : 'outline'} 
            size="small"
            onClick={() => handleTimeFilterChange('week')}
          >
            השבוע
          </Button>
          <Button 
            variant={timeFilter === 'month' ? 'primary' : 'outline'} 
            size="small"
            onClick={() => handleTimeFilterChange('month')}
          >
            החודש
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        <Card className="stat-card stat-card--primary">
          <div className="stat-header">
            <div className="stat-icon"><TrendingUp size={24} /></div>
            <h3>כניסות לאתר</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{analyticsData.overview.totalVisits.toLocaleString()}</div>
            {formatTrend(analyticsData.trends.visitsChange)}
          </div>
        </Card>

        <Card className="stat-card stat-card--success">
          <div className="stat-header">
            <div className="stat-icon"><Users size={24} /></div>
            <h3>מבקרים ייחודיים</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{analyticsData.overview.uniqueVisitors.toLocaleString()}</div>
            {formatTrend(analyticsData.trends.visitorsChange)}
          </div>
        </Card>

        <Card className="stat-card stat-card--info">
          <div className="stat-header">
            <div className="stat-icon"><Clock size={24} /></div>
            <h3>זמן ממוצע באתר</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{analyticsData.overview.averageTime}</div>
            {formatTrend(analyticsData.trends.timeChange)}
          </div>
        </Card>

        <Card className="stat-card stat-card--warning">
          <div className="stat-header">
            <div className="stat-icon"><PieChart size={24} /></div>
            <h3>שיעור יציאה</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{analyticsData.overview.bounceRate}%</div>
            {formatTrend(analyticsData.trends.bounceChange)}
          </div>
        </Card>
      </div>

      <div className="analytics-grid">
        {/* Traffic Chart */}
        <Card className="traffic-chart-card">
          <div className="card-header">
            <h3>תנועה לפי שעות</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color primary"></span>
                ביקורים
              </span>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-placeholder">
              <BarChart3 size={48} className="chart-icon" />
              <p>גרף תנועה יוצג כאן</p>
              {/* Simple bar chart representation */}
              <div className="simple-chart">
                {analyticsData.hourlyData.slice(6, 23).map((data, index) => (
                  <div key={data.hour} className="chart-bar">
                    <div 
                      className="bar-fill"
                      style={{ height: `${(data.visits / 100) * 100}%` }}
                      title={`${data.hour}: ${data.visits} ביקורים`}
                    ></div>
                    <span className="bar-label">{data.hour.slice(0, 2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Top Pages */}
        <Card className="top-pages-card">
          <div className="card-header">
            <h3>עמודים פופולריים</h3>
          </div>
          <div className="top-pages-list">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="page-item">
                <div className="page-info">
                  <h4>{page.page}</h4>
                  <div className="page-progress">
                    <div 
                      className="progress-bar"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="page-stats">
                  <span className="views">{page.views.toLocaleString()}</span>
                  <span className="percentage">{page.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Device Stats */}
        <Card className="device-stats-card">
          <div className="card-header">
            <h3>התפלגות מכשירים</h3>
          </div>
          <div className="device-stats">
            <div className="device-item">
              <div className="device-icon">
                <Monitor size={24} />
              </div>
              <div className="device-info">
                <h4>מחשב</h4>
                <div className="device-progress">
                  <div 
                    className="progress-bar desktop"
                    style={{ width: `${analyticsData.deviceStats.desktop}%` }}
                  ></div>
                </div>
                <span className="device-percentage">{analyticsData.deviceStats.desktop}%</span>
              </div>
            </div>

            <div className="device-item">
              <div className="device-icon">
                <Smartphone size={24} />
              </div>
              <div className="device-info">
                <h4>נייד</h4>
                <div className="device-progress">
                  <div 
                    className="progress-bar mobile"
                    style={{ width: `${analyticsData.deviceStats.mobile}%` }}
                  ></div>
                </div>
                <span className="device-percentage">{analyticsData.deviceStats.mobile}%</span>
              </div>
            </div>

            <div className="device-item">
              <div className="device-icon">
                <Monitor size={20} />
              </div>
              <div className="device-info">
                <h4>טאבלט</h4>
                <div className="device-progress">
                  <div 
                    className="progress-bar tablet"
                    style={{ width: `${analyticsData.deviceStats.tablet}%` }}
                  ></div>
                </div>
                <span className="device-percentage">{analyticsData.deviceStats.tablet}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="recent-activity-card">
          <div className="card-header">
            <h3>פעילות אחרונה</h3>
            <Button variant="outline" size="small">
              <Activity size={14} />
              צפייה בזמן אמת
            </Button>
          </div>
          <div className="activity-list">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <div className="activity-description">{activity.page}</div>
                  <div className="activity-count">{activity.count} פעולות</div>
                </div>
                <div className="activity-time">
                  <Clock size={12} />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="export-options-card">
        <div className="card-header">
          <h3>ייצוא נתונים</h3>
          <p>הורד דוחות מפורטים לניתוח נוסף</p>
        </div>
        <div className="export-actions">
          <Button variant="outline">
            <Calendar size={16} />
            דוח שבועי
          </Button>
          <Button variant="outline">
            <BarChart3 size={16} />
            דוח חודשי
          </Button>
          <Button variant="primary">
            <TrendingUp size={16} />
            דוח מפורט
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WebsiteAnalytics;