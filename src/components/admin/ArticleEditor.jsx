import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Save, ArrowRight, Upload, X, Eye } from 'lucide-react';
import { articlesApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

const ArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditing = Boolean(id);

    const [previewMode, setPreviewMode] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        defaultValues: {
            title: '',
            content: '',
            isPublished: true
        }
    });

    // טעינת מאמר קיים לעריכה
    const { data: article, isLoading } = useQuery(
        ['article', id],
        () => articlesApi.getById(id),
        {
            enabled: isEditing,
            onSuccess: (data) => {
                setValue('title', data.title);
                setValue('content', data.content);
                setValue('isPublished', data.isPublished);
                setTags(data.tags || []);
                if (data.image) {
                    setImagePreview(`${import.meta.env.VITE_API_URL}/uploads/${data.image}`);
                }
            }
        }
    );

    // יצירת/עדכון מאמר
    const mutation = useMutation(
        (formData) => isEditing
            ? articlesApi.update(id, formData)
            : articlesApi.create(formData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('admin-articles');
                toast.success(isEditing ? 'המאמר עודכן בהצלחה' : 'המאמר נוצר בהצלחה');
                navigate('/admin/articles');
            },
            onError: (error) => {
                toast.error(error.message || 'שגיאה בשמירת המאמר');
            }
        }
    );

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('isPublished', data.isPublished);
        formData.append('tags', JSON.stringify(tags));

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        mutation.mutate(formData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('גודל הקובץ חייב להיות קטן מ-5MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast.error('יש להעלות קובץ תמונה בלבד');
                return;
            }

            setSelectedImage(file);

            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
    };

    const addTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
            setTags([...tags, trimmedTag]);
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

    const watchedContent = watch('content');
    const watchedTitle = watch('title');

    if (isLoading) {
        return (
            <div className="article-editor">
                <div className="loading-container">
                    <Spinner size="large" />
                    <p>טוען מאמר...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="article-editor">
            <div className="editor-header">
                <div className="header-left">
                    <Button
                        variant="outline"
                        onClick={() => navigate('/admin/articles')}
                    >
                        <ArrowRight size={16} />
                        חזרה לרשימה
                    </Button>
                </div>

                <div className="header-center">
                    <h1>{isEditing ? 'עריכת מאמר' : 'מאמר חדש'}</h1>
                </div>

                <div className="header-right">
                    <Button
                        variant="outline"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        <Eye size={16} />
                        {previewMode ? 'עריכה' : 'תצוגה מקדימה'}
                    </Button>
                </div>
            </div>

            {previewMode ? (
                <Card className="preview-container">
                    <div className="article-preview">
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt={watchedTitle}
                                className="preview-image"
                            />
                        )}
                        <h1 className="preview-title">{watchedTitle || 'כותרת המאמר'}</h1>
                        {tags.length > 0 && (
                            <div className="preview-tags">
                                {tags.map((tag, index) => (
                                    <span key={index} className="preview-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="preview-content">
                            {watchedContent ? (
                                watchedContent.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))
                            ) : (
                                <p className="empty-content">תוכן המאמר יופיע כאן...</p>
                            )}
                        </div>
                    </div>
                </Card>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="editor-form">
                    <div className="form-grid">
                        {/* עמודה ראשית */}
                        <div className="main-column">
                            <Card className="editor-card">
                                <div className="form-group">
                                    <label htmlFor="title">כותרת המאמר *</label>
                                    <input
                                        type="text"
                                        id="title"
                                        {...register('title', {
                                            required: 'כותרת נדרשת',
                                            maxLength: {
                                                value: 200,
                                                message: 'הכותרת חייבת להכיל פחות מ-200 תווים'
                                            }
                                        })}
                                        className={errors.title ? 'error' : ''}
                                        placeholder="הכנס כותרת מעניינת למאמר"
                                    />
                                    {errors.title && (
                                        <span className="error-message">{errors.title.message}</span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="content">תוכן המאמר *</label>
                                    <textarea
                                        id="content"
                                        rows="20"
                                        {...register('content', {
                                            required: 'תוכן נדרש',
                                            minLength: {
                                                value: 50,
                                                message: 'התוכן חייב להכיל לפחות 50 תווים'
                                            }
                                        })}
                                        className={errors.content ? 'error' : ''}
                                        placeholder="כתוב את תוכן המאמר כאן... &#10;&#10;אתה יכול להשתמש בפסקאות נפרדות ע&quot;י לחיצה על Enter"
                                    />
                                    {errors.content && (
                                        <span className="error-message">{errors.content.message}</span>
                                    )}
                                    <div className="content-stats">
                                        {watchedContent?.length || 0} תווים
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* עמודה צדדית */}
                        <div className="sidebar-column">
                            <Card className="sidebar-card">
                                <h3>פרסום</h3>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            {...register('isPublished')}
                                        />
                                        <span className="checkmark"></span>
                                        פרסם מאמר באתר
                                    </label>
                                </div>

                                <div className="form-actions">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={mutation.isLoading}
                                        className="save-btn"
                                    >
                                        {mutation.isLoading ? (
                                            <>
                                                <Spinner size="small" />
                                                שומר...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={16} />
                                                {isEditing ? 'עדכן מאמר' : 'שמור מאמר'}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Card>

                            <Card className="sidebar-card">
                                <h3>תמונה ראשית</h3>
                                <div className="image-upload">
                                    {imagePreview ? (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="תצוגה מקדימה" />
                                            <button
                                                type="button"
                                                className="remove-image"
                                                onClick={removeImage}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="upload-placeholder">
                                            <Upload size={32} />
                                            <p>העלה תמונה למאמר</p>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="file-input"
                                        id="image-upload"
                                    />
                                    <label htmlFor="image-upload" className="upload-btn">
                                        {imagePreview ? 'החלף תמונה' : 'בחר תמונה'}
                                    </label>
                                </div>
                            </Card>

                            <Card className="sidebar-card">
                                <h3>תגיות</h3>
                                <div className="tags-section">
                                    <div className="tag-input-group">
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
                                        >
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
                                                        className="remove-tag"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ArticleEditor;