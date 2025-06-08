import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Heart, Star, Award } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: <Phone size={18} />,
      label: 'טלפון',
      value: '050-123-4567',
      link: 'tel:050-123-4567'
    },
    {
      icon: <Mail size={18} />,
      label: 'אימייל',
      value: 'info@leahgenish.co.il',
      link: 'mailto:info@leahgenish.co.il'
    },
    {
      icon: <MapPin size={18} />,
      label: 'כתובת',
      value: 'רחוב הרצל 123, תל אביב',
      link: 'https://maps.google.com'
    }
  ];

  const workingHours = [
    { day: 'ראשון - רביעי', hours: '9:00-20:00' },
    { day: 'חמישי', hours: '9:00-16:00' },
    { day: 'שישי - שבת', hours: 'סגור' }
  ];

  const quickLinks = [
    { to: '/about', label: 'אודות' },
    { to: '/services', label: 'טיפולים' },
    { to: '/articles', label: 'מאמרים' },
    {to: '/gallery', label: 'גלריה'},
    {to: '/health-declaration', label: 'הצהרת בריאות'},
    { to: '/contact', label: 'יצירת קשר' }
  ];

  const features = [
    {
      icon: <Heart size={20} />,
      text: 'טיפול אישי ומקצועי'
    },
    {
      icon: <Star size={20} />,
      text: 'ניסיון של למעלה מ-10 שנים'
    },
    {
      icon: <Award size={20} />,
      text: 'מטפלת מוסמכת ומנוסה'
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-section footer-brand">
              <div className="footer-logo">
                <div className="logo-circle">ל</div>
                <div className="logo-text">
                  <h3>ליאה גניש</h3>
                  <p>הבחירה להרגיש טוב</p>
                </div>
              </div>
              <p className="footer-description">
                קליניקה מקצועית לטיפולי עיסוי ורפואה משלימה במרכז תל אביב. 
                אנו מתמחים בטיפולים אישיים המותאמים לכל מטופל ומטופלת.
              </p>
              <div className="footer-features">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>קישורים מהירים</h4>
              <div className="quick-links">
                {quickLinks.map((link, index) => (
                  <Link key={index} to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>יצירת קשר</h4>
              <div className="contact-info">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-item">
                    <div className="contact-icon">{info.icon}</div>
                    <div className="contact-details">
                      <span className="contact-label">{info.label}</span>
                      {info.link ? (
                        <a href={info.link} className="contact-value">
                          {info.value}
                        </a>
                      ) : (
                        <span className="contact-value">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="footer-section">
              <h4>שעות פעילות</h4>
              <div className="hours-info">
                <div className="hours-icon">
                  <Clock size={18} />
                </div>
                <div className="hours-list">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="hours-item">
                      <span className="day">{schedule.day}</span>
                      <span className="hours">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="emergency-note">
                <p>
                  <strong>מקרי חירום:</strong><br />
                  למקרי דחיפות ניתן להתקשר גם מחוץ לשעות הפעילות
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} ליאה גניש. כל הזכויות שמורות.</p>
            </div>
            <div className="footer-links">
              <Link to="/privacy" className="footer-bottom-link">מדיניות פרטיות</Link>
              <Link to="/terms" className="footer-bottom-link">תנאי שימוש</Link>
              <Link to="/accessibility" className="footer-bottom-link">נגישות</Link>
            </div>
            <div className="developed-by">
              <p>פותח באהבה למען הרווחה שלכם</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;