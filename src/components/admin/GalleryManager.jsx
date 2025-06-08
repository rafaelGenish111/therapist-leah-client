import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Upload, Trash2, Eye, Search, Filter, X, ZoomIn } from 'lucide-react';
import { galleryApi, getFileUrl } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import './GalleryManager.css';

const GalleryManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const queryClient = useQueryClient();

  const { data: imagesData, isLoading } = useQuery(
    ['admin-gallery', page, searchTerm, selectedCategory],
    () => galleryApi.getAllAdmin({ 
      page, 
      limit: 20, 
      category: selectedCategory,
      search: searchTerm 
    }),
    { keepPreviousData: true }
  );

  const uploadMutation = useMutation(galleryApi.upload, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-gallery');
      toast.success('התמונה הועלתה בהצלחה');
    },
    onError: (error) => {
      toast.error(error.message || 'שגיאה בהעלאת התמונה');
    }
  });

  const deleteMutation = useMutation(galleryApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-gallery');
      toast.success('התמונה נמחקה בהצלחה');
    }
  });

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', 'general');

    uploadMutation.mutate(formData);
  };

  const handleDelete = (imageId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את התמונה?')) {
      deleteMutation.mutate(imageId);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const categories = [
    { value: '', label: 'כל הקטגוריות' },
    { value: 'general', label: 'כללי' },
    { value: 'clinic', label: 'קליניקה' },
    { value: 'treatments', label: 'טיפולים' },
    { value: 'equipment', label: 'ציוד' }
  ];

  if (isLoading) {
    return (
      <div className="gallery-manager" style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      width: '100%'
    }}>
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען תמונות...</p>
        </div>
      </div>
    );
  }

  const images = imagesData?.images || [];
  const pagination = imagesData?.pagination || {};

  return (
    <div className="gallery-manager">
      <div className="manager-header">
        <h1>ניהול גלריה</h1>
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <Button 
            variant="primary" 
            as="label" 
            htmlFor="image-upload"
            disabled={uploadMutation.isLoading}
          >
            <Upload size={16} />
            {uploadMutation.isLoading ? 'מעלה...' : 'העלאת תמונה'}
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="filters-container">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="חיפוש תמונות..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filter">
            <Filter size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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

      <div className="images-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        marginBottom: '48px',
        width: '100%'
      }}>
        {images.map((image) => (
          <div
            key={image._id} 
            className="image-item"
            style={{
              background: 'white',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: '1px solid #F5E6E3',
              cursor: 'pointer',
              width: '100%',
              minWidth: '320px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
              // הצג את ה-overlay
              const overlay = e.currentTarget.querySelector('.image-overlay');
              if (overlay) overlay.style.opacity = '1';
              // הגדל את התמונה
              const img = e.currentTarget.querySelector('.preview-image');
              if (img) img.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              // הסתר את ה-overlay
              const overlay = e.currentTarget.querySelector('.image-overlay');
              if (overlay) overlay.style.opacity = '0';
              // החזר את התמונה לגודל רגיל
              const img = e.currentTarget.querySelector('.preview-image');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <div className="image-container" style={{ 
              position: 'relative', 
              width: '100%' 
            }}>
              <div className="image-preview" style={{ 
                width: '100%', 
                height: '280px', 
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#F5E6E3'
              }}>
                <img
                  src={getFileUrl(image.filename)}
                  alt={image.originalName}
                  loading="lazy"
                  className="preview-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  onError={(e) => {
                    console.error('❌ Image load error:', e.target.src);
                    // אם יש שגיאה, הצג placeholder
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                
                {/* Placeholder רק לשגיאות */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'none', // מוסתר בברירת מחדל
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    fontSize: '48px',
                    color: '#B89C94',
                    backgroundColor: '#F5E6E3'
                  }}
                >
                  <div>🖼️</div>
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>
                    התמונה לא נמצאה
                  </div>
                </div>
                
                {/* Overlay עם כפתורים */}
                <div 
                  className="image-overlay" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(image);
                    }}
                    style={{
                      background: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <ZoomIn size={20} color="#4A3429" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(image._id);
                    }}
                    style={{
                      background: '#EF4444',
                      border: 'none',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="image-info" style={{ padding: '20px' }}>
              <h4 style={{ 
                fontSize: '16px',
                marginBottom: '8px',
                color: '#4A3429',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: '600'
              }}>
                {image.originalName}
              </h4>
              <p style={{
                fontSize: '14px',
                color: '#8B6F66',
                marginBottom: '16px',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '40px'
              }}>
                {image.description || 'ללא תיאור'}
              </p>
              <div className="image-meta" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px'
              }}>
                <span className="category" style={{
                  background: '#D4B5B0',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  fontWeight: '500'
                }}>
                  {image.category}
                </span>
                <span className="date" style={{ color: '#B89C94' }}>
                  {new Date(image.uploadedAt).toLocaleDateString('he-IL')}
                </span>
              </div>
            </div>
          </div>
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

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedImage.originalName}</h3>
              <Button 
                variant="ghost" 
                size="small" 
                onClick={closeModal}
                className="close-btn"
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="modal-content">
              <img
                src={getFileUrl(selectedImage.filename)}
                alt={selectedImage.originalName}
                className="modal-image"
              />
            </div>
            
            <div className="modal-info">
              <div className="info-row">
                <span className="label">תיאור:</span>
                <span>{selectedImage.description || 'ללא תיאור'}</span>
              </div>
              <div className="info-row">
                <span className="label">קטגוריה:</span>
                <span>{selectedImage.category}</span>
              </div>
              <div className="info-row">
                <span className="label">תאריך העלאה:</span>
                <span>{new Date(selectedImage.uploadedAt).toLocaleDateString('he-IL')}</span>
              </div>
              {selectedImage.size && (
                <div className="info-row">
                  <span className="label">גודל:</span>
                  <span>{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;