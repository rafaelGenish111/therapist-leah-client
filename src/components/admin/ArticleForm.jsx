import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { X, Save, Eye, Upload, Tag } from 'lucide-react';
import { articlesApi } from '../../services/api';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

const ArticleForm = ({ article, onClose, onSave }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      isPublished: article?.isPublished ?? true,
    }
  });

  // Initialize form with existing article data
  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        content: article.content,
        isPublished: article.isPublished,
      });

      if (article.tags) {
        setTags(article.tags);
      }

      if (article.image) {
        setImagePreview(`${import.meta.env.VITE_API_URL}/uploads/${article.image}`);
      }
    }
  }, [article, reset]);

  // Create/Update mutations
  const createMutation = useMutation(articlesApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-articles');
      toast.success('המאמר נוצר בהצלחה');
      if (onSave) onSave();
    },
    onError: (error) => {
      toast.error(error.message || 'שגיאה ביצירת המאמר');
    }
  });

  const updateMutation = useMutation(
    (data) => articlesApi.update(article._id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-articles');
        toast.success('המאמר עודכן בהצלחה');
        if (onSave) onSave();
      },
      onError: (error) => {
        toast.error(error.message || 'שגיאה בעדכון המאמר');
      }
    }
  );

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('isPublished', data.isPublished);
      formData.append('tags', JSON.stringify(tags));

      // Handle image upload
      const imageInput = document.getElementById('image-upload');
      if (imageInput?.files?.[0]) {
        formData.append('image', imageInput.files[0]);
      }

      if (article) {
        await updateMutation.mutateAsync(formData);
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error) {
      // Error handled by mutation
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('גודל הקובץ חייב להיות קטן מ-5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const watchedContent = watch('content', '');
  const wordCount = watchedContent.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="article-form-overlay">
      <div className="article-form-container">
        <Card className="article-form">
          {/* Header */}
          <div className="form-header">
            <h2>{article ? 'עריכת מאמר' : 'מאמר חדש'}</h2>
            <Button variant="ghost" onClick={onClose} className="close-btn">
              <X size={20} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="article-form-content">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title">כותרת המאמר *</label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: 'כותרת נדרשת',
                  minLength: {
                    value: 5,
                    message: 'הכותרת חייבת להכיל לפחות 5 תווים'
                  },
                  maxLength: {
                    value: 200,
                    message: 'הכותרת חייבת להכיל עד 200 תווים'
                  }
                })}
                className={errors.title ? 'error' : ''}
                placeholder="הכנס כותרת מעניינת למאמר"
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>תמונה למאמר</label>
              <div className="image-upload-area">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="תצוגה מקדימה" />
                    <div className="image-overlay">
                      <Button
                        type="button"
                        variant="outline"
                        size="small"
                        onClick={() => document.getElementById('image-upload').click()}
                      >
                        <Upload size={16} />
                        שנה תמונה
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="upload-placeholder"
                    onClick={() => document.getElementById('image-upload').click()}
                  >
                    <Upload size={48} />
                    <p>לחץ להעלאת תמונה</p>
                    <small>JPG, PNG או GIF עד 5MB</small>
                  </div>
                )}
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="form-group">
              <label htmlFor="content">תוכן המאמר *</label>
              <textarea
                id="content"
                rows="12"
                {...register('content', {
                  required: 'תוכן נדרש',
                  minLength: {
                    value: 50,
                    message: 'התוכן חייב להכיל לפחות 50 תווים'
                  },
                  maxLength: {
                    value: 10000,
                    message: 'התוכן חייב להכיל עד 10,000 תווים'
                  }
                })}
                className={errors.content ? 'error' : ''}
                placeholder="כתוב את תוכן המאמר כאן..."
              />
              <div className="content-stats">
                <span className="word-count">{wordCount} מילים</span>
                <span className="char-count">{watchedContent.length}/10,000 תווים</span>
              </div>
              {errors.content && (
                <span className="error-message">{errors.content.message}</span>
              )}
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>תגיות</label>
              <div className="tags-input-container">
                <div className="tags-input-group">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="הוסף תגית..."
                    className="tag-input"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="small"
                    onClick={addTag}
                    disabled={!tagInput.trim()}
                  >
                    <Tag size={16} />
                    הוסף
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="tags-list">
                    {tags.map((tag, index) => (
                      <span key={index} className="tag-item">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="tag-remove"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Publishing Options */}
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register('isPublished')}
                />
                <span className="checkmark"></span>
                פרסם מאמר מיד
              </label>
              <small className="help-text">
                אם לא מסומן, המאמר יישמר כטיוטה
              </small>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                ביטול
              </Button>

              <Button
                type="button"
                variant="ghost"
                disabled={isSubmitting}
              >
                <Eye size={16} />
                תצוגה מקדימה
              </Button>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="small" />
                    שומר...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    {article ? 'עדכן מאמר' : 'שמור מאמר'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ArticleForm;