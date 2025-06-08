import { useState } from 'react';
import { useQuery } from 'react-query';
import { Filter, Search, Eye, X } from 'lucide-react';
import { galleryApi } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: galleryData, isLoading, error } = useQuery(
    ['gallery', page, selectedCategory],
    () => galleryApi.getAll({ 
      page, 
      limit: 12, 
      category: selectedCategory 
    }),
    { keepPreviousData: true }
  );

  const categories = [
    { value: '', label: 'כל התמונות' },
    { value: 'general', label: 'כללי' },
    { value: 'clinic', label: 'הקליניקה' },
    { value: 'treatments', label: 'טיפולים' },
    { value: 'equipment', label: 'ציוד' }
  ];

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (isLoading && page === 1) {
    return (
      <div className="gallery-page">
        <div className="container">
          <div className="loading-container">
            <Spinner size="large" />
            <p>טוען תמונות...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-page">
        <div className="container">
          <div className="error-container">
            <h2>שגיאה בטעינת הגלריה</h2>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const images = galleryData?.images || [];
  const pagination = galleryData?.pagination || {};

  return (
    <div className="gallery-page">
      <div className="container">
        {/* Page Header */}
        <section className="gallery-hero">
          <h1>גלריית התמונות</h1>
          <p>הציצו לתוך הקליניקה שלנו וראו את הטיפולים שאנו מציעים</p>
        </section>

        {/* Filters */}
        <section className="gallery-filters">
          <Card className="filters-card">
            <div className="filters-container">
              <div className="filter-group">
                <Filter size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setPage(1);
                  }}
                  className="category-select"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </section>

        {/* Gallery Grid */}
        {images.length === 0 ? (
          <div className="no-images">
            <h3>אין תמונות זמינות כרגע</h3>
            <p>התמונות יתווספו בקרוב...</p>
          </div>
        ) : (
          <>
            <div className="gallery-grid">
              {images.map((image) => (
                <Card key={image._id} className="gallery-item" hover>
                  <div className="image-container">
                    <img
                      src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${image.filename}`}
                      alt={image.originalName}
                      loading="lazy"
                      onClick={() => openImageModal(image)}
                    />
                    <div className="image-overlay">
                      <Button 
                        variant="primary" 
                        size="small"
                        onClick={() => openImageModal(image)}
                      >
                        <Eye size={16} />
                        צפייה
                      </Button>
                    </div>
                  </div>
                  
                  {image.description && (
                    <div className="image-info">
                      <p>{image.description}</p>
                    </div>
                  )}
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

        {/* Image Modal */}
        {selectedImage && (
          <div className="image-modal" onClick={closeImageModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeImageModal}>
                <X size={24} />
              </button>
              
              <img
                src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}/uploads/${selectedImage.filename}`}
                alt={selectedImage.originalName}
                className="modal-image"
              />
              
              <div className="modal-info">
                <h3>{selectedImage.originalName}</h3>
                {selectedImage.description && (
                  <p>{selectedImage.description}</p>
                )}
                <div className="image-meta">
                  <span>קטגוריה: {selectedImage.category}</span>
                  <span>
                    תאריך: {new Date(selectedImage.uploadedAt).toLocaleDateString('he-IL')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;