import { useQuery } from 'react-query';
import { FileText, Image, Heart, Eye, Plus, Download, BarChart, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { articlesApi, galleryApi, healthDeclarationsApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Get current time and date for welcome message
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'בוקר טוב';
    if (hour < 18) return 'שלום';
    return 'ערב טוב';
  };

  // Fetch stats from different APIs
  const { data: articlesStats, isLoading: articlesLoading } = useQuery(
    'articlesStats',
    articlesApi.getStats,
    { 
      staleTime: 5 * 60 * 1000,
      onError: () => {
        // Handle error silently or provide mock data
      }
    }
  );

  const { data: galleryStats, isLoading: galleryLoading } = useQuery(
    'galleryStats',
    galleryApi.getStats,
    { 
      staleTime: 5 * 60 * 1000,
      onError: () => {
        // Handle error silently or provide mock data
      }
    }
  );

  const { data: declarationsStats, isLoading: declarationsLoading } = useQuery(
    'declarationsStats',
    healthDeclarationsApi.getStats,
    { 
      staleTime: 5 * 60 * 1000,
      onError: () => {
        // Handle error silently or provide mock data
      }
    }
  );

  const isLoading = articlesLoading || galleryLoading || declarationsLoading;

  // Mock data for when API is not available
  const mockStats = {
    articles: { published: 20, total: 25, totalViews: 1245, popularArticles: [] },
    gallery: { visible: 135, total: 150, recentImages: [] },
    declarations: { thisWeek: 12, total: 89 }
  };

  const statsData = {
    articles: articlesStats || mockStats.articles,
    gallery: galleryStats || mockStats.gallery,
    declarations: declarationsStats || mockStats.declarations
  };

  const statsCards = [
    {
      title: 'מאמרים',
      value: statsData.articles.published,
      subtitle: `סה"כ ${statsData.articles.total} מאמרים`,
      icon: <FileText size={24} />,
      color: 'primary'
    },
    {
      title: 'צפיות במאמרים',
      value: statsData.articles.totalViews,
      subtitle: 'צפיות כוללות',
      icon: <Eye size={24} />,
      color: 'success'
    },
    {
      title: 'תמונות בגלריה',
      value: statsData.gallery.visible,
      subtitle: `סה"כ ${statsData.gallery.total} תמונות`,
      icon: <Image size={24} />,
      color: 'info'
    },
    {
      title: 'הצהרות בריאות',
      value: statsData.declarations.thisWeek,
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
      action: () => window.location.href = '/admin/articles',
      variant: 'primary'
    },
    {
      title: 'העלאת תמונות',
      description: 'הוסף תמונות לגלריה',
      icon: <Image size={20} />,
      action: () => window.location.href = '/admin/gallery',
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
      action: () => window.location.href = '/admin/stats',
      variant: 'outline'
    }
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      direction: 'rtl'
    }}>
      {/* Welcome Section */}
      <div style={{
        background: 'linear-gradient(135deg, #D4B5B0 0%, #B89C94 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '1rem',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          fontWeight: '600'
        }}>
          {getCurrentGreeting()}, {user?.username}! 👋
        </h1>
        <p style={{
          fontSize: '1.125rem',
          margin: 0,
          opacity: 0.9
        }}>
          ברוכה הבאה לאזור הניהול של הקליניקה
        </p>
      </div>

      {isLoading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
          textAlign: 'center'
        }}>
          <Spinner size="large" />
          <p style={{ marginTop: '1rem', color: '#8B6F66' }}>טוען נתונים...</p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {statsCards.map((stat, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid #E7D1CD',
                borderLeft: `4px solid ${
                  stat.color === 'primary' ? '#D4B5B0' :
                  stat.color === 'success' ? '#22C55E' :
                  stat.color === 'info' ? '#3B82F6' :
                  '#F59E0B'
                }`,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    color: stat.color === 'primary' ? '#D4B5B0' :
                           stat.color === 'success' ? '#22C55E' :
                           stat.color === 'info' ? '#3B82F6' :
                           '#F59E0B'
                  }}>
                    {stat.icon}
                  </div>
                  <h3 style={{
                    margin: 0,
                    fontSize: '1rem',
                    color: '#8B6F66',
                    fontWeight: '500'
                  }}>
                    {stat.title}
                  </h3>
                </div>
                <div>
                  <div style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#4A3429',
                    marginBottom: '0.25rem',
                    lineHeight: 1
                  }}>
                    {stat.value.toLocaleString()}
                  </div>
                  <div style={{
                    color: '#B89C94',
                    fontSize: '0.875rem'
                  }}>
                    {stat.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1rem',
            border: '1px solid #E7D1CD',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              marginBottom: '2rem',
              color: '#4A3429',
              fontSize: '1.5rem'
            }}>
              פעולות מהירות
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {quickActions.map((action, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  border: '1px solid #E7D1CD',
                  borderRadius: '0.75rem',
                  transition: 'all 0.15s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#D4B5B0';
                  e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#E7D1CD';
                  e.target.style.boxShadow = 'none';
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{
                      color: '#D4B5B0',
                      background: '#F5E6E3',
                      padding: '0.5rem',
                      borderRadius: '0.5rem'
                    }}>
                      {action.icon}
                    </div>
                    <div>
                      <h4 style={{
                        margin: '0 0 0.25rem 0',
                        fontSize: '1rem',
                        color: '#4A3429'
                      }}>
                        {action.title}
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '0.875rem',
                        color: '#8B6F66'
                      }}>
                        {action.description}
                      </p>
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
          </div>

          {/* Recent Activity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #E7D1CD'
            }}>
              <h3 style={{
                marginBottom: '1.5rem',
                color: '#4A3429',
                fontSize: '1.25rem'
              }}>
                מאמרים פופולריים
              </h3>
              {statsData.articles.popularArticles?.length > 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {statsData.articles.popularArticles.map((article, index) => (
                    <div key={article._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      border: '1px solid #F0E4E1',
                      borderRadius: '0.5rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          margin: '0 0 0.25rem 0',
                          fontSize: '0.875rem',
                          color: '#4A3429'
                        }}>
                          {article.title}
                        </h4>
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#8B6F66'
                        }}>
                          {article.views} צפיות
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#B89C94'
                      }}>
                        {new Date(article.createdAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  textAlign: 'center',
                  color: '#8B6F66',
                  fontStyle: 'italic',
                  padding: '2rem'
                }}>
                  אין מאמרים עדיין
                </p>
              )}
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #E7D1CD'
            }}>
              <h3 style={{
                marginBottom: '1.5rem',
                color: '#4A3429',
                fontSize: '1.25rem'
              }}>
                תמונות אחרונות
              </h3>
              {statsData.gallery.recentImages?.length > 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  {statsData.gallery.recentImages.map((image, index) => (
                    <div key={image._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1rem',
                      border: '1px solid #F0E4E1',
                      borderRadius: '0.5rem'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          margin: '0 0 0.25rem 0',
                          fontSize: '0.875rem',
                          color: '#4A3429'
                        }}>
                          {image.originalName}
                        </h4>
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#8B6F66'
                        }}>
                          {image.category}
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#B89C94'
                      }}>
                        {new Date(image.uploadedAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  textAlign: 'center',
                  color: '#8B6F66',
                  fontStyle: 'italic',
                  padding: '2rem'
                }}>
                  אין תמונות עדיין
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;