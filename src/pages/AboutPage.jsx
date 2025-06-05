import { Link } from 'react-router-dom';
import { Award, Heart, Users, Clock, Star, CheckCircle, Phone, Calendar, Sparkles, Target, BookOpen, Shield } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  const credentials = [
    {
      title: 'השכלה מקצועית',
      description: 'תעודת מטפלת מוסמכת בעיסוי רפואי מבית ספר מוביל',
      icon: <Award size={32} />,
      color: 'primary'
    },
    {
      title: 'ניסיון עשיר',
      description: 'למעלה מ-10 שנות ניסיון בטיפול בלקוחות מכל הגילאים',
      icon: <Clock size={32} />,
      color: 'secondary'
    },
    {
      title: 'גישה אישית',
      description: 'כל טיפול מותאם אישית לצרכים הייחודיים של המטופל',
      icon: <Heart size={32} />,
      color: 'accent'
    },
    {
      title: 'מטופלים מרוצים',
      description: 'מאות מטופלים שחזרו לשגרת חיים בריאה ואיכותית',
      icon: <Users size={32} />,
      color: 'success'
    }
  ];

  const values = [
    {
      title: 'מקצועיות',
      description: 'שמירה על הסטנדרטים הגבוהים ביותר בכל טיפול, עם עדכון מתמיד של הידע והטכניקות',
      icon: <Shield size={24} />
    },
    {
      title: 'אמפתיה',
      description: 'הבנה עמוקה של הצרכים האישיים של כל מטופל והתאמת הטיפול בהתאם',
      icon: <Heart size={24} />
    },
    {
      title: 'חדשנות',
      description: 'שילוב טכניקות מסורתיות מוכחות עם שיטות מודרניות ומתקדמות',
      icon: <Sparkles size={24} />
    },
    {
      title: 'יעילות',
      description: 'התמקדות בתוצאות מדידות ושיפור ממשי באיכות החיים של המטופלים',
      icon: <Target size={24} />
    }
  ];

  const education = [
    {
      title: 'תעודת מטפלת מוסמכת בעיסוי רפואי',
      institution: 'בית ספר לעיסוי רפואי - ירושלים',
      year: '2013',
      description: 'קורס מקיף של 1000 שעות הכולל אנטומיה, פיזיולוגיה וטכניקות עיסוי מתקדמות'
    },
    {
      title: 'קורס התמחות בעיסוי ספורטיבי',
      institution: 'המכון הישראלי לעיסוי ספורטיבי',
      year: '2015',
      description: 'התמחות בטיפול בפציעות ספורט ושיקום ספורטאים מקצועיים'
    },
    {
      title: 'קורס טכניקות עיסוי מתקדמות',
      institution: 'האקדמיה הישראלית לרפואה משלימה',
      year: '2017',
      description: 'לימוד טכניקות חדשניות ושיטות טיפול משולבות'
    },
    {
      title: 'השתלמויות שנתיות',
      institution: 'כנסים וקורסי העשרה מקצועיים',
      year: '2013-2024',
      description: 'השתתפות קבועה בכנסים מקצועיים ועדכון ידע שוטף'
    }
  ];

  const achievements = [
    { number: '500+', label: 'מטופלים מרוצים', icon: <Users size={24} /> },
    { number: '10+', label: 'שנות ניסיון', icon: <Award size={24} /> },
    { number: '95%', label: 'שיפור מדווח', icon: <Target size={24} /> },
    { number: '1000+', label: 'שעות הכשרה', icon: <BookOpen size={24} /> }
  ];

  const testimonialHighlights = [
    '"ליאה שינתה לי את החיים! אחרי שנים של כאבי גב, סוף סוף מצאתי מטפלת שמבינה בדיוק מה אני צריכה."',
    '"הגישה המקצועית והחמה של ליאה עזרה לי לחזור לפעילות ספורטיבה ברמה הגבוהה ביותר."',
    '"לא רק שהטיפולים יעילים, אלא שכל פגישה היא חוויה מרגיעה ומחדשת כוחות."'
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <Star size={16} />
                <span>מטפלת מוסמכת</span>
              </div>
              <h1>פגשו את ליאה גניש</h1>
              <p className="hero-subtitle">
                מטפלת מוסמכת עם ניסיון של למעלה מ-10 שנים בתחום הטיפולי עיסוי והרפואה המשלימה
              </p>
              <p className="hero-description">
                ברוכים הבאים לקליניקה שלי! אני ליאה גניש, מטפלת מוסמכת המתמחה בטיפולי עיסוי ורפואה משלימה.
                בקליניקה שלי במרכז תל אביב, אני מספקת טיפולים מותאמים אישית המשלבים טכניקות מסורתיות ומודרניות
                כדי לעזור לכם להשיג רווחה מיטבית.
              </p>
              <div className="hero-cta">
                <Link to="/contact" className="btn btn--primary btn--large">
                  <Calendar size={20} />
                  קבעו פגישת ייעוץ
                </Link>
                <a href="tel:050-123-4567" className="btn btn--outline btn--large">
                  <Phone size={20} />
                  050-123-4567
                </a>
              </div>
            </div>
            <div className="hero-image">
              <div className="profile-image">
                <div className="image-placeholder">
                  <Heart size={48} />
                  <span>תמונה של ליאה גניש</span>
                </div>
                <div className="image-decorations">
                  <div className="decoration decoration--1"></div>
                  <div className="decoration decoration--2"></div>
                  <div className="decoration decoration--3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-number">{achievement.number}</div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="credentials-section">
        <div className="container">
          <div className="section-header">
            <h2>המומחיות שלי</h2>
            <p>השכלה, ניסיון וגישה מקצועית המבטיחים טיפול ברמה הגבוהה ביותר</p>
          </div>
          
          <div className="credentials-grid">
            {credentials.map((credential, index) => (
              <div key={index} className={`credential-card credential-card--${credential.color}`}>
                <div className="credential-icon">{credential.icon}</div>
                <h3>{credential.title}</h3>
                <p>{credential.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text">
              <h2>הפילוסופיה הטיפולית שלי</h2>
              <div className="philosophy-paragraphs">
                <p>
                  אני מאמינה כי כל אדם הוא ייחודי ומשקף מורכבות של גוף, נפש ורוח. הגישה הטיפולית שלי מבוססת על הבנה עמוקה
                  של הקשר בין גוף ונפש, ועל היכולת הטבעית של הגוף לרפא את עצמו כאשר מקבל את התמיכה הנכונה.
                </p>
                <p>
                  בכל טיפול אני שואפת ליצור סביבה בטוחה ומרגיעה שבה המטופל יכול להרפות, להשתחרר ממתחים ולחזור למצב של איזון ורווחה.
                  אני משלבת טכניקות שונות בהתאם לצרכים האישיים של כל מטופל, תוך התחשבות במצבו הגופני, הרגשי והמנטלי.
                </p>
                <p>
                  המטרה שלי היא לא רק להקל על כאבים או מתחים, אלא לתת כלים ותובנות שיסייעו למטופלים לשמור על רווחתם גם לאחר הטיפול,
                  ולחזור לפעילותם היומיומית בכוח מחודש ובביטחון מלא.
                </p>
              </div>
            </div>
            <div className="philosophy-highlights">
              <h3>עקרונות הליבה שלי</h3>
              <div className="highlights-list">
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>טיפול מותאם אישית לכל מטופל</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>גישה הוליסטית הרואה את כל האדם</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>שילוב טכניקות מסורתיות ומודרניות</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>יצירת סביבה בטוחה ומרגיעה</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle size={20} />
                  <span>מתן כלים לשמירה על הבריאות</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>הערכים שמנחים אותי</h2>
            <p>העקרונות הבסיסיים שמובילים את עבודתי ויוצרים את החוויה הטיפולית הייחודית</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <div className="section-header">
            <h2>השכלה והסמכות</h2>
            <p>המסלול המקצועי שלי ושמירה על עדכניות מתמדת בתחום</p>
          </div>
          
          <div className="education-timeline">
            {education.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p className="timeline-institution">{item.institution}</p>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Highlights */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>מה אומרים המטופלים</h2>
            <p>מילים חמות ממטופלים שחוו את הטיפולים שלי</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonialHighlights.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">
                  <span className="quote-mark">"</span>
                  <p>{testimonial}</p>
                </div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>מוכנים להתחיל?</h2>
            <p>אשמח לפגוש אתכם ולהתאים עבורכם את הטיפול המושלם לצרכיכם</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn--primary btn--large">
                <Calendar size={20} />
                קבעו פגישת ייעוץ
              </Link>
              <Link to="/services" className="btn btn--outline btn--large">
                צפו בטיפולים
              </Link>
            </div>
            <div className="cta-note">
              <p>הייעוץ הראשוני ללא התחייבות וכולל הסבר על הטיפולים המתאימים לכם</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;