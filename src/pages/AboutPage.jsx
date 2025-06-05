import { Link } from 'react-router-dom';
import { Award, Heart, Users, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AboutPage = () => {
  const credentials = [
    {
      title: 'השכלה מקצועית',
      description: 'תעודת מטפלת מוסמכת בעיסוי רפואי',
      icon: <Award size={24} />
    },
    {
      title: 'ניסיון עשיר',
      description: 'למעלה מ-10 שנות ניסיון בתחום',
      icon: <Clock size={24} />
    },
    {
      title: 'גישה אישית',
      description: 'טיפול מותאם לכל מטופל בנפרד',
      icon: <Heart size={24} />
    },
    {
      title: 'מטופלים מרוצים',
      description: 'מאות מטופלים שחזרו לשגרת חיים בריאה',
      icon: <Users size={24} />
    }
  ];

  const values = [
    {
      title: 'מקצועיות',
      description: 'שמירה על הסטנדרטים הגבוהים ביותר בכל טיפול'
    },
    {
      title: 'אמפתיה',
      description: 'הבנה עמוקה של הצרכים האישיים של כל מטופל'
    },
    {
      title: 'חדשנות',
      description: 'שילוב טכניקות מסורתיות עם שיטות מודרניות'
    },
    {
      title: 'יעילות',
      description: 'התמקדות בתוצאות מדידות ושיפור איכות החיים'
    }
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>אודות לאה גניש</h1>
              <p className="hero-subtitle">
                מטפלת מוסמכת עם ניסיון של למעלה מ-10 שנים בתחום הטיפולי עיסוי והרפואה המשלימה
              </p>
              <p className="hero-description">
                ברוכים הבאים לקליניקה שלי! אני לאה גניש, מטפלת מוסמכת המתמחה בטיפולי עיסוי ורפואה משלימה.
                בקליניקה שלי במרכز תל אביב, אני מספקת טיפולים מותאמים אישית המשלבים טכניקות מסורתיות ומודרניות
                כדי לעזור לכם להשיג רווחה מיטבית.
              </p>
            </div>
            <div className="hero-image">
              <div className="profile-image">
                <div className="image-placeholder">
                  <span>תמונה של לאה גניש</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="credentials-section">
          <div className="section-header">
            <h2>המומחיות שלי</h2>
            <p>השכלה, ניסיון וגישה מקצועית</p>
          </div>
          
          <div className="credentials-grid">
            {credentials.map((credential, index) => (
              <Card key={index} className="credential-card">
                <div className="credential-icon">{credential.icon}</div>
                <h3>{credential.title}</h3>
                <p>{credential.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <div className="philosophy-content">
            <h2>הפילוסופיה הטיפולית שלי</h2>
            <div className="philosophy-text">
              <p>
                אני מאמינה כי כל אדם הוא ייחודי ומשקף מורכבות של גוף, נפש ורוח. הגישה הטיפולית שלי מבוססת על הבנה עמוקה
                של הקשר בין גוף ונפש, ועל היכולת הטבעית של הגוף לרפא את עצמו.
              </p>
              <p>
                בכל טיפול אני שואפת ליצור סביבה בטוחה ומרגיעה שבה המטופל יכול להרפות, להשתחרר ממתחים ולחזור למצב של איזון ורווחה.
                אני משלבת טכניקות שונות בהתאם לצרכים האישיים של כל מטופל.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-header">
            <h2>הערכים שמנחים אותי</h2>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <Card key={index} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <Card className="education-card">
            <h2>השכלה והסמכות</h2>
            <div className="education-content">
              <div className="education-item">
                <h4>תעודת מטפלת מוסמכת בעיסוי רפואי</h4>
                <p>בית ספר לעיסוי רפואי - ירושלים</p>
              </div>
              <div className="education-item">
                <h4>קורס התמחות בעיסוי ספורטיבי</h4>
                <p>המכון הישראלי לעיסוי ספורטיבי</p>
              </div>
              <div className="education-item">
                <h4>קורס טכניקות עיסוי מתקדמות</h4>
                <p>האקדמיה הישראלית לרפואה משלימה</p>
              </div>
              <div className="education-item">
                <h4>השתלמויות שנתיות</h4>
                <p>השתתפות קבועה בכנסים וקורסי העשרה מקצועיים</p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <Card className="cta-card">
            <h2>מוכנים להתחיל?</h2>
            <p>אשמח לפגוש אתכם ולהתאים עבורכם את הטיפול המושלם</p>
            <div className="cta-buttons">
              <Button variant="primary" size="large" as={Link} to="/contact">
                קבעו פגישת ייעוץ
              </Button>
              <Button variant="outline" size="large" as={Link} to="/services">
                צפו בטיפולים
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;