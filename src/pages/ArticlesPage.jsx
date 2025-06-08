import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Search, Calendar, User } from 'lucide-react';
import { articlesApi } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  const {
    data: articlesData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery(
    ['articles', page, searchTerm, selectedTags],
    () => articlesApi.getAll({
      page,
      limit: 10,
      search: searchTerm,
      tags: selectedTags.join(',')
    }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  if (isLoading && page === 1) {
    return (
      <div className="articles-page">
        <div className="container">
          <div className="loading-container">
            <Spinner size="large" />
            <p>טוען מאמרים...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="articles-page">
        <div className="container">
          <div className="error-container">
            <h2>שגיאה בטעינת המאמרים</h2>
            <p>{error?.message || 'אירעה שגיאה בלתי צפויה'}</p>
            <Button onClick={() => refetch()}>נסה שוב</Button>
          </div>
        </div>
      </div>
    );
  }

  const articles = articlesData?.articles || [];
  const pagination = articlesData?.pagination || {};

  return (
    <div className="articles-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>מאמרים ועצות</h1>
          <p>מידע מקצועי וטיפים לשמירה על בריאותכם</p>
        </div>

        {/* Search and Filters */}
        <div className="articles-filters">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="חיפוש מאמרים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <Button type="submit" variant="primary">
                חיפוש
              </Button>
            </div>
          </form>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="no-articles">
            <h3>אין מאמרים זמינים כרגע</h3>
            <p>המאמרים יתווספו בקרוב...</p>
          </div>
        ) : (
          <>
            <div className="articles-grid">
              {articles.map((article) => (
                <Card key={article._id} className="article-card" hover>
                  {article.image && (
                    <img
                      src={`${process.env.VITE_API_URL}/uploads/${article.image}`}
                      alt={article.title}
                      className="article-image"
                    />
                  )}
                  
                  <div className="article-content">
                    <h3 className="article-title">{article.title}</h3>
                    
                    <p className="article-excerpt">
                      {truncateContent(article.content)}
                    </p>
                    
                    <div className="article-meta">
                      <div className="meta-item">
                        <Calendar size={16} />
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                      
                      {article.author && (
                        <div className="meta-item">
                          <User size={16} />
                          <span>מאת: {article.author.username}</span>
                        </div>
                      )}
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
                    
                    <div className="article-actions">
                      <Button 
                        variant="outline" 
                        onClick={() => viewArticle(article._id)}
                      >
                        קרא עוד
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  הקודם
                </Button>
                
                <span className="page-info">
                  עמוד {page} מתוך {pagination.pages}
                </span>
                
                <Button
                  variant="outline"
                  disabled={page >= pagination.pages}
                  onClick={() => setPage(page + 1)}
                >
                  הבא
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  // Helper function to view article (will be implemented later)
  function viewArticle(articleId) {
    // This could open a modal or navigate to article detail page
    console.log('View article:', articleId);
  }
};

export default ArticlesPage;