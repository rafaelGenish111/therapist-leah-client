import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Heart
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import './ContantPage.css'

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form data:', data);
      setIsSubmitted(true);
      toast.success('ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.');
      reset();
      
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error('שגיאה בשליחת ההודעה. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: 'התקשרו אלינו',
      info: '054-941-4947',
      action: 'tel:0549414947',
      description: 'זמינה לשיחה ישירה'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'ווטסאפ',
      info: 'שלחו הודעה',
      action: 'https://wa.me/972549414947?text=היי, אני מעוניין/ת לקבוע טיפול',
      description: 'צ\'אט מהיר ונוח'
    },
    {
      icon: <Mail size={24} />,
      title: 'אימייל',
      info: 'info@leahgenish.co.il',
      action: 'mailto:info@leahgenish.co.il',
      description: 'לפניות מפורטות'
    }
  ];

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      name: 'Instagram',
      url: 'https://instagram.com/leah_genish_clinic',
      color: '#E4405F'
    },
    {
      icon: <Facebook size={20} />,
      name: 'Facebook', 
      url: 'https://facebook.com/leahgenishclinic',
      color: '#1877F2'
    },
    
  ];

  return (
    <div className="contact-page">
      <div className="container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>יצירת קשר</h1>
          <p>נשמח לענות על כל שאלה ולעזור לכם לקבוע טיפול</p>
        </section>

        {/* Quick Contact */}
        <section className="quick-contact-section">
          <div className="section-header">
            <h2>דרכי יצירת קשר</h2>
            <p>בחרו את הדרך הנוחה לכם ביותר</p>
          </div>
          
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <Card key={index} className="contact-method-card" hover>
                <div className="method-icon">{method.icon}</div>
                <h3>{method.title}</h3>
                <p className="method-info">{method.info}</p>
                <p className="method-description">{method.description}</p>
                <Button 
                  variant="primary" 
                  size="small"
                  as="a" 
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                >
                  {method.title === 'ווטסאפ' ? 'שלח הודעה' : 'צור קשר'}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <div className="contact-content-grid">
          {/* Contact Form */}
          <section className="contact-form-section">
            <Card className="contact-form-card">
              <h2>שלחו לנו הודעה</h2>
              
              {isSubmitted ? (
                <div className="success-message">
                  <CheckCircle size={48} />
                  <h3>ההודעה נשלחה בהצלחה!</h3>
                  <p>תודה על פנייתכם. נחזור אליכם בהקדם.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>שם פרטי *</label>
                      <input
                        type="text"
                        {...register('firstName', {
                          required: 'שם פרטי נדרש',
                          minLength: { value: 2, message: 'שם קצר מדי' }
                        })}
                        placeholder="הכנס שם פרטי"
                      />
                      {errors.firstName && (
                        <span className="error">{errors.firstName.message}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>שם משפחה *</label>
                      <input
                        type="text"
                        {...register('lastName', {
                          required: 'שם משפחה נדרש',
                          minLength: { value: 2, message: 'שם קצר מדי' }
                        })}
                        placeholder="הכנס שם משפחה"
                      />
                      {errors.lastName && (
                        <span className="error">{errors.lastName.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>אימייל *</label>
                      <input
                        type="email"
                        {...register('email', {
                          required: 'אימייל נדרש',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'אימייל לא תקין'
                          }
                        })}
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <span className="error">{errors.email.message}</span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label>טלפון</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="050-123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>נושא</label>
                    <select {...register('subject')}>
                      <option value="">בחר נושא</option>
                      <option value="appointment">קביעת תור</option>
                      <option value="pricing">מחירים</option>
                      <option value="question">שאלה כללית</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>הודעה *</label>
                    <textarea
                      rows="4"
                      {...register('message', {
                        required: 'הודעה נדרשת',
                        minLength: { value: 10, message: 'הודעה קצרה מדי' }
                      })}
                      placeholder="ספרו לנו כיצד נוכל לעזור לכם..."
                    />
                    {errors.message && (
                      <span className="error">{errors.message.message}</span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'שולח...' : (
                      <>
                        <Send size={16} />
                        שלח הודעה
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </section>

          {/* Contact Info */}
          <aside className="contact-info-section">
            <Card className="info-card">
              <h3>פרטי הקליניקה</h3>
              
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <strong>כתובת</strong>
                  <p>פתח תקווה</p>
                </div>
              </div>

              <div className="info-item">
                <Clock size={20} />
                <div>
                  <strong>שעות פעילות</strong>
                  <p>ראשון - רביעי: 9:00-20:00<br />חמישי: 9:00-16:00<br />שישי - שבת: סגור</p>
                </div>
              </div>

              <div className="info-item">
                <Heart size={20} />
                <div>
                  <strong>מקרי חירום</strong>
                  <p>במקרה של כאב דחוף, פנו למיון הקרוב או התקשרו למוקד 101</p>
                </div>
              </div>
            </Card>

            <Card className="social-card">
              <h3>עקבו אחרינו</h3>
              <p>טיפים ועדכונים בזמן אמת</p>
              
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </a>
                ))}
              </div>
            </Card>
          </aside>
        </div>

        {/* CTA Section */}
        <section className="contact-cta">
          <Card className="cta-card">
            <h2>מוכנים לקבוע טיפול?</h2>
            <p>הצטרפו לאלפי הלקוחות המרוצים שלנו</p>
            
            <div className="cta-buttons">
              <Button 
                variant="primary" 
                size="large"
                as="a"
                href="https://wa.me/972501234567?text=היי, אני מעוניין/ת לקבוע טיפול"
                target="_blank"
              >
                <MessageCircle size={20} />
                ווטסאפ
              </Button>
              
              <Button 
                variant="outline" 
                size="large"
                as="a"
                href="tel:0501234567"
              >
                <Phone size={20} />
                התקשר
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;