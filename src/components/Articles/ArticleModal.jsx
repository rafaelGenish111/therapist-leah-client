import { useEffect } from 'react';
import { X, Calendar, User, Eye, Share2, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const ArticleModal = ({ article, isOpen, onClose, isLoading }) => {
  // סגירה בעת לחיצה על ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('הקישור הועתק ללוח');
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="article-modal-overlay" onClick={onClose}>
      <div className="article-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-actions">
            <Button
              variant="ghost"
              size="small"
              onClick={handleShare}
              title="שתף מאמר"
            >
              <Share2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={onClose}
              title="סגור"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="modal-content">
          {isLoading ? (
            <div className="modal-loading">
              <Spinner size="large" />
              <p>טוען מאמר...</p>
            </div>
          ) : (
            <article className="article-full">
              {article.image && (
                <div className="article-hero-image">
                  <img
                    src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${article.image}`}
                    alt={article.title}
                  />
                </div>
              )}

              <header className="article-header">
                <h1 className="article-title">{article.title}</h1>
                
                <div className="article-meta">
                  <div className="meta-row">
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

                    <div className="meta-item">
                      <Eye size={16} />
                      <span>{article.views} צפיות</span>
                    </div>

                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{estimateReadTime(article.content)} דקות קריאה</span>
                    </div>
                  </div>
                </div>

                {article.tags && article.tags.length > 0 && (
                  <div className="article-tags">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="article-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div className="article-body">
                {article.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? (
                    <p key={index} className="article-paragraph">
                      {paragraph}
                    </p>
                  ) : (
                    <br key={index} />
                  )
                ))}
              </div>

              <footer className="article-footer">
                <div className="footer-content">
                  <div className="article-info">
                    <p>
                      <strong>פורסם ב:</strong> {formatDate(article.createdAt)}
                    </p>
                    {article.updatedAt !== article.createdAt && (
                      <p>
                        <strong>עודכן ב:</strong> {formatDate(article.updatedAt)}
                      </p>
                    )}
                  </div>
                  
                  <div className="footer-actions">
                    <Button 
                      variant="outline" 
                      onClick={handleShare}
                      size="small"
                    >
                      <Share2 size={16} />
                      שתף מאמר
                    </Button>
                  </div>
                </div>
              </footer>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;