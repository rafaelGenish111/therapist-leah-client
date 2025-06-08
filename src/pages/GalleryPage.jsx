import { useState, useEffect } from 'react';
import { Search, Filter, X, ZoomIn, Download } from 'lucide-react';

// רכיב פשוט לספינר
const Spinner = ({ size = 'medium' }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '40px'
  }}>
    <div style={{
      width: size === 'large' ? '40px' : '24px',
      height: size === 'large' ? '40px' : '24px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid #D4B5B0',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// רכיב פשוט לכרטיסיה
const Card = ({ children, className = '', hover = false, ...props }) => (
  <div 
    className={`card ${className} ${hover ? 'hover' : ''}`}
    style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      ...(hover && {
        cursor: 'pointer'
      })
    }}
    {...props}
  >
    {children}
  </div>
);

// רכיב פשוט לכפתור
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyle = {
    padding: size === 'small' ? '8px 16px' : size === 'large' ? '16px 24px' : '12px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: size === 'small' ? '14px' : '16px'
  };

  const variantStyles = {
    primary: {
      background: '#D4B5B0',
      color: 'white'
    },
    outline: {
      background: 'transparent',
      color: '#D4B5B0',
      border: '2px solid #D4B5B0'
    },
    danger: {
      background: '#EF4444',
      color: 'white'
    }
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...variantStyles[variant],
        opacity: disabled ? 0.5 : 1
      }}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const categories = [
    { value: '', label: 'כל הקטגוריות' },
    { value: 'general', label: 'כללי' },
    { value: 'clinic', label: 'הקליניקה' },
    { value: 'treatments', label: 'טיפולים' },
    { value: 'equipment', label: 'ציוד' }
  ];

  // פונקציה לטעינת תמונות
  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/gallery?${params}`);
      
      if (!response.ok) {
        throw new Error('שגיאה בטעינת התמונות');
      }
      
      const data = await response.json();
      setImages(data.images || []);
      setPagination(data.pagination || {});
      setError(null);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(err.message);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeImageModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (filename) => {
    return `/uploads/${filename}`;
  };

  if (isLoading && page === 1) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <Spinner size="large" />
        <p>טוען תמונות...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>שגיאה בטעינת הגלריה</h2>
        <p>{error}</p>
        <Button onClick={fetchImages}>נסה שוב</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* כותרת הדף */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#4A3429' }}>
          גלריית התמונות
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#8B6F66' }}>
          אוסף תמונות מהקליניקה, הטיפולים והציוד המתקדם שלנו
        </p>
      </div>

      {/* חיפוש וסינון */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '40px', 
        padding: '20px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        flexWrap: 'wrap'
      }}>
        <form onSubmit={handleSearch} style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            background: '#FEFBFA',
            border: '2px solid #F5E6E3',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <Search size={20} style={{ color: '#B89C94' }} />
            <input
              type="text"
              placeholder="חיפוש תמונות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                padding: '8px 0',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <Button type="submit" variant="primary" size="small">
              חיפוש
            </Button>
          </div>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={20} style={{ color: '#8B6F66' }} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              border: '2px solid #F5E6E3',
              borderRadius: '8px',
              padding: '12px',
              background: 'white',
              minWidth: '180px'
            }}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* רשת תמונות */}
      {images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: '#F5E6E3', borderRadius: '12px' }}>
          <h3>אין תמונות זמינות</h3>
          <p>התמונות יתווספו בקרוב...</p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {images.map((image) => (
              <Card key={image._id} hover>
                <div style={{ position: 'relative', width: '100%', height: '250px', overflow: 'hidden' }}>
                  <img
                    src={getImageUrl(image.filename)}
                    alt={image.description || image.originalName}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => e.target.style.opacity = 1}
                    onMouseOut={(e) => e.target.style.opacity = 0}
                    onClick={() => openImageModal(image)}
                  >
                    <Button variant="primary" size="small">
                      <ZoomIn size={16} />
                      צפייה
                    </Button>
                  </div>
                </div>
                
                {(image.description || image.category !== 'general') && (
                  <div style={{ padding: '16px' }}>
                    {image.description && (
                      <p style={{ fontSize: '14px', color: '#8B6F66', marginBottom: '12px' }}>
                        {image.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {image.category !== 'general' && (
                        <span style={{
                          background: '#D4B5B0',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}>
                          {categories.find(cat => cat.value === image.category)?.label || image.category}
                        </span>
                      )}
                      <span style={{ fontSize: '12px', color: '#B89C94' }}>
                        {formatDate(image.uploadedAt)}
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* פגינציה */}
          {pagination.pages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '20px',
              padding: '20px' 
            }}>
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                הקודם
              </Button>
              
              <span style={{ fontSize: '14px', color: '#8B6F66' }}>
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

      {/* מודל תמונה */}
      {isModalOpen && selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={closeImageModal}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              onClick={closeImageModal}
            >
              <X size={24} />
            </button>
            
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: '#FEFBFA',
              minHeight: '400px'
            }}>
              <img
                src={getImageUrl(selectedImage.filename)}
                alt={selectedImage.description || selectedImage.originalName}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            <div style={{ padding: '24px', borderTop: '1px solid #F5E6E3' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#4A3429' }}>
                {selectedImage.originalName}
              </h3>
              {selectedImage.description && (
                <p style={{ fontSize: '16px', color: '#8B6F66', marginBottom: '16px' }}>
                  {selectedImage.description}
                </p>
              )}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', color: '#B89C94' }}>
                  קטגוריה: {categories.find(cat => cat.value === selectedImage.category)?.label || selectedImage.category}
                </span>
                <span style={{ fontSize: '14px', color: '#B89C94' }}>
                  הועלה: {formatDate(selectedImage.uploadedAt)}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <Button
                  variant="outline"
                  onClick={() => window.open(getImageUrl(selectedImage.filename), '_blank')}
                >
                  <Download size={16} />
                  הורדה
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;