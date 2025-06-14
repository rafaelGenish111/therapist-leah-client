import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Plus, Edit, Trash2, Eye, Search, Calendar, User } from 'lucide-react';
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
  
  const queryClient = useQueryClient();

  const { data: articlesData, isLoading, error } = useQuery(
    ['admin-articles', page, searchTerm],
    () => articlesApi.getAllAdmin({ page, limit: 10, search: searchTerm }),
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
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
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
        </Card>
      </div>
    );
  }

  const articles = articlesData?.articles || [];
  const pagination = articlesData?.pagination || {};

  return (
    <div className="articles-manager">
      <div className="manager-header">
        <h1>ניהול מאמרים</h1>
        <Button variant="primary" onClick={handleNewArticle}>
          <Plus size={16} />
          מאמר חדש
        </Button>
      </div>

      <Card className="search-card">
        <div className="search-container">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="חיפוש מאמרים..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      <div className="articles-list">
        {articles.map((article) => (
          <Card key={article._id} className="article-item">
            <div className="article-content">
              <div className="article-header">
                <div className="article-main-info">
                  <h3 className="article-title">{article.title}</h3>
                  <div className="article-status">
                    <span className={`status-badge ${article.isPublished ? 'published' : 'draft'}`}>
                      {article.isPublished ? 'פורסם' : 'טיוטה'}
                    </span>
                  </div>
                </div>
                <div className="article-actions">
                  <Button variant="outline" size="small">
                    <Eye size={14} />
                    תצוגה
                  </Button>
                  <Button variant="outline" size="small" onClick={() => handleEdit(article)}>
                    <Edit size={14} />
                    עריכה
                  </Button>
                  <Button 
                    variant="danger" 
                    size="small" 
                    onClick={() => handleDelete(article._id)}
                    disabled={deleteMutation.isLoading}
                  >
                    <Trash2 size={14} />
                    מחיקה
                  </Button>
                </div>
              </div>

              <p className="article-excerpt">
                {truncateContent(article.content)}
              </p>

              <div className="article-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>נוצר: {formatDate(article.createdAt)}</span>
                </div>
                
                {article.author && (
                  <div className="meta-item">
                    <User size={16} />
                    <span>מאת: {article.author.username}</span>
                  </div>
                )}
                
                <div className="meta-item">
                  <Eye size={16} />
                  <span>צפיות: {article.views}</span>
                </div>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="pagination">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            הקודם
          </Button>
          <span>עמוד {page} מתוך {pagination.pages}</span>
          <Button
            variant="outline"
            disabled={page >= pagination.pages}
            onClick={() => setPage(page + 1)}
          >
            הבא
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticlesManager;