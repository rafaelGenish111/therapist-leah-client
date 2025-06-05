import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Phone, Calendar } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const publicNavItems = [
    { path: '/', label: 'בית' },
    { path: '/about', label: 'אודות' },
    { path: '/services', label: 'טיפולים' },
    { path: '/articles', label: 'מאמרים' },
    { path: '/contact', label: 'יצירת קשר' },
  ];

  const adminNavItems = [
    { path: '/admin', label: 'לוח בקרה' },
    { path: '/admin/articles', label: 'ניהול מאמרים' },
    { path: '/admin/gallery', label: 'גלריה' },
    { path: '/admin/declarations', label: 'הצהרות בריאות' },
  ];

  const navItems = isAuthenticated ? adminNavItems : publicNavItems;

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <div className="logo-circle">
              <span>ל</span>
            </div>
            <div className="logo-text">
              <h1>ליאה גניש</h1>
              <p>הבחירה להרגיש טוב</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <div className="nav-items">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActivePath(item.path) ? 'nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="header-cta">
              {!isAuthenticated && (
                <a href="tel:050-123-4567" className="phone-btn">
                  <Phone size={16} />
                  050-123-4567
                </a>
              )}
              
              {isAuthenticated ? (
                <div className="user-menu">
                  <div className="user-info">
                    <div className="user-avatar">
                      <User size={16} />
                    </div>
                    <div className="user-details">
                      <span className="user-name">שלום {user?.username}</span>
                      <span className="user-role">{user?.role === 'admin' ? 'מנהלת' : 'מטפלת'}</span>
                    </div>
                  </div>
                  <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={16} />
                    יציאה
                  </button>
                </div>
              ) : (
                <Link to="/login" className="login-btn">
                  <User size={16} />
                  כניסה למטפלת
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="תפריט ניווט"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav--open' : ''}`}>
          <div className="mobile-nav-content">
            {/* Mobile Nav Items */}
            <div className="mobile-nav-items">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${isActivePath(item.path) ? 'mobile-nav-link--active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile CTA */}
            <div className="mobile-cta">
              {!isAuthenticated && (
                <a href="tel:050-123-4567" className="mobile-phone-btn" onClick={closeMobileMenu}>
                  <Phone size={18} />
                  050-123-4567
                </a>
              )}
              
              {isAuthenticated ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <div className="user-avatar">
                      <User size={18} />
                    </div>
                    <div>
                      <span className="mobile-user-name">שלום {user?.username}</span>
                      <span className="mobile-user-role">{user?.role === 'admin' ? 'מנהלת' : 'מטפלת'}</span>
                    </div>
                  </div>
                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    יציאה
                  </button>
                </div>
              ) : (
                <Link to="/login" className="mobile-login-btn" onClick={closeMobileMenu}>
                  <User size={18} />
                  כניסה למטפלת
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Backdrop */}
        {mobileMenuOpen && (
          <div className="mobile-backdrop" onClick={closeMobileMenu} />
        )}
      </div>
    </header>
  );
};

export default Header;