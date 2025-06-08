import { useState } from 'react';
import { Clock, Star, Check, Phone } from 'lucide-react';

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
      benefits: ['הפחתת מתח ולחץ', 'שיפור זרימת הדם', 'הרפיית שרירים', 'שיפור איכות השינה'],
      suitableFor: 'מתאים לכולם, במיוחד למי שמחפש רגיעה והרפיה'
    },
    {
      id: 'deep-tissue',
      title: 'עיסוי רקמות עמוקות',
      category: 'therapeutic',
      duration: '75 דקות',
      price: '₪400',
      description: 'טיפול ממוקד לשחרור מתחים עמוקים וכאבים כרוניים. משתמש בטכניקות לחץ חזק להגעה לשכבות עמוקות של השריר.',
      benefits: ['שחרור מתחים כרוניים', 'הקלה בכאבי גב ועצירה', 'שיפור טווח התנועה', 'טיפול בנקודות הדק'],
      suitableFor: 'מתאים לאנשים עם כאבים כרוניים או מתחים עמוקים'
    },
    {
      id: 'sports-massage',
      title: 'עיסוי ספורטיבי',
      category: 'sports',
      duration: '60 דקות',
      price: '₪350',
      description: 'עיסוי מותאם לספורטאים ואנשים פעילים. מתמקד בשיקום, מניעת פציעות והכנה לפעילות גופנית.',
      benefits: ['מניעת פציעות', 'שיקום מהיר יותר', 'שיפור הביצועים', 'הכנה לתחרויות'],
      suitableFor: 'ספורטאים ואנשים פעילים גופנית'
    },
    {
      id: 'reflexology',
      title: 'רפלקסולוגיה',
      category: 'alternative',
      duration: '45 דקות',
      price: '₪250',
      description: 'טיפול בנקודות רפלקס בכפות הרגליים המקושרות לאיברים שונים בגוף. עוזר לאיזון כללי של הגוף.',
      benefits: ['איזון מערכות הגוף', 'שיפור זרימת אנרגיה', 'הפחתת מתח', 'חיזוק מערכת החיסון'],
      suitableFor: 'כולם, במיוחד מי שמחפש טיפול הוליסטי'
    }
  ];

  const categories = [
    { id: 'all', label: 'כל הטיפולים' },
    { id: 'relaxation', label: 'הרפיה' },
    { id: 'therapeutic', label: 'טיפולי' },
    { id: 'sports', label: 'ספורט' },
    { id: 'alternative', label: 'רפואה משלימה' }
  ];

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

  const faqItems = [
    {
      question: 'כמה זמן לוקח טיפול?',
      answer: 'רוב הטיפולים נמשכים בין 45-90 דקות, בהתאם לסוג הטיפול שנבחר.'
    },
    {
      question: 'איך להכין את עצמי לטיפול?',
      answer: 'מומלץ להגיע רגועים, לשתות מים לפני ואחרי הטיפול, ולהימנע מאכילה כבדה שעתיים לפני.'
    },
    {
      question: 'האם הטיפולים בטוחים?',
      answer: 'כל הטיפולים מבוצעים על ידי מטפלת מוסמכת ובטוחים לחלוטין.'
    },
    {
      question: 'האם ניתן לבטל או לדחות טיפול?',
      answer: 'ניתן לבטל או לדחות טיפול עד 24 שעות לפני המועד הקבוע ללא תשלום.'
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    transition: 'all 0.3s ease',
    border: '2px solid transparent'
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '14px'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: '#D4B5B0',
    color: 'white',
    border: '2px solid #D4B5B0'
  };

  const outlineButtonStyle = {
    ...buttonStyle,
    background: 'transparent',
    color: '#D4B5B0',
    border: '2px solid #D4B5B0'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '60px 40px', 
        background: 'linear-gradient(135deg, #F5E6E3 0%, #F0E0DD 100%)', 
        borderRadius: '12px', 
        marginBottom: '40px' 
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#4A3429' }}>
          הטיפולים שלנו
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#8B6F66', maxWidth: '600px', margin: '0 auto' }}>
          מגוון טיפולי עיסוי מקצועיים המותאמים לצרכיך האישיים
        </p>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '40px 0', textAlign: 'center' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          padding: '24px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              style={selectedCategory === category.id ? primaryButtonStyle : outlineButtonStyle}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '32px', 
        margin: '60px 0' 
      }}>
        {filteredServices.map((service) => (
          <div key={service.id} style={{
            ...cardStyle,
            ':hover': { transform: 'translateY(-8px)', borderColor: '#D4B5B0' }
          }}>
            <div style={{ 
              marginBottom: '24px', 
              borderBottom: '1px solid #F5E6E3', 
              paddingBottom: '24px' 
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start', 
                marginBottom: '16px' 
              }}>
                <h3 style={{ margin: '0', fontSize: '1.25rem', color: '#4A3429' }}>
                  {service.title}
                </h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#D4B5B0' 
                  }}>
                    {service.price}
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px', 
                    fontSize: '0.875rem', 
                    color: '#B89C94',
                    background: '#F5E6E3',
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}>
                    <Clock size={16} />
                    {service.duration}
                  </div>
                </div>
              </div>
            </div>

            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              marginBottom: '24px', 
              color: '#8B6F66' 
            }}>
              {service.description}
            </p>

            <div style={{ 
              marginBottom: '24px',
              padding: '24px',
              background: '#F5E6E3',
              borderRadius: '12px',
              borderRight: '4px solid #D4B5B0'
            }}>
              <h4 style={{ 
                fontSize: '1.125rem', 
                marginBottom: '16px', 
                color: '#4A3429' 
              }}>
                יתרונות הטיפול
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                {service.benefits.map((benefit, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    marginBottom: '8px',
                    fontSize: '0.875rem',
                    color: '#8B6F66'
                  }}>
                    <Check size={16} style={{ color: '#22C55E' }} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ 
              fontSize: '0.875rem',
              color: '#8B6F66',
              background: '#F5E6E3',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '24px'
            }}>
              <strong style={{ color: '#D4B5B0' }}>מתאים עבור:</strong> {service.suitableFor}
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              justifyContent: 'space-between' 
            }}>
              <button style={{ ...primaryButtonStyle, flex: '1' }}>
                <Phone size={16} />
                קבע טיפול
              </button>
              <button style={{ ...outlineButtonStyle, flex: '1' }}>
                פרטים נוספים
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Packages Section */}
      <section style={{ 
        padding: '60px 40px',
        background: 'linear-gradient(135deg, #F5E6E3 0%, white 100%)',
        borderRadius: '16px',
        margin: '60px 0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '1.875rem', marginBottom: '16px', color: '#4A3429' }}>
            חבילות טיפולים
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#8B6F66' }}>
            חסכו כסף עם החבילות המיוחדות שלנו
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px' 
        }}>
          {packages.map((pkg, index) => (
            <div key={index} style={{
              ...cardStyle,
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Star size={16} />
                חסכון של {pkg.saving}
              </div>
              
              <h3 style={{ margin: '40px 0 16px 0', color: '#4A3429' }}>
                {pkg.title}
              </h3>
              <p style={{ color: '#8B6F66', marginBottom: '24px' }}>
                {pkg.description}
              </p>
              
              <div style={{ 
                margin: '24px 0',
                padding: '24px',
                background: '#F5E6E3',
                borderRadius: '12px'
              }}>
                <span style={{ 
                  textDecoration: 'line-through',
                  color: '#B89C94',
                  fontSize: '1.125rem',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  {pkg.originalPrice}
                </span>
                <span style={{ 
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  color: '#D4B5B0',
                  display: 'block'
                }}>
                  {pkg.discountPrice}
                </span>
              </div>
              
              <div style={{ 
                marginBottom: '24px',
                fontSize: '0.875rem',
                color: '#8B6F66'
              }}>
                תוקף: {pkg.validity}
              </div>
              
              <button style={{
                ...primaryButtonStyle,
                width: '100%',
                padding: '16px 32px',
                fontSize: '1.125rem'
              }}>
                רכישת חבילה
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '60px 0' }}>
        <div style={{ ...cardStyle, maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '32px', 
            color: '#4A3429', 
            fontSize: '1.875rem' 
          }}>
            שאלות נפוצות
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            {faqItems.map((item, index) => (
              <div key={index} style={{
                padding: '24px',
                border: '2px solid #F5E6E3',
                borderRadius: '12px',
                background: 'white'
              }}>
                <h4 style={{ 
                  color: '#4A3429', 
                  marginBottom: '16px', 
                  fontSize: '1.125rem' 
                }}>
                  {item.question}
                </h4>
                <p style={{ 
                  color: '#8B6F66', 
                  margin: '0', 
                  lineHeight: '1.7' 
                }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '60px 0' }}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #D4B5B0 0%, #B89C94 100%)',
          color: 'white'
        }}>
          <h2 style={{ color: 'white', marginBottom: '16px', fontSize: '1.875rem' }}>
            מוכנים לקבוע טיפול?
          </h2>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            marginBottom: '32px', 
            fontSize: '1.125rem' 
          }}>
            צרו קשר עוד היום ונתחיל את המסע שלכם לרווחה מיטבית
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <button style={{
              ...buttonStyle,
              background: 'white',
              color: '#D4B5B0',
              padding: '16px 32px',
              fontSize: '1.125rem',
              minWidth: '180px'
            }}>
              <Phone size={20} />
              050-123-4567
            </button>
            <button style={{
              ...buttonStyle,
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '16px 32px',
              fontSize: '1.125rem',
              minWidth: '180px'
            }}>
              יצירת קשר
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;