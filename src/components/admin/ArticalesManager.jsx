// src/components/admin/ArticlesManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';
import { mockArticles } from '../../services/mockData';
import './ArticlesManager.css';

const ArticlesManager = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, published, draft
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [page, setPage] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    isPublished: true,
    image: null
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      // סימולציה של קריאה ל-API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setArticles(mockArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'published' && article.isPublished) ||
                         (filterStatus === 'draft' && !article.isPublished);
    
    return matchesSearch && matchesFilter;
  });

  const handleNewArticle = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      content: '',
      tags: '',
      isPublished: true,
      image: null
    });
    setShowForm(true);
  };

  const handleEditArticle = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      tags: article.tags?.join(', ') || '',
      isPublished: article.isPublished,
      image: null
    });
    setShowForm(true);
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // סימולציה של שמירה
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const articleData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: { _id: '1', username: 'ליאה גניש' },
        views: editingArticle?.views || 0,
        createdAt: editingArticle?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (editingArticle) {
        // עדכון מאמר קיים
        setArticles(prev => prev.map(article => 
          article._id === editingArticle._id 
            ? { ...article, ...articleData }
            : article
        ));
        alert('המאמר עודכן בהצלחה!');
      } else {
        // יצירת מאמר חדש
        const newArticle = {
          _id: Math.random().toString(36).substr(2, 9),
          ...articleData
        };
        setArticles(prev => [newArticle, ...prev]);
        alert('המאמר נוצר בהצלחה!');
      }
      
      setShowForm(false);
      setEditingArticle(null);
      
    } catch (error) {
      console.error('Error saving article:', error);
      alert('שגיאה בשמירת המאמר');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המאמר?')) {
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setArticles(prev => prev.filter(article => article._id !== articleId));
      alert('המאמר נמחק בהצלחה!');
      
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('שגיאה במחיקת המאמר');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (articleId) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setArticles(prev => prev.map(article => 
        article._id === articleId 
          ? { ...article, isPublished: !article.isPublished }
          : article
      ));
      
    } catch (error) {
      console.error('Error toggling publish status:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  if (showForm) {
    return (
      <div className="articles-manager">
        <div className="article-form-container">
          <div className="form-header">
            <h1>
              <FileText size={24} />
              {editingArticle ? 'עריכת מאמר' : 'מאמר חדש'}
            </h1>
            <button 
              className="btn btn--outline"
              onClick={() => setShowForm(false)}
              disabled={loading}
            >
              <X size={16} />
              ביטול
            </button>
          </div>

          <form onSubmit={handleSaveArticle} className="article-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">כותרת המאמר *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="הכנס כותרת מעניינת..."
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content">תוכן המאמר *</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="כתוב את תוכן המאמר כאן..."
                rows="15"
                required
                disabled={loading}
              />
              <small className="form-hint">
                ניתן להשתמש בפסקאות ורשימות. הטקסט יוצג בפורמט פשוט באתר.
              </small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tags">תגיות (מופרדות בפסיקים)</label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="עיסוי, בריאות, טיפול..."
                  disabled={loading}
                />
                <small className="form-hint">
                  תגיות עוזרות למבקרים למצוא את המאמר בחיפוש
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="image">תמונה ראשית</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files[0] }))}
                  disabled={loading}
                />
                <small className="form-hint">
                  תמונה אופציונלית שתוצג בראש המאמר
                </small>
              </div>
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  פרסם את המאמר מיד
                </label>
                <small className="form-hint">
                  ניתן לשמור כטיוטה ולפרסם מאוחר יותר
                </small>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn--primary"
                disabled={loading || !formData.title || !formData.content}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    שומר...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {editingArticle ? 'עדכן מאמר' : 'שמור מאמר'}
                  </>
                )}
              </button>
              <button 
                type="button" 
                className="btn btn--outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                ביטול
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="articles-manager">
      {/* Header */}
      <div className="manager-header">
        <div className="header-info">
          <h1>
            <FileText size={28} />
            ניהול מאמרים
          </h1>
          <p>כתוב, ערוך ונהל את המאמרים באתר</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn btn--primary"
            onClick={handleNewArticle}
            disabled={loading}
          >
            <Plus size={16} />
            מאמר חדש
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="articles-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{articles.length}</div>
            <div className="stat-label">סך המאמרים</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <Eye size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {articles.filter(a => a.isPublished).length}
            </div>
            <div className="stat-label">מאמרים פורסמו</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">
            <BarChart3 size={20} />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
            </div>
            <div className="stat-label">סך הצפיות</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="articles-filters">
        <div className="search-filter">
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
        
        <div className="status-filter">
          <Filter size={20} />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">כל המאמרים</option>
            <option value="published">פורסמו</option>
            <option value="draft">טיוטות</option>
          </select>
        </div>
      </div>

      {/* Articles List */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>טוען מאמרים...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="empty-state">
          <FileText size={64} />
          <h3>
            {searchTerm || filterStatus !== 'all' 
              ? 'לא נמצאו מאמרים התואמים לחיפוש'
              : 'אין מאמרים עדיין'
            }
          </h3>
          <p>
            {searchTerm || filterStatus !== 'all'
              ? 'נסה לשנות את מונחי החיפוש או הפילטרים'
              : 'התחל לכתוב את המאמר הראשון שלך'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <button 
              className="btn btn--primary"
              onClick={handleNewArticle}
            >
              <Plus size={16} />
              צור מאמר ראשון
            </button>
          )}
        </div>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map((article) => (
            <div key={article._id} className="article-card">
              <div className="article-header">
                <div className="article-status">
                  <span className={`status-badge ${article.isPublished ? 'published' : 'draft'}`}>
                    {article.isPublished ? 'פורסם' : 'טיוטה'}
                  </span>
                </div>
                <h3 className="article-title">{article.title}</h3>
              </div>

              <div className="article-content">
                <p className="article-excerpt">
                  {truncateContent(article.content)}
                </p>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="article-tags">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="tag tag-more">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="article-meta">
                <div className="meta-item">
                  <Eye size={14} />
                  <span>{article.views} צפיות</span>
                </div>
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{formatDate(article.createdAt)}</span>
                </div>
                {article.image && (
                  <div className="meta-item">
                    <ImageIcon size={14} />
                    <span>יש תמונה</span>
                  </div>
                )}
              </div>

              <div className="article-actions">
                <button 
                  className="btn btn--outline btn--small"
                  onClick={() => handleEditArticle(article)}
                  disabled={loading}
                >
                  <Edit size={14} />
                  עריכה
                </button>
                
                <button 
                  className={`btn btn--small ${article.isPublished ? 'btn--warning' : 'btn--success'}`}
                  onClick={() => handleTogglePublish(article._id)}
                  disabled={loading}
                >
                  {article.isPublished ? 'הסתר' : 'פרסם'}
                </button>
                
                <button 
                  className="btn btn--danger btn--small"
                  onClick={() => handleDeleteArticle(article._id)}
                  disabled={loading}
                >
                  <Trash2 size={14} />
                  מחק
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredArticles.length > 12 && (
        <div className="pagination">
          <button 
            className="btn btn--outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            הקודם
          </button>
          <span className="page-info">
            עמוד {page} מתוך {Math.ceil(filteredArticles.length / 12)}
          </span>
          <button 
            className="btn btn--outline"
            disabled={page >= Math.ceil(filteredArticles.length / 12)}
            onClick={() => setPage(page + 1)}
          >
            הבא
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesManager;