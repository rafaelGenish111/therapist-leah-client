import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Upload, Trash2, Eye, Search, Filter } from 'lucide-react';
import { galleryApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

const GalleryManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImages, setSelectedImages] = useState([]);
  
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

  const categories = [
    { value: '', label: 'כל הקטגוריות' },
    { value: 'general', label: 'כללי' },
    { value: 'clinic', label: 'קליניקה' },
    { value: 'treatments', label: 'טיפולים' },
    { value: 'equipment', label: 'ציוד' }
  ];

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

      <div className="images-grid">
        {images.map((image) => (
          <Card key={image._id} className="image-item">
            <div className="image-container">
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${image.filename}`}
                alt={image.originalName}
                loading="lazy"
              />
              <div className="image-overlay">
                <Button variant="outline" size="small">
                  <Eye size={14} />
                </Button>
                <Button 
                  variant="danger" 
                  size="small"
                  onClick={() => handleDelete(image._id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            
            <div className="image-info">
              <h4>{image.originalName}</h4>
              <p>{image.description || 'ללא תיאור'}</p>
              <div className="image-meta">
                <span className="category">{image.category}</span>
                <span className="date">
                  {new Date(image.uploadedAt).toLocaleDateString('he-IL')}
                </span>
              </div>
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

export default GalleryManager;
