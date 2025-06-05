import { Link } from 'react-router-dom';
import { Phone, Calendar, Heart, Star, ArrowLeft, Users, Award, Clock, Target } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const services = [
    {
      icon: <Heart size={48} />,
      title: 'עיסוי שוודי קלאסי',
      description: 'עיסוי מרגיע ומשחרר המותאם לכל גוף ומסייע בהפחתת מתח ולחץ יומיומי'
    },
    {
      icon: <Target size={48} />,
      title: 'עיסוי ספורטיבי',
      description: 'טיפול מקצועי לספורטאים ופעילים המסייע במניעת פציעות ושיקום מהיר'
    },
    {
      icon: <Star size={48} />,
      title: 'עיסוי רקמות עמוקות',
      description: 'שחרור מתחים עמוקים וכאבים כרוניים באמצעות טכניקות מתקדמות'
    }
  ];

  const stats = [
    { number: '500+', label: 'מטופלים מרוצים', icon: <Users size={32} /> },
    { number: '10+', label: 'שנות ניסיון', icon: <Award size={32} /> },
    { number: '95%', label: 'שיפור מדווח', icon: <Target size={32} /> },
    { number: '24/7', label: 'זמינות לשאלות', icon: <Clock size={32} /> }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <br />
              <span className="highlight">לבחור להרגיש טוב</span>
            </h1>
            <p className="hero-description">
            </p>
            <div className="cta-buttons">
              <a href="tel:050-123-4567" className="btn btn--primary btn--large">
                <Phone size={20} />
                קבע תור עכשיו
              </a>
              <Link to="/about" className="btn btn--secondary btn--large">
                למד עוד עלינו
                <ArrowLeft size={20} />
              </Link>
            </div>
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
              <div key={index} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          <div className="services-cta">
            <Link to="/services" className="btn btn--outline btn--large">
              צפה בכל הטיפולים
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>פגשו את ליאה גניש</h2>
              <p>
                מטפלת מוסמכת עם למעלה מ-10 שנות ניסיון בטיפולי עיסוי ורפואה משלימה. 
                אני מאמינה כי כל אדם ייחודי ומגישה טיפול מותאם אישית המשלב טכניקות 
                מסורתיות ומודרניות לקבלת התוצאות הטובות ביותר.
              </p>
              <p>
                בקליניקה שלי במרכז תל אביב, אני יוצרת סביבה בטוחה ומרגיעה שבה תוכלו 
                להרפות, להשתחרר ממתחים ולחזור למצב של איזון ורווחה מיטבית.
              </p>
              <Link to="/about" className="btn btn--primary">
                קראו עוד עליי
              </Link>
            </div>
            <div className="about-image">
              <div className="placeholder-image">
                <span>תמונה של ליאה גניש</span>
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
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>מוכנים לקבוע טיפול?</h2>
            <p>צרו קשר עוד היום ונתחיל את המסע שלכם לרווחה מיטבית</p>
            <div className="cta-buttons">
              <a href="tel:050-123-4567" className="btn btn--primary btn--large">
                <Phone size={20} />
                050-123-4567
              </a>
              <Link to="/contact" className="btn btn--outline btn--large">
                יצירת קשר
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;