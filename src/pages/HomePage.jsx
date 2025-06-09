import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Phone,
  ArrowLeft,
  Heart,
  Star,
  Award,
  Users,
  Clock,
  CheckCircle,
  Leaf
} from 'lucide-react';
import { galleryApi, articlesApi } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// Hook לטיפול בטעינת תמונות
const useImageLoader = () => {
  const [loadingImages, setLoadingImages] = useState(new Set());

  const handleImageLoad = (imageId) => {
    setLoadingImages(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  };

  const handleImageStart = (imageId) => {
    setLoadingImages(prev => new Set([...prev, imageId]));
  };

  return { loadingImages, handleImageLoad, handleImageStart };
};

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { loadingImages, handleImageLoad, handleImageStart } = useImageLoader();

  // Fetch gallery images for preview
  const { data: galleryData } = useQuery(
    'galleryPreview',
    () => galleryApi.getAll({ limit: 6 }),
    { staleTime: 10 * 60 * 1000 }
  );

  // Fetch recent articles
  const { data: articlesData } = useQuery(
    'articlesPreview',
    () => articlesApi.getAll({ limit: 3 }),
    { staleTime: 10 * 60 * 1000 }
  );

  const testimonials = [
    {
      name: "רחל כהן",
      text: "לאה פשוט קסומה! אחרי מספר טיפולים הכאבים בגב נעלמו לחלוטין. מקצועיות ברמה גבוהה!",
      rating: 5,
      treatment: "עיסוי רקמות עמוקות"
    },
    {
      name: "דוד לוי",
      text: "המקום הכי מרגיע בפתח תקווה. לאה יודעת בדיוק מה הגוף צריך. ממלץ בחום!",
      rating: 5,
      treatment: "עיסוי שוודי"
    },
    {
      name: "מירי אברהם",
      text: "טיפול מדהים במהלך ההריון. לאה מבינה בדיוק איך לטפל בזמן מעין זה. תודה רבה!",
      rating: 4,
      treatment: "עיסוי להריון"
    }
  ];

  const services = [
    {
      icon: <Leaf size={32} />,
      title: "עיסוי שוודי קלאסי",
      description: "עיסוי מרגיע העוזר להפחית מתח ולשפר את זרימת הדם",
      duration: "60 דקות",
      price: "₪300"
    },
    {
      icon: <Heart size={32} />,
      title: "עיסוי רקמות עמוקות",
      description: "טיפול ממוקד לשחרור מתחים עמוקים וכאבים כרוניים",
      duration: "75 דקות",
      price: "₪400",
      popular: true
    },
    {
      icon: <Star size={32} />,
      title: "עיסוי ספורטיבי",
      description: "עיסוי מותאם לספורטאים ואנשים פעילים",
      duration: "60 דקות",
      price: "₪350"
    }
  ];

  const stats = [
    { icon: <Users size={24} />, number: "500+", label: "מטופלים מרוצים" },
    { icon: <Award size={24} />, number: "10+", label: "שנות ניסיון" },
    { icon: <Star size={24} />, number: "4.9", label: "דירוג ממוצע" },
    { icon: <Clock size={24} />, number: "24/7", label: "זמינות לשאלות" }
  ];

  const benefits = [
    "הפחתת כאבים ומתחים",
    "שיפור איכות השינה",
    "חיזוק מערכת החיסון"
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const galleryImages = galleryData?.images || [];
  const recentArticles = articlesData?.articles || [];

  // תמונות fallback יפות לגלריה
  const fallbackImages = [
    {
      _id: 'fallback-1',
      originalName: 'חדר טיפולים ראשי',
      description: 'חדר הטיפולים הראשי עם אווירה מרגיעה',
      category: 'clinic',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&w=400&h=300&fit=crop&auto=format'
    },
    {
      _id: 'fallback-2',
      originalName: 'חדר עיסוי מקצועי',
      description: 'חדר מיוחד לטיפולי עיסוי ורפואה משלימה',
      category: 'treatments',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=400&h=300&fit=crop&auto=format'
    },
    {
      _id: 'fallback-3',
      originalName: 'אזור קבלה נעים',
      description: 'אזור קבלת המטופלים עם ישיבה נוחה',
      category: 'clinic',
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&w=400&h=300&fit=crop&auto=format'
    },
    {
      _id: 'fallback-4',
      originalName: 'ציוד מקצועי מתקדם',
      description: 'ציוד מתקדם לטיפולים מקצועיים',
      category: 'equipment',
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=400&h=300&fit=crop&auto=format'
    },
    {
      _id: 'fallback-5',
      originalName: 'פינת הרפיה שקטה',
      description: 'פינה שקטה להרפיה לפני ואחרי הטיפול',
      category: 'atmosphere',
      url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&w=400&h=300&fit=crop&auto=format'
    },
    {
      _id: 'fallback-6',
      originalName: 'נוף מרגיע לגינה',
      description: 'נוף מרגיע לגינה מחלונות הקליניקה',
      category: 'atmosphere',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=400&h=300&fit=crop&auto=format'
    }
  ];

  // פונקציה לקבלת תמונות לתצוגה
  const getGalleryImages = () => {
    if (galleryImages.length > 0) {
      return galleryImages.slice(0, 6);
    }
    return fallbackImages;
  };

  // פונקציה לקבלת URL של תמונה
  const getImageUrl = (image) => {
    if (image.url) {
      return image.url; // תמונת fallback
    }
    return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/${image.filename}`;
  };

  // פונקציה לטיפול בשגיאות טעינת תמונות
  const handleImageError = (e, image) => {
    // אם התמונה לא נטענה, נציג תמונת fallback
    if (!image.url && fallbackImages[0]) {
      e.target.src = fallbackImages[0].url;
    }
  };

  // פונקציה לתרגום שמות קטגוריות
  const getCategoryName = (category) => {
    const categories = {
      general: 'כללי',
      clinic: 'הקליניקה',
      treatments: 'טיפולים',
      equipment: 'ציוד',
      atmosphere: 'אווירה'
    };
    return categories[category] || 'הקליניקה';
  };

  return (
    <div className="home-page">
      {/* Simple Background Pattern */}
      <div className="background-pattern"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <br />
                <span className="highlight">לאה גניש</span>
              </h1>

              <p className="hero-description">
                הבחירה להרגיש טוב - טיפולי עיסוי מקצועיים ורפואה משלימה
                בפתח תקווה. חוויה טיפולית מותאמת אישית לכל מטופל.
              </p>

              <div className="hero-features">
                {benefits.map((benefit, index) => (
                  <div key={index} className="hero-feature">
                    <CheckCircle size={16} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="cta-buttons">
                <Button variant="primary" size="large">
                  <Phone size={20} />
                  קבע תור עכשיו
                </Button>
                <Button variant="outline" size="large" as={Link} to="/about">
                  למד עוד
                  <ArrowLeft size={16} />
                </Button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-container">
                <div className="hero-image">
                  <div className="image-placeholder">
                    <span>
                      <img className='image-placeholder' src="../../public/images/leah_picture.jpg" alt="" width={'600px'} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>הטיפולים שלנו</h2>
            <p>מגוון טיפולים מקצועיים המותאמים לצרכיך האישיים</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <Card key={index} className={`service-card ${service.popular ? 'popular' : ''}`} hover>
                {service.popular && (
                  <div className="popular-badge">
                    <Star size={14} />
                    פופולרי
                  </div>
                )}

                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-details">
                  <div className="service-duration">
                    <Clock size={16} />
                    {service.duration}
                  </div>
                  <div className="service-price">{service.price}</div>
                </div>

                <Button variant="outline" className="service-btn">
                  פרטים נוספים
                  <ArrowLeft size={16} />
                </Button>
              </Card>
            ))}
          </div>

          <div className="services-cta">
            <Button variant="primary" size="large" as={Link} to="/services">
              צפה בכל הטיפולים
              <ArrowLeft size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-preview-section">
        <div className="container">
          <div className="section-header">
            <h2>הציצו לתוך הקליניקה</h2>
            <p>אווירה מרגיעה ומקצועית הממתינה לכם</p>
          </div>

          <div className="gallery-grid">
            {getGalleryImages().map((image, index) => (
              <div
                key={image._id || `fallback-${index}`}
                className={`gallery-item gallery-item-${index + 1} ${loadingImages.has(image._id) ? 'loading' : ''}`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={image.originalName || image.description || 'תמונה מהקליניקה'}
                  loading="lazy"
                  onError={(e) => handleImageError(e, image)}
                  onLoadStart={() => handleImageStart(image._id)}
                  onLoad={() => handleImageLoad(image._id)}
                />
                <div className="gallery-overlay">
                  <span>{getCategoryName(image.category)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="gallery-cta">
            <Button variant="outline" as={Link} to="/gallery">
              צפה בגלריה המלאה
              <ArrowLeft size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>מה אומרים המטופלים שלנו</h2>
          </div>

          <div className="testimonials-container">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="stars">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <p>"{testimonials[currentTestimonial].text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonials[currentTestimonial].name}</strong>
                  <span>{testimonials[currentTestimonial].treatment}</span>
                </div>
              </div>
            </div>

            <div className="testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`המלצה ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Preview */}
      {recentArticles.length > 0 && (
        <section className="articles-preview-section">
          <div className="container">
            <div className="section-header">
              <h2>מאמרים ועצות מקצועיות</h2>
              <p>מידע חשוב לבריאותכם ורווחתכם</p>
            </div>

            <div className="articles-grid">
              {recentArticles.map((article) => (
                <Card key={article._id} className="article-card" hover>
                  {article.image && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/uploads/${article.image}`}
                      alt={article.title}
                      className="article-image"
                    />
                  )}
                  <div className="article-content">
                    <h3>{article.title}</h3>
                    <p>{article.content.substring(0, 100)}...</p>
                    <div className="article-meta">
                      <span>{new Date(article.createdAt).toLocaleDateString('he-IL')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="articles-cta">
              <Button variant="outline" as={Link} to="/articles">
                קרא עוד מאמרים
                <ArrowLeft size={16} />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="contact-cta-section">
        <div className="container">
          <Card className="cta-card">
            <div className="cta-content">
              <h2>מוכנים לקבוע טיפול?</h2>
              <p>צרו קשר עוד היום ונתחיל את המסע שלכם לרווחה מיטבית</p>
              <div className="cta-buttons">
                <Button variant="primary" size="large">
                  <Phone size={20} />
                  054-9414947
                </Button>
                <Button variant="outline" size="large" as={Link} to="/contact">
                  יצירת קשר
                  <ArrowLeft size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;