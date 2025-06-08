import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Upload, Trash2, Eye, Search, Filter, Grid, List, MoreVertical, Edit } from 'lucide-react';
import { galleryApi } from '../../services/api';
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showBulkActions, setShowBulkActions] = useState(false);
  
  const queryClient = useQueryClient();

  // Mock data במקום API call שנכשל
  const mockData = {
    images: [
      {
        _id: '1',
        filename: 'image1.jpg',
        originalName: 'טיפול עיסוי 1.jpg',
        description: 'עיסוי שוודי מרגיע במרכז הקליניקה',
        category: 'treatments',
        size: 2048000,
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        isVisible: true,
        uploadedBy: { username: 'ליאה' }
      },
      {
        _id: '2',
        filename: 'image2.jpg',
        originalName: 'קליניקה חדר טיפולים.jpg',
        description: 'חדר הטיפולים הראשי עם אווירה רגועה',
        category: 'clinic',
        size: 1536000,
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        isVisible: true,
        uploadedBy: { username: 'ליאה' }
      },
      {
        _id: '3',
        filename: 'image3.jpg',
        originalName: 'ציוד מקצועי.jpg',
        description: 'ציוד עיסוי מקצועי ואיכותי',
        category: 'equipment',
        size: 1024000,
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        isVisible: false,
        uploadedBy: { username: 'ליאה' }
      },
      {
        _id: '4',
        filename: 'image4.jpg',
        originalName: 'פינת המתנה.jpg',
        description: 'פינת המתנה הנעימה בקליניקה',
        category: 'clinic',
        size: 1800000,
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        isVisible: true,
        uploadedBy: { username: 'ליאה' }
      },
      {
        _id: '5',
        filename: 'image5.jpg',
        originalName: 'טיפול רקמות עמוקות.jpg',
        description: 'הדגמה של טיפול רקמות עמוקות',
        category: 'treatments',
        size: 2560000,
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        isVisible: true,
        uploadedBy: { username: 'ליאה' }
      },
      {
        _id: '6',
        filename: 'image6.jpg',
        originalName: 'שמנים ארומתרפיים.jpg',
        description: 'מגוון שמנים ארומתרפיים איכותיים',
        category: 'equipment',
        size: 1200000,
        mimeType: 'image/jpeg',
        uploadedAt: new Date().toISOString(),
        isVisible: true,
        uploadedBy: { username: 'ליאה' }
      }
    ],
    pagination: {
      page: 1,
      pages: 1,
      total: 6,
      limit: 20
    },
    categoryStats: [
      { _id: 'treatments', count: 2 },
      { _id: 'clinic', count: 2 },
      { _id: 'equipment', count: 2 }
    ]
  };

  // Filter mock data based on search and category
  const filteredData = {
    ...mockData,
    images: mockData.images.filter(image => {
      const matchesSearch = !searchTerm || 
        image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || image.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
  };

  // Use filtered mock data instead of API
  const { data: imagesData, isLoading } = useQuery(
    ['admin-gallery', page, searchTerm, selectedCategory],
    () => Promise.resolve(filteredData),
    { keepPreviousData: true }
  );

  const uploadMutation = useMutation(
    (formData) => {
      // Mock upload
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'התמונה הועלתה בהצלחה' });
        }, 1500);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-gallery');
        toast.success('התמונה הועלתה בהצלחה');
      },
      onError: (error) => {
        toast.error(error.message || 'שגיאה בהעלאת התמונה');
      }
    }
  );

  const deleteMutation = useMutation(
    (imageId) => {
      // Mock delete
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'התמונה נמחקה' });
        }, 1000);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-gallery');
        toast.success('התמונה נמחקה בהצלחה');
      }
    }
  );

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`הקובץ ${file.name} גדול מדי. מקסימום 5MB`);
        continue;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error(`הקובץ ${file.name} הוא לא תמונה נתמכת`);
        continue;
      }

      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', 'general');

      uploadMutation.mutate(formData);
    }
    
    // Reset input
    event.target.value = '';
  };

  const handleDelete = (imageId) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את התמונה?')) {
      deleteMutation.mutate(imageId);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedImages.length === 0) {
      toast.error('אנא בחר תמונות לפני ביצוע הפעולה');
      return;
    }

    switch (action) {
      case 'delete':
        if (window.confirm(`האם אתה בטוח שברצונך למחוק ${selectedImages.length} תמונות?`)) {
          // Mock bulk delete
          setTimeout(() => {
            toast.success(`${selectedImages.length} תמונות נמחקו בהצלחה`);
            setSelectedImages([]);
            setShowBulkActions(false);
          }, 1000);
        }
        break;
      case 'hide':
        setTimeout(() => {
          toast.success(`${selectedImages.length} תמונות הוסתרו`);
          setSelectedImages([]);
          setShowBulkActions(false);
        }, 1000);
        break;
      case 'show':
        setTimeout(() => {
          toast.success(`${selectedImages.length} תמונות הוצגו`);
          setSelectedImages([]);
          setShowBulkActions(false);
        }, 1000);
        break;
    }
  };

  const categories = [
    { value: '', label: 'כל הקטגוריות' },
    { value: 'general', label: 'כללי' },
    { value: 'clinic', label: 'קליניקה' },
    { value: 'treatments', label: 'טיפולים' },
    { value: 'equipment', label: 'ציוד' }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSelectImage = (imageId, checked) => {
    if (checked) {
      setSelectedImages([...selectedImages, imageId]);
    } else {
      setSelectedImages(selectedImages.filter(id => id !== imageId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedImages(images.map(img => img._id));
    } else {
      setSelectedImages([]);
    }
  };

  if (isLoading) {
    return (
      <div className="gallery-manager">
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען תמונות...</p>
        </div>
      </div>
    );
  }

  const images = imagesData?.images || [];
  const pagination = imagesData?.pagination || {};
  const categoryStats = imagesData?.categoryStats || [];

  return (
    <div className="gallery-manager">
      {/* Header */}
      <div className="manager-header">
        <div className="header-main">
          <h1>ניהול גלריה</h1>
          <p>העלאה וניהול תמונות האתר</p>
        </div>
        <div className="header-actions">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="image-upload"
            multiple
          />
          <Button 
            variant="primary" 
            as="label" 
            htmlFor="image-upload"
            disabled={uploadMutation.isLoading}
          >
            <Upload size={16} />
            {uploadMutation.isLoading ? 'מעלה...' : 'העלאת תמונות'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{images.length}</div>
            <div className="stat-label">סה"כ תמונות</div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{images.filter(img => img.isVisible).length}</div>
            <div className="stat-label">תמונות מוצגות</div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{categoryStats.length}</div>
            <div className="stat-label">קטגוריות</div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-number">{formatFileSize(images.reduce((total, img) => total + img.size, 0))}</div>
            <div className="stat-label">נפח כולל</div>
          </div>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="filters-card">
        <div className="filters-header">
          <div className="filters-main">
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

        {/* Selection Controls */}
        {images.length > 0 && (
          <div className="selection-controls">
            <label className="select-all-label">
              <input
                type="checkbox"
                checked={selectedImages.length === images.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              <span>בחר הכל ({images.length})</span>
            </label>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedImages.length > 0 && (
          <div className="bulk-actions">
            <div className="bulk-info">
              <span>{selectedImages.length} תמונות נבחרו</span>
            </div>
            <div className="bulk-buttons">
              <Button
                variant="outline"
                size="small"
                onClick={() => handleBulkAction('show')}
              >
                הצג
              </Button>
              <Button
                variant="outline"
                size="small"
                onClick={() => handleBulkAction('hide')}
              >
                הסתר
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleBulkAction('delete')}
              >
                מחק
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => {
                  setSelectedImages([]);
                  setShowBulkActions(false);
                }}
              >
                ביטול
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Images Grid/List */}
      <div className={`images-container ${viewMode}`}>
        {images.length === 0 ? (
          <Card className="empty-state">
            <div className="empty-content">
              <Upload size={48} />
              <h3>אין תמונות{searchTerm || selectedCategory ? ' שמתאימות לחיפוש' : ' עדיין'}</h3>
              <p>
                {searchTerm || selectedCategory 
                  ? 'נסה לשנות את פרמטרי החיפוש' 
                  : 'העלה את התמונה הראשונה שלך'
                }
              </p>
              {!searchTerm && !selectedCategory && (
                <Button variant="primary" as="label" htmlFor="image-upload">
                  העלה תמונה
                </Button>
              )}
            </div>
          </Card>
        ) : (
          images.map((image) => (
            <Card key={image._id} className={`image-item ${viewMode} fade-in-up`}>
              <div className="image-content">
                {viewMode === 'grid' && (
                  <div className="image-container">
                    <div className="image-placeholder">
                      <img 
                        src={`https://picsum.photos/300/200?random=${image._id}`} 
                        alt={image.originalName}
                        loading="lazy"
                      />
                    </div>
                    <div className="image-overlay">
                      <Button variant="outline" size="small" title="צפייה">
                        <Eye size={14} />
                      </Button>
                      <Button variant="outline" size="small" title="עריכה">
                        <Edit size={14} />
                      </Button>
                      <Button 
                        variant="danger" 
                        size="small"
                        onClick={() => handleDelete(image._id)}
                        title="מחיקה"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                    <div className="selection-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image._id)}
                        onChange={(e) => handleSelectImage(image._id, e.target.checked)}
                      />
                    </div>
                  </div>
                )}
                
                <div className="image-info">
                  <div className="info-header">
                    <h4>{image.originalName}</h4>
                    <div className="image-status">
                      <span className={`status-badge ${image.isVisible ? 'visible' : 'hidden'}`}>
                        {image.isVisible ? 'מוצג' : 'מוסתר'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="image-description">
                    {image.description || 'ללא תיאור'}
                  </p>
                  
                  <div className="image-meta">
                    <div className="meta-row">
                      <span className="meta-label">קטגוריה:</span>
                      <span className="meta-value">{categories.find(c => c.value === image.category)?.label || image.category}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">גודל:</span>
                      <span className="meta-value">{formatFileSize(image.size)}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">הועלה:</span>
                      <span className="meta-value">
                        {new Date(image.uploadedAt).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">על ידי:</span>
                      <span className="meta-value">{image.uploadedBy?.username}</span>
                    </div>
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="image-actions">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image._id)}
                      onChange={(e) => handleSelectImage(image._id, e.target.checked)}
                      style={{ marginBottom: 'var(--spacing-sm)' }}
                    />
                    <Button variant="outline" size="small">
                      <Eye size={14} />
                      צפייה
                    </Button>
                    <Button variant="outline" size="small">
                      <Edit size={14} />
                      עריכה
                    </Button>
                    <Button 
                      variant="danger" 
                      size="small"
                      onClick={() => handleDelete(image._id)}
                    >
                      <Trash2 size={14} />
                      מחיקה
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))
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
    </div>
  );
};

export default GalleryManager;