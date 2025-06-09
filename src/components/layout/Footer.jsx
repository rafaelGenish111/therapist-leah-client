import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Heart,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'בית' },
    { to: '/about', label: 'אודות לאה' },
    { to: '/services', label: 'טיפולים' },
    { to: '/articles', label: 'מאמרים' },
    { to: '/contact', label: 'יצירת קשר' }
  ];

  const treatmentLinks = [
    { to: '/services#swedish', label: 'עיסוי שוודי' },
    { to: '/services#deep-tissue', label: 'רקמות עמוקות' },
    { to: '/services#sports', label: 'עיסוי ספורטיבי' },
    { to: '/services#pregnancy', label: 'עיסוי להריון' },
    { to: '/services#reflexology', label: 'רפלקסולוגיה' }
  ];

  const socialLinks = [
    {
      platform: 'facebook',
      url: 'https://facebook.com/leahgenishclinic',
      icon: <Facebook size={20} />,
      label: 'עקבו בפייסבוק'
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/leahgenishclinic',
      icon: <Instagram size={20} />,
      label: 'עקבו באינסטגרם'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/leahgenish',
      icon: <Linkedin size={20} />,
      label: 'התחברו בלינקדאין'
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@leahgenishclinic',
      icon: <Youtube size={20} />,
      label: 'הרשמו לערוץ'
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-circle">
                <img src="/images/favicon.ico" alt="" className="footer-logo-circle" />
              </div>
              <div className="footer-logo-text">
                <h3>לאה גניש</h3>
                <p>הבחירה להרגיש טוב</p>
              </div>
            </div>
            <p className="footer-description">
              קליניקה מקצועית לטיפולי עיסוי ורפואה משלימה במרכז פתח תקווה.
              מעל 10 שנות ניסיון בטיפול מותאם אישית.
            </p>

            {/* Social Media */}
            <div className="social-section">
              <h4>עקבו אחרינו</h4>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link social-link--${social.platform}`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div className="therapist-access">
              <Link to="/login" className="therapist-login-btn">
                <User size={16} />
                <span>כניסה למטפלת</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>קישורים מהירים</h3>
            <nav className="footer-nav">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Treatments */}
          <div className="footer-section">
            <h3>הטיפולים שלנו</h3>
            <nav className="footer-nav">
              {treatmentLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>יצירת קשר</h3>
            <div className="contact-info">
              <a href="tel:0549414947" className="contact-item">
                <Phone size={16} />
                <span>054-941-4947</span>
              </a>
              <a href="mailto:info@leahgenish.co.il" className="contact-item">
                <Mail size={16} />
                <span>info@leahgenish.co.il</span>
              </a>
              <div className="contact-item">
                <MapPin size={16} />
                <span>רחוב הרצל 123, פתח תקווה</span>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <span>ראשון, שלישי, חמישי: 8:30-14:30, 19:30-22:00 <br />
                  שני, רביעי: 10:30-14:30, 19:30-22:00
                </span>

              </div>
            </div>

            {/* Therapist Login */}

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <Heart size={16} className="heart-icon" />
              <span>&copy; {currentYear} לאה גניש. כל הזכויות שמורות.</span>
            </div>
            <div className="footer-links">
              <Link to="/privacy">מדיניות פרטיות</Link>
              <Link to="/terms">תנאי שימוש</Link>
              <Link to="/accessibility">נגישות</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;