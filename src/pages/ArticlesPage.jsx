import { useState } from 'react';
import { useQuery } from 'react-query';
import { Search, Calendar, User, Eye, Tag, Clock } from 'lucide-react';
import { articlesApi } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import ArticleModal from '../components/articles/ArticleModal';

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: articlesData,
    isLoading,
    isError,
    error,
  } = useQuery(
    ['public-articles', page, searchTerm, selectedTags],
    () => articlesApi.getAll({
      page,
      limit: 12,
      search: searchTerm,
      tags: selectedTags.join(',')
    }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
    }
  );

  // שליפת מאמר ספציפי
  const { data: articleDetails, isLoading: articleLoading } = useQuery(
    ['article-details', selectedArticle],
    () => articlesApi.getById(selectedArticle),
    {
      enabled: !!selectedArticle,
      onSuccess: () => setModalOpen(true)
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setPage(1);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setPage(1);
  };

  const openArticle = (articleId) => {
    setSelectedArticle(articleId);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedArticle(null);
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
    return content.substr(0, maxLength).trim() + '...';
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  // איסוף כל התגיות הזמינות
  const allTags = articlesData?.articles?.reduce((tags, article) => {
    if (article.tags) {
      article.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    return tags;
  }, []) || [];

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
            <Card className="error-card">
              <h2>שגיאה בטעינת המאמרים</h2>
              <p>{error?.message || 'אירעה שגיאה בלתי צפויה'}</p>
              <Button onClick={() => window.location.reload()}>
                נסה שוב
              </Button>
            </Card>
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
        <section className="articles-hero">
          <div className="hero-content">
            <h1>מאמרים ועצות</h1>
            <p>מידע מקצועי וטיפים לשמירה על בריאותכם והרווחה שלכם</p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="filters-section">
          <Card className="filters-card">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="חיפוש במאמרים..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <Button type="submit" variant="primary" size="small">
                  חיפוש
                </Button>
              </div>
            </form>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="tags-filter">
                <h4>סינון לפי נושא:</h4>
                <div className="available-tags">
                  {allTags.slice(0, 10).map((tag) => (
                    <button
                      key={tag}
                      className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                      onClick={() => handleTagClick(tag)}
                    >
                      <Tag size={14} />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(selectedTags.length > 0 || searchTerm) && (
              <div className="active-filters">
                <div className="filter-items">
                  {searchTerm && (
                    <span className="filter-item">
                      חיפוש: "{searchTerm}"
                    </span>
                  )}
                  {selectedTags.map((tag) => (
                    <span key={tag} className="filter-item tag-item">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="remove-filter"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="small" 
                  onClick={clearFilters}
                >
                  נקה סינונים
                </Button>
              </div>
            )}
          </Card>
        </section>

        {/* Articles Grid */}
        <section className="articles-section">
          {articles.length === 0 ? (
            <Card className="no-results">
              <div className="no-results-content">
                <h3>לא נמצאו מאמרים</h3>
                <p>
                  {searchTerm || selectedTags.length > 0
                    ? 'נסה לשנות את מונחי החיפוש או הסר חלק מהסינונים'
                    : 'מאמרים יתווספו בקרוב...'}
                </p>
                {(searchTerm || selectedTags.length > 0) && (
                  <Button onClick={clearFilters}>
                    נקה סינונים
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <>
              <div className="articles-grid">
                {articles.map((article) => (
                  <Card 
                    key={article._id} 
                    className="article-card" 
                    hover
                    onClick={() => openArticle(article._id)}
                  >
                    {article.image && (
                      <div className="article-image">
                        <img
                          src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${article.image}`}
                          alt={article.title}
                          loading="lazy"
                        />
                        <div className="read-time">
                          <Clock size={14} />
                          {estimateReadTime(article.content)} דק' קריאה
                        </div>
                      </div>
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
                            <span>{article.author.username}</span>
                          </div>
                        )}

                        <div className="meta-item">
                          <Eye size={16} />
                          <span>{article.views} צפיות</span>
                        </div>
                      </div>
                      
                      {article.tags && article.tags.length > 0 && (
                        <div className="article-tags">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index} 
                              className="article-tag"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTagClick(tag);
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="more-tags">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="article-footer">
                        <Button 
                          variant="outline" 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            openArticle(article._id);
                          }}
                        >
                          קרא עוד
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Loading more articles */}
              {isLoading && page > 1 && (
                <div className="loading-more">
                  <Spinner size="medium" />
                  <span>טוען מאמרים נוספים...</span>
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <Card className="pagination-section">
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
                        let pageNum;
                        if (pagination.pages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= pagination.pages - 2) {
                          pageNum = pagination.pages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        
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
        </section>

        {/* Article Modal */}
        {modalOpen && articleDetails && (
          <ArticleModal
            article={articleDetails}
            isOpen={modalOpen}
            onClose={closeModal}
            isLoading={articleLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;