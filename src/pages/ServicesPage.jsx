import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Check, Phone, Heart, Leaf, Sparkles, Gift } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import './ServicesPage.css';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 'holistic-massage',
      title: 'עיסוי הוליסטי',
      category: 'wellness',
      duration: '60/90/120 דקות',
      price: '₪350/490/550',
      description: 'עיסוי מקיף המשלב טכניקות מגוונות לטיפול בגוף, נפש ורוח. גישה הוליסטית המתאימה את הטיפול לצרכים האישיים של כל מטופל.',
      priceOptions: [
        { duration: 'שעה', price: '₪350' },
        { duration: 'שעה וחצי', price: '₪490' },
        { duration: 'שעתיים', price: '₪550' }
      ],
      benefits: [
        'איזון אנרגטי של הגוף',
        'שחרור חסימות רגשיות',
        'הפחתת מתח ולחץ',
        'שיפור זרימת הדם',
        'חיזוק מערכת החיסון',
        'תחושת רווחה כללית'
      ],
      suitableFor: 'מתאים לכל מי שמחפש גישה מקיפה לריפוי ורווחה',
      icon: <Heart size={32} />,
      color: 'primary'
    },
    {
      id: 'reflexology',
      title: 'רפלקסולוגיה',
      category: 'therapy',
      duration: '45-60 דקות',
      price: '₪280',
      description: 'טיפול בנקודות רפלקס בכפות הרגליים, כפות הידיים והאוזניים. כל נקודה מחוברת לאיבר או מערכת ספציפית בגוף.',
      benefits: [
        'איזון מערכות הגוף השונות',
        'שיפור זרימת הדם והלימפה',
        'הפחתת כאבים כרוניים',
        'שיפור איכות השינה',
        'חיזוק המערכת העצבית',
        'הרגעה עמוקה'
      ],
      suitableFor: 'מתאים לאנשים עם בעיות בריאות ספציפיות או לשמירה על איזון כללי',
      icon: <Leaf size={32} />,
      color: 'success'
    },
    {
      id: 'ear-candles',
      title: 'נרות הופי',
      category: 'alternative',
      duration: '30-45 דקות',
      price: '₪150',
      description: 'טיפול מסורתי עתיק המשתמש בנרות מיוחדים לניקוי ואיזון האוזניים. הטיפול יוצר תחושת רגיעה ושחרור.',
      benefits: [
        'ניקוי עדין של התעלות',
        'הפחתת לחץ באוזניים',
        'שיפור השמיעה',
        'הקלה על כאבי ראש',
        'איזון לחץ הסינוסים',
        'תחושת קלילות ורעננות'
      ],
      suitableFor: 'מתאים לאנשים עם בעיות אוזניים או סינוסים, או למי שמחפש חוויה מרגיעה',
      icon: <Sparkles size={32} />,
      color: 'warning'
    }
  ];

  const categories = [
    { id: 'all', label: 'כל הטיפולים' },
    { id: 'wellness', label: 'רווחה כללית' },
    { id: 'therapy', label: 'טיפולי' },
    { id: 'alternative', label: 'רפואה משלימה' }
  ];

  const packages = [
    {
      title: 'חבילת איזון',
      description: '3 טיפולי עיסוי הוליסטי (שעה) + רפלקסולוגיה',
      originalPrice: '₪1,330',
      discountPrice: '₪1,150',
      saving: '₪180',
      validity: '4 חודשים',
      popular: true
    },
    {
      title: 'חבילת הרגעה',
      description: '4 טיפולי רפלקסולוגיה + 2 נרות הופי',
      originalPrice: '₪1,420',
      discountPrice: '₪1,200',
      saving: '₪220',
      validity: '5 חודשים',
      popular: false
    },
    {
      title: 'חבילת פינוק שנתית',
      description: '8 טיפולים לבחירה (כל השירותים)',
      originalPrice: '₪2,800',
      discountPrice: '₪2,200',
      saving: '₪600',
      validity: '12 חודשים',
      popular: false
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-page">
      <div className="container">
        {/* Page Header */}
        <section className="services-hero">
          <div className="hero-content">
            <h1>הטיפולים שלי</h1>
            <p className="hero-subtitle">
              גישה הוליסטית לריפוי ורווחה המשלבת חוכמה עתיקה עם טכניקות מודרניות
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <Heart size={20} />
                <span>טיפול אישי ומותאם</span>
              </div>
              <div className="feature-item">
                <Leaf size={20} />
                <span>גישה טבעית והוליסטית</span>
              </div>
              <div className="feature-item">
                <Sparkles size={20} />
                <span>חוויה מרגיעה ומחדשת</span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="category-filter">
          <div className="filter-buttons">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                size="medium"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid">
          {filteredServices.map((service) => (
            <Card key={service.id} className={`service-card service-card--${service.color}`} hover>
              <div className="service-header">
                <div className="service-icon-wrapper">
                  <div className={`service-icon service-icon--${service.color}`}>
                    {service.icon}
                  </div>
                  <div className="service-title-section">
                    <h3>{service.title}</h3>
                    <div className="service-meta">
                      <span className="duration">
                        <Clock size={16} />
                        {service.duration}
                      </span>
                      {service.priceOptions ? (
                        <div className="price-options">
                          {service.priceOptions.map((option, idx) => (
                            <span key={idx} className="price-option">
                              {option.duration}: {option.price}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="price">{service.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-benefits">
                <h4>יתרונות הטיפול:</h4>
                <ul className="benefits-list">
                  {service.benefits.slice(0, 4).map((benefit, index) => (
                    <li key={index}>
                      <Check size={16} />
                      {benefit}
                    </li>
                  ))}
                  {service.benefits.length > 4 && (
                    <li className="more-benefits">
                      <span>ועוד {service.benefits.length - 4} יתרונות נוספים...</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="suitable-for">
                <strong>מתאים עבור:</strong> {service.suitableFor}
              </div>

              <div className="service-actions">
                <Button variant="primary" size="medium">
                  <Phone size={16} />
                  קבע טיפול
                </Button>
                <Button variant="outline" size="medium">
                  פרטים נוספים
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Philosophy Section */}
        <section className="philosophy-section">
          <Card className="philosophy-card">
            <div className="philosophy-content">
              <h2>הפילוסופיה הטיפולית שלי</h2>
              <div className="philosophy-text">
                <p>
                  אני מאמינה בגישה הוליסטית הרואה את האדם כמכלול של גוף, נפש ורוח. 
                  כל טיפול מותאם אישית ומשלב טכניקות מגוונות כדי להביא לאיזון מיטבי.
                </p>
                <p>
                  המטרה שלי היא לא רק להקל על תסמינים, אלא ליצור שינוי עמוק ובר-קיימא 
                  שיוביל לרווחה ואיכות חיים משופרת.
                </p>
              </div>
              <div className="philosophy-principles">
                <div className="principle">
                  <Heart size={24} />
                  <h4>טיפול מהלב</h4>
                  <p>כל טיפול ניתן באהבה ותשומת לב אישית</p>
                </div>
                <div className="principle">
                  <Leaf size={24} />
                  <h4>גישה טבעית</h4>
                  <p>שימוש בכוחות הריפוי הטבעיים של הגוף</p>
                </div>
                <div className="principle">
                  <Sparkles size={24} />
                  <h4>התחדשות</h4>
                  <p>יצירת מרחב בטוח להתחדשות ושחרור</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Packages Section */}
        <section className="packages-section">
          <div className="section-header">
            <h2>חבילות טיפולים</h2>
            <p>חסכו כסף והשקיעו בבריאותכם לטווח הארוך</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`package-card ${pkg.popular ? 'package-card--popular' : ''}`}
              >
                {pkg.popular && (
                  <div className="package-badge">
                    <Star size={16} />
                    הכי פופולרי
                  </div>
                )}
                
                <div className="package-header">
                  <div className="package-icon">
                    <Gift size={32} />
                  </div>
                  <h3>{pkg.title}</h3>
                </div>
                
                <p className="package-description">{pkg.description}</p>
                
                <div className="package-pricing">
                  <span className="original-price">{pkg.originalPrice}</span>
                  <span className="discount-price">{pkg.discountPrice}</span>
                  <span className="savings">חיסכון של {pkg.saving}</span>
                </div>
                
                <div className="package-details">
                  <div className="validity">
                    <Clock size={16} />
                    תוקף: {pkg.validity}
                  </div>
                </div>
                
                <Button 
                  variant={pkg.popular ? 'primary' : 'outline'} 
                  size="large"
                  className="package-btn"
                >
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
                <h4>כמה זמן לוקח כל טיפול?</h4>
                <p>הטיפולים נמשכים בין 30-90 דקות, בהתאם לסוג הטיפול ולצרכים האישיים שלכם.</p>
              </div>
              <div className="faq-item">
                <h4>איך מכינים את עצמנו לטיפול?</h4>
                <p>מומלץ להגיע רגועים, לשתות מים לפני ואחרי הטיפול, ולהימנע מאכילה כבדה שעתיים לפני הטיפול.</p>
              </div>
              <div className="faq-item">
                <h4>האם הטיפולים בטוחים?</h4>
                <p>כל הטיפולים מבוצעים על ידי מטפלת מוסמכת ובטוחים לחלוטין. נקבל מידע רפואי רלוונטי לפני הטיפול.</p>
              </div>
              <div className="faq-item">
                <h4>כמה טיפולים מומלץ לקבל?</h4>
                <p>זה תלוי במטרה האישית שלכם. לרווחה כללית מומלץ טיפול אחד לחודש, ולבעיות ספציפיות נבנה תוכנית טיפולים מותאמת.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="services-cta">
          <Card className="cta-card">
            <div className="cta-content">
              <h2>מוכנים להתחיל את המסע לרווחה?</h2>
              <p>צרו קשר עוד היום ונתחיל יחד את הדרך לאיזון ובריאות מיטבית</p>
              <div className="cta-features">
                <div className="cta-feature">
                  <Check size={16} />
                  <span>ייעוץ ראשוני חינם</span>
                </div>
                <div className="cta-feature">
                  <Check size={16} />
                  <span>התאמה אישית לכל מטופל</span>
                </div>
                <div className="cta-feature">
                  <Check size={16} />
                  <span>מעקב ותמיכה מתמשכת</span>
                </div>
              </div>
              <div className="cta-buttons">
                <Button variant="primary" size="large">
                  <Phone size={20} />
                  050-123-4567
                </Button>
                <Button variant="outline" size="large" as={Link} to="/contact">
                  יצירת קשר
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;