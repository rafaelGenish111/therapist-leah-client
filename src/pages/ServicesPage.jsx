import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Check, Phone } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'swedish-massage',
      title: 'עיסוי שוודי קלאסי',
      category: 'relaxation',
      duration: '60 דקות',
      price: '₪300',
      description: 'עיסוי מרגיע העוזר להפחית מתח ולשפר את זרימת הדם. מתאים לכל הגילאים ומושלם לחיי היומיום המתוחים.',
      benefits: [
        'הפחתת מתח ולחץ',
        'שיפור זרימת הדם',
        'הרפיית שרירים',
        'שיפור איכות השינה'
      ],
      suitableFor: 'מתאים לכולם, במיוחד למי שמחפש רגיעה והרפיה'
    },
    {
      id: 'deep-tissue',
      title: 'עיסוי רקמות עמוקות',
      category: 'therapeutic',
      duration: '75 דקות',
      price: '₪400',
      description: 'טיפול ממוקד לשחרור מתחים עמוקים וכאבים כרוניים. משתמש בטכניקות לחץ חזק להגעה לשכבות עמוקות של השריר.',
      benefits: [
        'שחרור מתחים כרוניים',
        'הקלה בכאבי גב ועצירה',
        'שיפור טווח התנועה',
        'טיפול בנקודות הדק'
      ],
      suitableFor: 'מתאים לאנשים עם כאבים כרוניים או מתחים עמוקים'
    },
    {
      id: 'sports-massage',
      title: 'עיסוי ספורטיבי',
      category: 'sports',
      duration: '60 דקות',
      price: '₪350',
      description: 'עיסוי מותאם לספורטאים ואנשים פעילים. מתמקד בשיקום, מניעת פציעות והכנה לפעילות גופנית.',
      benefits: [
        'מניעת פציעות',
        'שיקום מהיר יותר',
        'שיפור הביצועים',
        'הכנה לתחרויות'
      ],
      suitableFor: 'ספורטאים ואנשים פעילים גופנית'
    },
    {
      id: 'pregnancy-massage',
      title: 'עיסוי להריון',
      category: 'specialized',
      duration: '60 דקות',
      price: '₪320',
      description: 'עיסוי עדין ובטוח לנשים בהריון. מסייע בהפחתת אי נוחות, נפיחות וכאבי גב הנפוצים בהריון.',
      benefits: [
        'הפחתת נפיחות',
        'הקלה בכאבי גב',
        'שיפור מצב הרוח',
        'הכנה ללידה'
      ],
      suitableFor: 'נשים בהריון החל מהשבוע ה-12'
    },
    {
      id: 'reflexology',
      title: 'רפלקסולוגיה',
      category: 'alternative',
      duration: '45 דקות',
      price: '₪250',
      description: 'טיפול בנקודות רפלקס בכפות הרגליים המקושרות לאיברים שונים בגוף. עוזר לאיזון כללי של הגוף.',
      benefits: [
        'איזון מערכות הגוף',
        'שיפור זרימת אנרגיה',
        'הפחתת מתח',
        'חיזוק מערכת החיסון'
      ],
      suitableFor: 'כולם, במיוחד מי שמחפש טיפול הוליסטי'
    },
    {
      id: 'hot-stone',
      title: 'עיסוי אבנים חמות',
      category: 'luxury',
      duration: '90 דקות',
      price: '₪450',
      description: 'עיסוי מפנק עם אבנים חמות המסייעות להרפיה עמוקה ושחרור מתחים. חוויה טיפולית יוקרתית.',
      benefits: [
        'הרפיה עמוקה מאוד',
        'שיפור זרימת הדם',
        'הפחתת כאבי שרירים',
        'חוויה מפנקת'
      ],
      suitableFor: 'מי שמחפש חוויה מפנקת ורגועה'
    }
  ];

  const categories = [
    { id: 'all', label: 'כל הטיפולים' },
    { id: 'relaxation', label: 'הרפיה' },
    { id: 'therapeutic', label: 'טיפולי' },
    { id: 'sports', label: 'ספורט' },
    { id: 'specialized', label: 'מתמחה' },
    { id: 'alternative', label: 'רפואה משלימה' },
    { id: 'luxury', label: 'פינוק' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const packages = [
    {
      title: 'חבילת הרפיה',
      description: '4 עיסויים שוודיים',
      originalPrice: '₪1,200',
      discountPrice: '₪1,000',
      saving: '₪200',
      validity: '6 חודשים'
    },
    {
      title: 'חבילת טיפול',
      description: '3 עיסויי רקמות עמוקות',
      originalPrice: '₪1,200',
      discountPrice: '₪1,050',
      saving: '₪150',
      validity: '4 חודשים'
    },
    {
      title: 'חבילת ספורט',
      description: '5 עיסויים ספורטיביים',
      originalPrice: '₪1,750',
      discountPrice: '₪1,400',
      saving: '₪350',
      validity: '8 חודשים'
    }
  ];

  return (
    <div className="services-page">
      <div className="container">
        {/* Page Header */}
        <section className="services-hero">
          <h1>הטיפולים שלנו</h1>
          <p>מגוון טיפולי עיסוי מקצועיים המותאמים לצרכיך האישיים</p>
        </section>

        {/* Category Filter */}
        <section className="category-filter">
          <div className="filter-buttons">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                size="small"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid">
          {filteredServices.map((service) => (
            <Card key={service.id} className="service-card">
              <div className="service-header">
                <div className="service-title-price">
                  <h3>{service.title}</h3>
                  <div className="price-duration">
                    <span className="price">{service.price}</span>
                    <span className="duration">
                      <Clock size={16} />
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-benefits">
                <h4>יתרונות הטיפול:</h4>
                <ul>
                  {service.benefits.map((benefit, index) => (
                    <li key={index}>
                      <Check size={16} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="suitable-for">
                <strong>מתאים עבור:</strong> {service.suitableFor}
              </div>

              <div className="service-actions">
                <Button variant="primary" size="small">
                  <Phone size={16} />
                  קבע טיפול
                </Button>
                <Button variant="outline" size="small">
                  פרטים נוספים
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Packages Section */}
        <section className="packages-section">
          <div className="section-header">
            <h2>חבילות טיפולים</h2>
            <p>חסכו כסף עם החבילות המיוחדות שלנו</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <Card key={index} className="package-card">
                <div className="package-badge">
                  <Star size={16} />
                  חסכון של {pkg.saving}
                </div>
                
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
                
                <div className="package-pricing">
                  <span className="original-price">{pkg.originalPrice}</span>
                  <span className="discount-price">{pkg.discountPrice}</span>
                </div>
                
                <div className="package-details">
                  <div className="validity">תוקף: {pkg.validity}</div>
                </div>
                
                <Button variant="primary" className="package-btn">
                  רכישת חבילה
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <Card className="faq-card">
            <h2>שאלות נפוצות</h2>
            <div className="faq-content">
              <div className="faq-item">
                <h4>כמה זמן לוקח טיפול?</h4>
                <p>רוב הטיפולים נמשכים בין 45-90 דקות, בהתאם לסוג הטיפול שנבחר.</p>
              </div>
              <div className="faq-item">
                <h4>איך להכין את עצמי לטיפול?</h4>
                <p>מומלץ להגיע רגועים, לשתות מים לפני ואחרי הטיפול, ולהימנע מאכילה כבדה שעתיים לפני.</p>
              </div>
              <div className="faq-item">
                <h4>האם הטיפולים בטוחים?</h4>
                <p>כל הטיפולים מבוצעים על ידי מטפלת מוסמכת ובטוחים לחלוטין. נקבל מידע רפואי רלוונטי לפני הטיפול.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="services-cta">
          <Card className="cta-card">
            <h2>מוכנים לקבוע טיפול?</h2>
            <p>צרו קשר עוד היום ונתחיל את המסע שלכם לרווחה מיטבית</p>
            <div className="cta-buttons">
              <Button variant="primary" size="large">
                <Phone size={20} />
                050-123-4567
              </Button>
              <Button variant="outline" size="large" as={Link} to="/contact">
                יצירת קשר
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;