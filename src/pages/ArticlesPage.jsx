import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Search, Calendar, User, Eye, Clock, Tag, Grid, List, Filter, TrendingUp } from 'lucide-react';
import { articlesApi } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import './ArticlesPage.css';

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'popular'

  // Mock data for articles
  const mockData = {
    articles: [
      {
        _id: '1',
        title: 'יתרונות העיסוי השוודי לבריאות הגוף והנפש',
        content: 'העיסוי השוודי הוא אחד מסוגי העיסוי הפופולריים ביותר בעולם, והסיבה לכך היא התועלות הרבות שהוא מביא לגוף ולנפש. טכניקת העיסוי הזו פותחה בשוודיה במאה ה-19 ומאז התפשטה לכל העולם...',
        image: 'swedish-massage.jpg',
        author: { username: 'ליאה גניש' },
        isPublished: true,
        tags: ['עיסוי שוודי', 'בריאות', 'רלקסציה'],
        views: 1250,
        createdAt: '2024-01-15T10:00:00Z',
        readingTime: 5
      },
      {
        _id: '2',
        title: 'עיסוי ספורטיבי: מתי ולמה זה חיוני לספורטאים',
        content: 'עיסוי ספורטיבי הוא חלק בלתי נפרד מהשגרה של כל ספורטאי מקצועי. הוא עוזר לשקם את השרירים לאחר אימון אינטנסיבי, מונע פציעות ומשפר את הביצועים הספורטיביים...',
        image: 'sports-massage.jpg',
        author: { username: 'ליאה גניש' },
        isPublished: true,
        tags: ['עיסוי ספורטיבי', 'ספורט', 'שיקום'],
        views: 890,
        createdAt: '2024-01-10T14:30:00Z',
        readingTime: 7
      },
      {
        _id: '3',
        title: 'הכנת הגוף לעיסוי: טיפים חשובים לפני הטיפול',
        content: 'הכנה נכונה לטיפול עיסוי יכולה להשפיע משמעותית על יעילות הטיפול והתועלת שתפיקו ממנו. בפוסט הזה נלמד על הדרכים הטובות ביותר להתכונן לטיפול עיסוי...',
        image: 'preparation.jpg',
        author: { username: 'ליאה גניש' },
        isPublished: true,
        tags: ['הכנה לטיפול', 'טיפים', 'הדרכה'],
        views: 567,
        createdAt: '2024-01-05T09:15:00Z',
        readingTime: 4
      },
      {
        _id: '4',
        title: 'עיסוי במהלך ההריון: בטיחות ויתרונות',
        content: 'עיסוי בזמן ההריון יכול להיות מקור נוחות ורווחה עצום לנשים בהריון, אך חשוב לדעת אילו טכניקות בטוחות ומתי מומלץ להימנע מטיפול...',
        image: 'pregnancy-massage.jpg',
        author: { username: 'ליאה גניש' },
        isPublished: true,
        tags: ['עיסוי הריון', 'נשים', 'בטיחות'],
        views: 743,
        createdAt: '2024-01-20T16:45:00Z',
        readingTime: 6
      },
      {
        _id: '5',
        title: 'עיסוי רקמות עמוקות: מתי וכיצד מבצעים',
        content: 'עיסוי רקמות עמוקות הוא טכניקה מתקדמת המיועדת לטיפול בכאבים כרוניים ומתחים עמוקים בשרירים. למרות שהוא יכול להיות לא נוח במהלך הטיפול...',
        image: 'deep-tissue.jpg',
        author: { username: 'ליאה גניש' },
        isPublished: true,
        tags: ['רקמות עמוקות', 'כאב כרוני', 'טיפול מתקדם'],
        views: 1180,
        createdAt: '2024-01-25T11:20:00Z',
        readingTime: 8
      },
      {
        _id: '6',
        title: 'ארומתרפיה ועיסוי: שילוב מושלם לרווחה',
        content: 'שילוב של עיסוי מקצועי עם שמנים ארומתרפיים יוצר חוויה טיפולית יוצאת דופן. הארומתרפיה מוסיפה ממד של ריפוי נפשי ורגשי לטיפול הפיזי...',
        image: 'aromatherapy.jpg',
        author: { username: 'ליאה גניש' },
        isPublished: true,
        tags: ['ארומתרפיה', 'שמנים אתריים', 'רווחה'],
        views: 623,
        createdAt: '2024-01-30T13:10:00Z',
        readingTime: 5
      }
    ],
    pagination: {
      page: 1,
      pages: 1,
      total: 6,
      limit: 10
    }
  };

  // All available tags from articles
  const availableTags = [...new Set(mockData.articles.flatMap(article => article.tags))];

  // Filter and sort articles
  const getFilteredAndSortedArticles = () => {
    let filtered = mockData.articles.filter(article => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => article.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    // Sort articles
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  };

  const {
    data: articlesData,
    isLoading,
    isError,
    error
  } = useQuery(
    ['articles', page, searchTerm, selectedTags, sortBy],
    () => Promise.resolve({
      articles: getFilteredAndSortedArticles(),
      pagination: mockData.pagination
    }),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortBy('newest');
    setPage(1);
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

  const viewArticle = (articleId) => {
    console.log('View article:', articleId);
    // This would navigate to article detail page
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
            <Button onClick={() => window.location.reload()}>נסה שוב</Button>
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
        {/* Hero Section */}
        <section className="articles-hero">
          <div className="hero-content">
            <h1>מאמרים ועצות מקצועיות</h1>
            <p>גלו מידע מקצועי, טיפים שימושיים והדרכות לשמירה על בריאותכם ורווחתכם</p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{articles.length}</div>
              <div className="stat-label">מאמרים</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{availableTags.length}</div>
              <div className="stat-label">נושאים</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{articles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}</div>
              <div className="stat-label">צפיות</div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <Card className="filters-card">
          <div className="filters-header">
            <div className="filters-main">
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="חיפוש מאמרים..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" variant="primary" size="small">
                    חיפוש
                  </Button>
                </div>
              </form>

              <div className="sort-filter">
                <Filter size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">החדשים ביותר</option>
                  <option value="oldest">הישנים ביותר</option>
                  <option value="popular">הפופולריים ביותר</option>
                </select>
              </div>
            </div>

            <div className="view-controls">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setViewMode('grid')}
                title="תצוגת רשת"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setViewMode('list')}
                title="תצוגת רשימה"
              >
                <List size={16} />
              </Button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="tags-section">
            <h4>סינון לפי נושאים:</h4>
            <div className="tags-container">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  <Tag size={14} />
                  {tag}
                </button>
              ))}
            </div>
            {(searchTerm || selectedTags.length > 0 || sortBy !== 'newest') && (
              <Button
                variant="ghost"
                size="small"
                onClick={clearFilters}
                className="clear-filters"
              >
                נקה סינונים
              </Button>
            )}
          </div>
        </Card>

        {/* Articles Grid/List */}
        <div className={`articles-main-layout ${viewMode}`}>
          <div className={`articles-container ${viewMode}`}>
            {articles.length === 0 ? (
              <Card className="empty-state">
                <div className="empty-content">
                  <Search size={48} />
                  <h3>לא נמצאו מאמרים</h3>
                  <p>נסו לשנות את מילות החיפוש או הסינונים</p>
                  <Button onClick={clearFilters}>נקה סינונים</Button>
                </div>
              </Card>
            ) : (
              articles.map((article) => (
                <Card key={article._id} className={`article-item ${viewMode}`} hover>
                  <div className="article-content">
                    {viewMode === 'grid' && (
                      <div className="article-image-container">
                        <img
                          src={`https://picsum.photos/400/250?random=${article._id}`}
                          alt={article.title}
                          className="article-image"
                          loading="lazy"
                        />
                        <div className="image-overlay">
                          <div className="views-badge">
                            <Eye size={14} />
                            {article.views.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}

                    {viewMode === 'list' && (
                      <div className="list-image-container">
                        <img
                          src={`https://picsum.photos/200/150?random=${article._id}`}
                          alt={article.title}
                          className="list-article-image"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="article-info">
                      <div className="article-header">
                        <h3 className="article-title">{article.title}</h3>
                        <div className="article-meta-top">
                          <div className="reading-time">
                            <Clock size={14} />
                            {article.readingTime} דקות קריאה
                          </div>
                        </div>
                      </div>
                      
                      <p className="article-excerpt">
                        {truncateContent(article.content)}
                      </p>
                      
                      <div className="article-tags">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="article-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="article-footer">
                        <div className="article-meta">
                          <div className="meta-item">
                            <Calendar size={16} />
                            <span>{formatDate(article.createdAt)}</span>
                          </div>
                          
                          <div className="meta-item">
                            <User size={16} />
                            <span>{article.author.username}</span>
                          </div>

                          {viewMode === 'list' && (
                            <div className="meta-item">
                              <Eye size={16} />
                              <span>{article.views.toLocaleString()} צפיות</span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={() => viewArticle(article._id)}
                        >
                          קרא עוד
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Popular Articles Sidebar (only in grid view) */}
          {viewMode === 'grid' && (
            <Card className="popular-articles-card">
              <h3>
                <TrendingUp size={20} />
                המאמרים הפופולריים
              </h3>
              <div className="popular-articles-list">
                {articles
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((article, index) => (
                    <div key={article._id} className="popular-item">
                      <div className="popular-rank">{index + 1}</div>
                      <div className="popular-content">
                        <h4>{article.title}</h4>
                        <div className="popular-meta">
                          <span>{article.views.toLocaleString()} צפיות</span>
                          <span>•</span>
                          <span>{article.readingTime} דקות</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}
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

        {/* Popular Articles Sidebar (only in grid view) */}
        {viewMode === 'grid' && (
          <Card className="popular-articles-card">
            <h3>
              <TrendingUp size={20} />
              המאמרים הפופולריים
            </h3>
            <div className="popular-articles-list">
              {articles
                .sort((a, b) => b.views - a.views)
                .slice(0, 5)
                .map((article, index) => (
                  <div key={article._id} className="popular-item">
                    <div className="popular-rank">{index + 1}</div>
                    <div className="popular-content">
                      <h4>{article.title}</h4>
                      <div className="popular-meta">
                        <span>{article.views.toLocaleString()} צפיות</span>
                        <span>•</span>
                        <span>{article.readingTime} דקות</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;