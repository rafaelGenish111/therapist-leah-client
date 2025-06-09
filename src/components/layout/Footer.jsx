import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Don't render footer on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const footerSections = [
    {
      title: 'ליאה גניש',
      content: (
        <p>קליניקה מקצועית לטיפולי עיסוי ורפואה משלימה במרכז תל אביב</p>
      )
    },
    {
      title: 'יצירת קשר',
      content: (
        <div className="contact-info">
          <div className="contact-item">
            <Phone size={16} />
            <span>050-123-4567</span>
          </div>
          <div className="contact-item">
            <Mail size={16} />
            <span>info@leahgenish.co.il</span>
          </div>
          <div className="contact-item">
            <MapPin size={16} />
            <span>רחוב הרצל 123, תל אביב</span>
          </div>
        </div>
      )
    },
    {
      title: 'שעות פעילות',
      content: (
        <div className="hours-info">
          <div className="hours-item">
            <Clock size={16} />
            <div>
              <div>ראשון - רביעי: 9:00-20:00</div>
              <div>חמישי: 9:00-16:00</div>
              <div>שישי - שבת: סגור</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'קישורים מהירים',
      content: (
        <div className="quick-links">
          <Link to="/about">אודות</Link>
          <Link to="/services">טיפולים</Link>
          <Link to="/articles">מאמרים</Link>
          <Link to="/contact">יצירת קשר</Link>
        </div>
      )
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              {section.content}
            </div>
          ))}
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} ליאה גניש. כל הזכויות שמורות.</p>
            <div className="footer-links">
              <Link to="/privacy">מדיניות פרטיות</Link>
              <Link to="/terms">תנאי שימוש</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;