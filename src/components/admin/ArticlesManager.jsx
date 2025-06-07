import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Edit, Trash2, Eye, Search, Filter, Calendar, User, BarChart3, FileText, Clock, TrendingUp } from 'lucide-react';
import { articlesApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

const ArticlesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading, error } = useQuery(
    ['admin-articles', page, searchTerm, filterStatus, sortBy],
    () => articlesApi.getAllAdmin({ 
      page, 
      limit: 12, 
      search: searchTerm,
      published: filterStatus === 'all' ? undefined : filterStatus === 'published',
      sortBy 
    }),
    { keepPreviousData: true }
  );

  const { data: statsData } = useQuery(
    'articles-stats',
    articlesApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const deleteMutation = useMutation(articlesApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-articles');
      queryClient.invalidateQueries('articles-stats');
      toast.success('המאמר נמחק בהצלחה');
    },
    onError: (error) => {
      toast.error(error.message || 'שגיאה במחיקת המאמר');
    }
  });

  const handleDelete = async (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המאמר?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setShowForm(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (isPublished) => ({
    className: isPublished ? 'status-published' : 'status-draft',
    text: isPublished ? 'פורסם' : 'טיוטה',
    icon: isPublished ? <TrendingUp size={14} /> : <Clock size={14} />
  });

  if (isLoading) {
    return (
      <div className="articles-manager">
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען מאמרים...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-manager">
        <Card className="error-card">
          <h2>שגיאה בטעינת המאמרים</h2>
          <p>{error.message}</p>
          <Button onClick={() => window.location.reload()}>רענן דף</Button>
        </Card>
      </div>
    );
  }

  const articles = articlesData?.articles || [];
  const pagination = articlesData?.pagination || {};

  return (
    <div className="articles-manager">
      {/* Header with Stats */}
      <div className="manager-header">
        <div className="header-content">
          <div className="header-info">
            <h1>
              <FileText size={32} />
              ניהול מאמרים
            </h1>
            <p>נהל את תוכן האתר ומאמרי הבלוג</p>
          </div>
          <Button variant="primary" onClick={handleNewArticle} className="header-cta">
            <Plus size={20} />
            מאמר חדש
          </Button>
        </div>

        {/* Stats Cards */}
        {statsData && (
          <div className="stats-overview">
            <div className="stat-card-mini">
              <div className="stat-icon">
                <FileText size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.total}</div>
                <div className="stat-label">סה"כ מאמרים</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-icon success">
                <TrendingUp size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.published}</div>
                <div className="stat-label">פורסמו</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-icon warning">
                <Clock size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.drafts}</div>
                <div className="stat-label">טיוטות</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-icon info">
                <Eye size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.totalViews}</div>
                <div className="stat-label">צפיות כוללות</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <Card className="filters-card">
        <div className="filters-container">
          <div className="search-section">
            <div className="search-input-group">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="חיפוש מאמרים לפי כותרת או תוכן..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="filters-section">
            <div className="filter-group">
              <Filter size={18} />
              <label>סטטוס:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">הכל</option>
                <option value="published">פורסם</option>
                <option value="draft">טיוטה</option>
              </select>
            </div>

            <div className="filter-group">
              <BarChart3 size={18} />
              <label>מיון:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">החדשים ביותר</option>
                <option value="oldest">הישנים ביותר</option>
                <option value="mostViews">הכי נצפים</option>
                <option value="title">לפי כותרת</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Articles Grid */}
      <div className="articles-grid">
        {articles.map((article) => {
          const status = getStatusBadge(article.isPublished);
          return (
            <Card key={article._id} className="article-card" hover>
              <div className="article-image-container">
                {article.image ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${article.image}`}
                    alt={article.title}
                    className="article-image"
                  />
                ) : (
                  <div className="article-placeholder">
                    <FileText size={48} />
                  </div>
                )}
                <div className="article-overlay">
                  <div className={`status-badge ${status.className}`}>
                    {status.icon}
                    {status.text}
                  </div>
                </div>
              </div>

              <div className="article-content">
                <div className="article-header">
                  <h3 className="article-title" title={article.title}>
                    {article.title}
                  </h3>
                  <div className="article-views">
                    <Eye size={14} />
                    {article.views}
                  </div>
                </div>

                <p className="article-excerpt">
                  {article.content.substring(0, 120)}...
                </p>

                <div className="article-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span>{formatDate(article.createdAt)}</span>
                  </div>
                  {article.author && (
                    <div className="meta-item">
                      <User size={14} />
                      <span>{article.author.username}</span>
                    </div>
                  )}
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="article-tags">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="tag-more">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="article-actions">
                  <Button variant="outline" size="small" className="action-btn view">
                    <Eye size={14} />
                    תצוגה
                  </Button>
                  <Button 
                    variant="outline" 
                    size="small" 
                    className="action-btn edit"
                    onClick={() => handleEdit(article)}
                  >
                    <Edit size={14} />
                    עריכה
                  </Button>
                  <Button 
                    variant="danger" 
                    size="small" 
                    className="action-btn delete"
                    onClick={() => handleDelete(article._id)}
                    disabled={deleteMutation.isLoading}
                  >
                    <Trash2 size={14} />
                    מחיקה
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {articles.length === 0 && !isLoading && (
        <Card className="empty-state">
          <div className="empty-content">
            <FileText size={64} />
            <h3>אין מאמרים להצגה</h3>
            <p>
              {searchTerm || filterStatus !== 'all' 
                ? 'לא נמצאו מאמרים התואמים לחיפוש'
                : 'עדיין לא נוצרו מאמרים במערכת'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button variant="primary" onClick={handleNewArticle}>
                <Plus size={16} />
                צור מאמר ראשון
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="pagination-btn"
          >
            הקודם
          </Button>
          
          <div className="pagination-info">
            <span className="current-page">{page}</span>
            <span className="separator">מתוך</span>
            <span className="total-pages">{pagination.pages}</span>
          </div>
          
          <Button
            variant="outline"
            disabled={page >= pagination.pages}
            onClick={() => setPage(page + 1)}
            className="pagination-btn"
          >
            הבא
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesManager;