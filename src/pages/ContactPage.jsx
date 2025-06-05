import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', data);
      setIsSubmitted(true);
      toast.success('ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.');
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error('שגיאה בשליחת ההודעה. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'טלפון',
      details: ['050-123-4567', '03-123-4567'],
      action: 'tel:0501234567'
    },
    {
      icon: <Mail size={24} />,
      title: 'אימייל',
      details: ['info@leahgenish.co.il'],
      action: 'mailto:info@leahgenish.co.il'
    },
    {
      icon: <MapPin size={24} />,
      title: 'כתובת',
      details: ['רחוב הרצל 123', 'תל אביב-יפו', 'קומה 3, דירה 12'],
      action: 'https://maps.google.com'
    },
    {
      icon: <Clock size={24} />,
      title: 'שעות פעילות',
      details: [
        'ראשון - רביעי: 9:00-20:00',
        'חמישי: 9:00-16:00',
        'שישי - שבת: סגור'
      ]
    }
  ];

  const workingHours = [
    { day: 'ראשון', hours: '9:00 - 20:00', available: true },
    { day: 'שני', hours: '9:00 - 20:00', available: true },
    { day: 'שלישי', hours: '9:00 - 20:00', available: true },
    { day: 'רביעי', hours: '9:00 - 20:00', available: true },
    { day: 'חמישי', hours: '9:00 - 16:00', available: true },
    { day: 'שישי', hours: 'סגור', available: false },
    { day: 'שבת', hours: 'סגור', available: false }
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Page Header */}
        <section className="contact-hero">
          <h1>יצירת קשר</h1>
          <p>נשמח לענות על כל שאלה ולעזור לכם לקבוע טיפול</p>
        </section>

        {/* Main Content */}
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <Card className="contact-form-card">
              <h2>שלחו לנו הודעה</h2>
              
              {isSubmitted ? (
                <div className="success-state">
                  <CheckCircle size={48} className="success-icon" />
                  <h3>ההודעה נשלחה בהצלחה!</h3>
                  <p>תודה על פנייתכם. נחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">שם פרטי *</label>
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName', {
                          required: 'שם פרטי נדרש',
                          minLength: {
                            value: 2,
                            message: 'שם פרטי חייב להכיל לפחות 2 תווים'
                          }
                        })}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="הכנס שם פרטי"
                      />
                      {errors.firstName && (
                        <span className="error-message">{errors.firstName.message}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="lastName">שם משפחה *</label>
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName', {
                          required: 'שם משפחה נדרש',
                          minLength: {
                            value: 2,
                            message: 'שם משפחה חייב להכיל לפחות 2 תווים'
                          }
                        })}
                        className={errors.lastName ? 'error' : ''}
                        placeholder="הכנס שם משפחה"
                      />
                      {errors.lastName && (
                        <span className="error-message">{errors.lastName.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">אימייל *</label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'אימייל נדרש',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'כתובת אימייל לא תקינה'
                          }
                        })}
                        className={errors.email ? 'error' : ''}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <span className="error-message">{errors.email.message}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">טלפון</label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', {
                          pattern: {
                            value: /^[0-9+\-\s()]+$/,
                            message: 'מספר טלפון לא תקין'
                          }
                        })}
                        className={errors.phone ? 'error' : ''}
                        placeholder="050-123-4567"
                      />
                      {errors.phone && (
                        <span className="error-message">{errors.phone.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">נושא</label>
                    <select
                      id="subject"
                      {...register('subject')}
                      className="form-select"
                    >
                      <option value="">בחר נושא</option>
                      <option value="appointment">קביעת תור</option>
                      <option value="question">שאלה כללית</option>
                      <option value="pricing">מחירים</option>
                      <option value="packages">חבילות טיפולים</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">הודעה *</label>
                    <textarea
                      id="message"
                      rows="5"
                      {...register('message', {
                        required: 'הודעה נדרשת',
                        minLength: {
                          value: 10,
                          message: 'ההודעה חייבת להכיל לפחות 10 תווים'
                        }
                      })}
                      className={errors.message ? 'error' : ''}
                      placeholder="ספרו לנו כיצד נוכל לעזור לכם..."
                    />
                    {errors.message && (
                      <span className="error-message">{errors.message.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register('consent', {
                          required: 'יש לאשר את תנאי השימוש'
                        })}
                      />
                      <span className="checkmark"></span>
                      אני מסכים/ה לתנאי השימוש ולמדיניות הפרטיות
                    </label>
                    {errors.consent && (
                      <span className="error-message">{errors.consent.message}</span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isSubmitting}
                    className="submit-btn"
                  >
                    {isSubmitting ? (
                      <>שולח הודעה...</>
                    ) : (
                      <>
                        <Send size={16} />
                        שלח הודעה
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <Card className="contact-info-card">
              <h2>פרטי התקשרות</h2>
              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      <div className="info-details">
                        {info.details.map((detail, idx) => (
                          <div key={idx} className="detail-item">
                            {info.action && idx === 0 ? (
                              <a href={info.action} className="contact-link">
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Working Hours */}
            <Card className="hours-card">
              <h2>שעות פעילות</h2>
              <div className="hours-grid">
                {workingHours.map((day, index) => (
                  <div key={index} className={`hour-item ${!day.available ? 'closed' : ''}`}>
                    <span className="day">{day.day}</span>
                    <span className="hours">{day.hours}</span>
                  </div>
                ))}
              </div>
              <div className="hours-note">
                <p>
                  <strong>הערה:</strong> בחגים ומועדים ייתכנו שינויים בשעות הפעילות.
                  מומלץ לתאם מראש.
                </p>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="emergency-card">
              <h2>מקרי חירום</h2>
              <p>
                במקרה של כאב חריף או פציעה דחופה, פנו למיון הקרוב או התקשרו למוקד 101.
              </p>
              <p>
                לשאלות דחופות הקשורות לטיפול קיים, ניתן להתקשר גם מחוץ לשעות הפעילות
                ולהשאיר הודעה קולית.
              </p>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <section className="map-section">
          <Card className="map-card">
            <h2>מיקום הקליניקה</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <MapPin size={48} />
                <p>מפה תוטמע כאן</p>
                <Button variant="outline" size="small">
                  פתח במפות גוגל
                </Button>
              </div>
            </div>
            <div className="location-details">
              <h3>הגעה לקליניקה</h3>
              <div className="transport-info">
                <div className="transport-item">
                  <strong>תחבורה ציבורית:</strong>
                  <p>אוטובוסים: 4, 18, 61, 142 - עצירה: הרצל/אלנבי</p>
                </div>
                <div className="transport-item">
                  <strong>חניה:</strong>
                  <p>חניון תשלום ברחוב הרצל, חניה ברחובות הסמוכים</p>
                </div>
                <div className="transport-item">
                  <strong>נגישות:</strong>
                  <p>הבניין נגיש לכיסאות גלגלים, יש מעלית</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;