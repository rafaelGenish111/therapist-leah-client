import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Don't render header on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

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
    { path: '/gallery', label: 'גלריה' },
    { path: '/contact', label: 'יצירת קשר' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <img className='logo-circle' src="/images/favicon.ico" alt="" />
            <div className="logo-text">
              <h1>לאה גניש</h1>
              <p>הבחירה להרגיש טוב</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-btn ${isActivePath(item.path) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/admin" className="admin-link">
                  אזור ניהול
                </Link>
                <span className="user-greeting">
                  שלום {user?.username}
                </span>
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  יציאה
                </button>
              </div>
            ) : (
              // <Link to="/login" className="login-btn">
              //   <User size={16} />
              //   כניסה למטפלת
              // </Link>
              <div></div>
            )}
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
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-btn ${isActivePath(item.path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="mobile-user-menu">
                <Link to="/admin" className="mobile-admin-link" onClick={closeMobileMenu}>
                  אזור ניהול
                </Link>
                <span className="mobile-user-greeting">
                  שלום {user?.username}
                </span>
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  <LogOut size={16} />
                  יציאה
                </button>
              </div>
            ) : (
              <Link to="/login" className="mobile-login-btn" onClick={closeMobileMenu}>
                <User size={16} />
                כניסה למטפלת
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;