import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { articlesApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import './ArticlesManager.css';

const ArticlesManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [publishedFilter, setPublishedFilter] = useState('all');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading, error } = useQuery(
    ['admin-articles', page, searchTerm, publishedFilter],
    () => articlesApi.getAllAdmin({
      page,
      limit: 10,
      search: searchTerm,
      published: publishedFilter !== 'all' ? publishedFilter : undefined
    }),
    { keepPreviousData: true }
  );

  const deleteMutation = useMutation(articlesApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-articles');
      toast.success('המאמר נמחק בהצלחה');
    },
    onError: (error) => {
      toast.error(error.message || 'שגיאה במחיקת המאמר');
    }
  });

  const handleDelete = async (id, title) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את המאמר "${title}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const handleNewArticle = () => {
    navigate('/admin/articles/new');
  };

  const handleView = (id) => {
    // פתיחה בכרטיסייה חדשה לתצוגת המאמר
    window.open(`/articles/${id}`, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isPublished) => {
    return isPublished ? (
      <span className="status-badge published">פורסם</span>
    ) : (
      <span className="status-badge draft">טיוטה</span>
    );
  };

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
          <Button onClick={() => window.location.reload()}>
            נסה שוב
          </Button>
        </Card>
      </div>
    );
  }

  const articles = articlesData?.articles || [];
  const pagination = articlesData?.pagination || {};

  return (
    <div className="articles-manager">
      <div className="manager-header">
        <div className="header-content">
          <h1>ניהול מאמרים</h1>
          <Button variant="primary" onClick={handleNewArticle}>
            <Plus size={16} />
            מאמר חדש
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="filters-container">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="חיפוש מאמרים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <Filter size={20} />
            <select
              value={publishedFilter}
              onChange={(e) => setPublishedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">כל המאמרים</option>
              <option value="true">פורסמו</option>
              <option value="false">טיוטות</option>
            </select>
          </div>
        </div>
      </Card>

      {articles.length === 0 ? (
        <Card className="empty-state-card">
          <div className="empty-state">
            <h3>אין מאמרים עדיין</h3>
            <p>התחל ביצירת המאמר הראשון שלך</p>
            <Button variant="primary" onClick={handleNewArticle}>
              <Plus size={16} />
              צור מאמר ראשון
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="articles-grid">
            {articles.map((article) => (
              <Card key={article._id} className="article-item">
                <div className="article-header">
                  <div className="article-title-section">
                    <h3 className="article-title">{article.title}</h3>
                    {getStatusBadge(article.isPublished)}
                  </div>

                  {article.image && (
                    <div className="article-thumbnail">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${article.image}`}
                        alt={article.title}
                      />
                    </div>
                  )}
                </div>

                <p className="article-excerpt">
                  {article.content.length > 150
                    ? `${article.content.substring(0, 150)}...`
                    : article.content
                  }
                </p>

                <div className="article-meta">
                  <div className="meta-item">
                    <span className="meta-label">צפיות:</span>
                    <span className="meta-value">{article.views}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">נוצר:</span>
                    <span className="meta-value">{formatDate(article.createdAt)}</span>
                  </div>
                  {article.updatedAt !== article.createdAt && (
                    <div className="meta-item">
                      <span className="meta-label">עודכן:</span>
                      <span className="meta-value">{formatDate(article.updatedAt)}</span>
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
                      <span className="tag more-tags">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="article-actions">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => handleView(article._id)}
                    title="צפה במאמר"
                  >
                    <Eye size={14} />
                    תצוגה
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => handleEdit(article._id)}
                    title="ערוך מאמר"
                  >
                    <Edit size={14} />
                    עריכה
                  </Button>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(article._id, article.title)}
                    disabled={deleteMutation.isLoading}
                    title="מחק מאמר"
                  >
                    <Trash2 size={14} />
                    מחיקה
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {pagination.pages > 1 && (
            <Card className="pagination-card">
              <div className="pagination">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  הקודם
                </Button>

                <div className="page-numbers">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`page-number ${pageNum === page ? 'active' : ''}`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <div className="page-info">
                  עמוד {page} מתוך {pagination.pages}
                </div>

                <Button
                  variant="outline"
                  disabled={page >= pagination.pages}
                  onClick={() => setPage(page + 1)}
                >
                  הבא
                </Button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* סטטיסטיקות מהירות */}
      <Card className="stats-card">
        <h3>סטטיסטיקות מהירות</h3>
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-number">{pagination.total || 0}</div>
            <div className="stat-label">סה"כ מאמרים</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {articles.filter(a => a.isPublished).length}
            </div>
            <div className="stat-label">פורסמו</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {articles.filter(a => !a.isPublished).length}
            </div>
            <div className="stat-label">טיוטות</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {articles.reduce((sum, a) => sum + a.views, 0)}
            </div>
            <div className="stat-label">סה"כ צפיות</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ArticlesManager;