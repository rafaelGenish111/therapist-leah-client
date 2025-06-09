import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'שם פרטי נדרש';
    if (!formData.lastName.trim()) newErrors.lastName = 'שם משפחה נדרש';
    if (!formData.email.trim()) {
      newErrors.email = 'אימייל נדרש';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    if (!formData.message.trim()) newErrors.message = 'הודעה נדרשת';
    if (!formData.consent) newErrors.consent = 'יש לאשר את תנאי השימוש';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form data:', formData);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'טלפון',
      details: ['054-9414947', '03-123-4567'],
      link: 'tel:0501234567'
    },
    {
      icon: '✉️',
      title: 'אימייל',
      details: ['info@leahgenish.co.il'],
      link: 'mailto:info@leahgenish.co.il'
    },
    {
      icon: '📍',
      title: 'כתובת',
      details: ['רחוב הרצל 123', 'פתח תקווה-יפו', 'קומה 3, דירה 12']
    },
    {
      icon: '🕐',
      title: 'שעות פעילות',
      details: [
        'ראשון - רביעי: 9:00-20:00',
        'חמישי: 9:00-16:00',
        'שישי - שבת: סגור'
      ]
    }
  ];

  const workingHours = [
    { day: 'ראשון', hours: '9:00 - 20:00', available: true },
    { day: 'שני', hours: '9:00 - 20:00', available: true },
    { day: 'שלישי', hours: '9:00 - 20:00', available: true },
    { day: 'רביעי', hours: '9:00 - 20:00', available: true },
    { day: 'חמישי', hours: '9:00 - 16:00', available: true },
    { day: 'שישי', hours: 'סגור', available: false },
    { day: 'שבת', hours: 'סגור', available: false }
  ];

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #F5E6E3',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    fontFamily: 'inherit'
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#EF4444'
  };

  const buttonStyle = {
    background: '#D4B5B0',
    color: 'white',
    border: 'none',
    padding: '16px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: '#F5E6E3',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#4A3429' }}>
          יצירת קשר
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#8B6F66' }}>
          נשמח לענות על כל שאלה ולעזור לכם לקבוע טיפול
        </p>
      </div>

      {/* CSS for responsive design */}
      <style jsx>{`
        .main-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="main-content">
        {/* Contact Form */}
        <div style={cardStyle}>
          <div style={{ padding: '32px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '32px', color: '#4A3429' }}>
              שלחו לנו הודעה
            </h2>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: '#22C55E', marginBottom: '12px' }}>
                  ההודעה נשלחה בהצלחה!
                </h3>
                <p style={{ color: '#8B6F66' }}>
                  תודה על פנייתכם. נחזור אליכם בהקדם.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name Row */}
                <div className="form-row">
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#8B6F66' }}>
                      שם פרטי *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="הכנס שם פרטי"
                      style={errors.firstName ? errorInputStyle : inputStyle}
                    />
                    {errors.firstName && (
                      <span style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#8B6F66' }}>
                      שם משפחה *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="הכנס שם משפחה"
                      style={errors.lastName ? errorInputStyle : inputStyle}
                    />
                    {errors.lastName && (
                      <span style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Contact Row */}
                <div className="form-row">
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#8B6F66' }}>
                      אימייל *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      style={errors.email ? errorInputStyle : inputStyle}
                    />
                    {errors.email && (
                      <span style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#8B6F66' }}>
                      טלפון
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="054-9414947"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#8B6F66' }}>
                    נושא
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">בחר נושא</option>
                    <option value="appointment">קביעת תור</option>
                    <option value="question">שאלה כללית</option>
                    <option value="pricing">מחירים</option>
                    <option value="packages">חבילות טיפולים</option>
                    <option value="other">אחר</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#8B6F66' }}>
                    הודעה *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="ספרו לנו כיצד נוכל לעזור לכם..."
                    style={errors.message ? errorInputStyle : inputStyle}
                  />
                  {errors.message && (
                    <span style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Consent */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: '1.4'
                  }}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      style={{ marginTop: '2px' }}
                    />
                    אני מסכים/ה לתנאי השימוש ולמדיניות הפרטיות
                  </label>
                  {errors.consent && (
                    <span style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                      {errors.consent}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...buttonStyle,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? '📤 שולח הודעה...' : '📩 שלח הודעה'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Contact Details */}
          <div style={cardStyle}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ marginBottom: '24px', color: '#4A3429' }}>פרטי התקשרות</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {contactInfo.map((info, index) => (
                  <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '1.5rem', marginTop: '4px' }}>{info.icon}</div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#4A3429' }}>
                        {info.title}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {info.details.map((detail, idx) => (
                          <div key={idx} style={{ fontSize: '14px', color: '#8B6F66' }}>
                            {info.link && idx === 0 ? (
                              <a
                                href={info.link}
                                style={{ color: '#D4B5B0', textDecoration: 'none', fontWeight: '500' }}
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div style={cardStyle}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ marginBottom: '20px', color: '#4A3429' }}>שעות פעילות</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {workingHours.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px',
                      borderRadius: '6px',
                      background: '#F5E6E3',
                      opacity: day.available ? 1 : 0.6
                    }}
                  >
                    <span style={{ fontWeight: '500', color: '#4A3429' }}>{day.day}</span>
                    <span style={{ color: '#8B6F66', fontSize: '14px' }}>{day.hours}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#F5E6E3',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#8B6F66'
              }}>
                <p style={{ margin: 0 }}>
                  <strong>הערה:</strong> בחגים ומועדים ייתכנו שינויים בשעות הפעילות.
                  מומלץ לתאם מראש.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div style={{ ...cardStyle, background: '#FEF2F2', border: '1px solid #FECACA' }}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ color: '#EF4444', marginBottom: '12px' }}>מקרי חירום</h2>
              <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '8px', color: '#4A3429' }}>
                במקרה של כאב חריף או פציעה דחופה, פנו למיון הקרוב או התקשרו למוקד 101.
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#4A3429' }}>
                לשאלות דחופות הקשורות לטיפול קיים, ניתן להתקשר גם מחוץ לשעות הפעילות
                ולהשאיר הודעה קולית.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div style={{ marginTop: '40px' }}>
        <div style={cardStyle}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '20px', color: '#4A3429' }}>מיקום הקליניקה</h2>
            <div style={{
              height: '300px',
              background: '#F5E6E3',
              border: '2px dashed #D4B5B0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              color: '#8B6F66',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '3rem' }}>🗺️</div>
              <p>מפה תוטמע כאן</p>
              <button
                style={{
                  background: 'transparent',
                  color: '#D4B5B0',
                  border: '2px solid #D4B5B0',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('https://maps.google.com', '_blank')}
              >
                פתח במפות גוגל
              </button>
            </div>

            <div>
              <h3 style={{ marginBottom: '16px', color: '#4A3429' }}>הגעה לקליניקה</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div style={{
                  padding: '12px',
                  background: '#F5E6E3',
                  borderRadius: '8px'
                }}>
                  <strong style={{ color: '#4A3429' }}>תחבורה ציבורית:</strong>
                  <p style={{ fontSize: '14px', color: '#8B6F66', margin: '4px 0 0 0' }}>
                    אוטובוסים: 4, 18, 61, 142 - עצירה: הרצל/אלנבי
                  </p>
                </div>
                <div style={{
                  padding: '12px',
                  background: '#F5E6E3',
                  borderRadius: '8px'
                }}>
                  <strong style={{ color: '#4A3429' }}>חניה:</strong>
                  <p style={{ fontSize: '14px', color: '#8B6F66', margin: '4px 0 0 0' }}>
                    חניון תשלום ברחוב הרצל, חניה ברחובות הסמוכים
                  </p>
                </div>
                <div style={{
                  padding: '12px',
                  background: '#F5E6E3',
                  borderRadius: '8px'
                }}>
                  <strong style={{ color: '#4A3429' }}>נגישות:</strong>
                  <p style={{ fontSize: '14px', color: '#8B6F66', margin: '4px 0 0 0' }}>
                    הבניין נגיש לכיסאות גלגלים, יש מעלית
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;