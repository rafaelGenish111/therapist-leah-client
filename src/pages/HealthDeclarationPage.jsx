import { useState } from 'react';

const HealthDeclarationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    healthConditions: {
      skinDiseases: false,
      heartDiseases: false,
      diabetes: false,
      bloodPressure: false,
      spineProblems: false,
      fracturesOrSprains: false,
      fluFeverInflammation: false,
      epilepsy: false,
      chronicMedications: false,
      pregnancy: false,
      surgeries: {
        hasSurgeries: false,
        details: ''
      },
      otherMedicalIssues: {
        hasOtherIssues: false,
        details: ''
      }
    },
    declarationConfirmed: false,
    signature: ''
  });
  const [errors, setErrors] = useState({});

  const healthConditions = [
    { key: 'skinDiseases', label: 'מחלות עור' },
    { key: 'heartDiseases', label: 'מחלות לב' },
    { key: 'diabetes', label: 'סוכרת' },
    { key: 'bloodPressure', label: 'לחץ דם גבוה/נמוך' },
    { key: 'spineProblems', label: 'בעיות עמוד השדרה' },
    { key: 'fracturesOrSprains', label: 'שברים או נקעים' },
    { key: 'fluFeverInflammation', label: 'שפעת/חום/דלקת' },
    { key: 'epilepsy', label: 'אפילפסיה' },
    { key: 'chronicMedications', label: 'נטילת תרופות קבועות' },
    { key: 'pregnancy', label: 'הריון' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Personal info validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'שם מלא נדרש';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'שם חייב להכיל לפחות 2 תווים';
    }

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'מספר תעודת זהות נדרש';
    } else if (!/^\d{9}$/.test(formData.idNumber.trim())) {
      newErrors.idNumber = 'מספר תעודת זהות חייב להכיל 9 ספרות';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'מספר טלפון נדרש';
    } else if (!/^0\d{1,2}-?\d{7}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'מספר טלפון לא תקין (לדוגמה: 050-1234567)';
    }

    // Surgery details validation
    if (formData.healthConditions.surgeries.hasSurgeries && !formData.healthConditions.surgeries.details.trim()) {
      newErrors.surgeryDetails = 'נדרש פירוט הניתוחים';
    }

    // Other medical issues validation
    if (formData.healthConditions.otherMedicalIssues.hasOtherIssues && !formData.healthConditions.otherMedicalIssues.details.trim()) {
      newErrors.otherIssuesDetails = 'נדרש פירוט הבעיות הרפואיות';
    }

    // Declaration confirmation
    if (!formData.declarationConfirmed) {
      newErrors.declarationConfirmed = 'יש לאשר את ההצהרה';
    }

    // Signature validation
    if (!formData.signature.trim()) {
      newErrors.signature = 'חתימה נדרשת לאישור ההצהרה';
    } else if (formData.signature.trim().length < 2) {
      newErrors.signature = 'חתימה חייבת להכיל לפחות 2 תווים';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleHealthConditionChange = (condition, value) => {
    setFormData(prev => ({
      ...prev,
      healthConditions: {
        ...prev.healthConditions,
        [condition]: value
      }
    }));
  };

  const handleSpecialConditionChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      healthConditions: {
        ...prev.healthConditions,
        [type]: {
          ...prev.healthConditions[type],
          [field]: value
        }
      }
    }));

    // Clear related errors
    if (type === 'surgeries' && field === 'details') {
      setErrors(prev => ({ ...prev, surgeryDetails: '' }));
    }
    if (type === 'otherMedicalIssues' && field === 'details') {
      setErrors(prev => ({ ...prev, otherIssuesDetails: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Real API call to your backend
      const response = await fetch('/api/health-declarations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'שגיאה בשליחת ההצהרה');
      }

      const result = await response.json();
      console.log('Declaration submitted successfully:', result);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          idNumber: '',
          phoneNumber: '',
          healthConditions: {
            skinDiseases: false,
            heartDiseases: false,
            diabetes: false,
            bloodPressure: false,
            spineProblems: false,
            fracturesOrSprains: false,
            fluFeverInflammation: false,
            epilepsy: false,
            chronicMedications: false,
            pregnancy: false,
            surgeries: { hasSurgeries: false, details: '' },
            otherMedicalIssues: { hasOtherIssues: false, details: '' }
          },
          declarationConfirmed: false,
          signature: ''
        });
        setErrors({});
      }, 5000);
    } catch (error) {
      console.error('Error submitting declaration:', error);
      alert(`שגיאה בשליחת ההצהרה: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{
        padding: '2rem 0',
        background: '#F5E6E3',
        minHeight: '100vh',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        direction: 'rtl'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: '3rem auto',
            padding: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
              <h1 style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#4A3429'
              }}>ההצהרה נשלחה בהצלחה!</h1>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                marginBottom: '2rem',
                color: '#8B6F66'
              }}>תודה על מילוי הצהרת הבריאות. המידע נשמר במערכת וישמש אותנו לטיפול המיטבי.</p>
              <div>
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #D4B5B0 0%, #B89C94 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => window.location.href = '/'}
                >
                  חזרה לאתר
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '2rem 0',
      background: '#F5E6E3',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      direction: 'rtl'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '2rem 0'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#4A3429'
          }}>הצהרת בריאות</h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#8B6F66'
          }}>אנא מלאו את הטופס הבא לפני הטיפול הראשון</p>
        </div>

        {/* Information Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          padding: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                flexShrink: '0',
                marginTop: '4px'
              }}>🛡️</span>
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  color: '#4A3429'
                }}>מידע מוגן</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#8B6F66',
                  margin: '0',
                  lineHeight: '1.5'
                }}>כל המידע שתמסרו נשמר בסודיות מלאה ומשמש אך ורק לצורכי הטיפול</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <span style={{
                fontSize: '1.5rem',
                flexShrink: '0',
                marginTop: '4px'
              }}>📄</span>
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  color: '#4A3429'
                }}>חובת מילוי</h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#8B6F66',
                  margin: '0',
                  lineHeight: '1.5'
                }}>מילוי ההצהרה נדרש על פי חוק ועוזר לנו לספק לכם את הטיפול הבטוח והמיטבי</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Personal Information */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              color: '#4A3429',
              borderBottom: '2px solid #D4B5B0',
              paddingBottom: '0.5rem'
            }}>פרטים אישיים</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <label style={{
                  fontWeight: '600',
                  color: '#4A3429'
                }} htmlFor="fullName">שם מלא *</label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  style={{
                    padding: '1rem',
                    border: errors.fullName ? '2px solid #EF4444' : '2px solid #F5E6E3',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.15s ease',
                    fontFamily: 'inherit'
                  }}
                  placeholder="הכנס שם מלא"
                />
                {errors.fullName && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '0.875rem'
                  }}>{errors.fullName}</span>
                )}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <label style={{
                  fontWeight: '600',
                  color: '#4A3429'
                }} htmlFor="idNumber">תעודת זהות *</label>
                <input
                  type="text"
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => handleInputChange('idNumber', e.target.value)}
                  style={{
                    padding: '1rem',
                    border: errors.idNumber ? '2px solid #EF4444' : '2px solid #F5E6E3',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.15s ease',
                    fontFamily: 'inherit'
                  }}
                  placeholder="123456789"
                  maxLength={9}
                />
                {errors.idNumber && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '0.875rem'
                  }}>{errors.idNumber}</span>
                )}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <label style={{
                  fontWeight: '600',
                  color: '#4A3429'
                }} htmlFor="phoneNumber">טלפון *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  style={{
                    padding: '1rem',
                    border: errors.phoneNumber ? '2px solid #EF4444' : '2px solid #F5E6E3',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.15s ease',
                    fontFamily: 'inherit'
                  }}
                  placeholder="050-1234567"
                />
                {errors.phoneNumber && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '0.875rem'
                  }}>{errors.phoneNumber}</span>
                )}
              </div>
            </div>
          </div>

          {/* Health Conditions */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              color: '#4A3429',
              borderBottom: '2px solid #D4B5B0',
              paddingBottom: '0.5rem'
            }}>מצב בריאותי</h2>
            <p style={{
              fontSize: '1rem',
              color: '#8B6F66',
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              אנא סמנו כל מצב רפואי הרלוונטי עבורכם. מידע זה חיוני לבצוע טיפול בטוח ויעיל.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {healthConditions.map((condition) => (
                <label key={condition.key} style={{
                  display: 'block',
                  padding: '1rem',
                  border: '2px solid #F5E6E3',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: 'white'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.healthConditions[condition.key]}
                    onChange={(e) => handleHealthConditionChange(condition.key, e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: formData.healthConditions[condition.key] ? '#D4B5B0' : 'inherit'
                  }}>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #F5E6E3',
                      borderRadius: '4px',
                      flexShrink: '0',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      background: formData.healthConditions[condition.key] ? '#D4B5B0' : 'white',
                      borderColor: formData.healthConditions[condition.key] ? '#D4B5B0' : '#F5E6E3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {formData.healthConditions[condition.key] ? '✓' : ''}
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>{condition.label}</span>
                  </div>
                </label>
              ))}
            </div>

            {/* Special Conditions with Details */}
            <div style={{
              borderTop: '1px solid #F5E6E3',
              paddingTop: '2rem'
            }}>
              {/* Surgeries */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  padding: '1rem',
                  border: '2px solid #F5E6E3',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: 'white'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.healthConditions.surgeries.hasSurgeries}
                    onChange={(e) => handleSpecialConditionChange('surgeries', 'hasSurgeries', e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: formData.healthConditions.surgeries.hasSurgeries ? '#D4B5B0' : 'inherit'
                  }}>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #F5E6E3',
                      borderRadius: '4px',
                      flexShrink: '0',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      background: formData.healthConditions.surgeries.hasSurgeries ? '#D4B5B0' : 'white',
                      borderColor: formData.healthConditions.surgeries.hasSurgeries ? '#D4B5B0' : '#F5E6E3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {formData.healthConditions.surgeries.hasSurgeries ? '✓' : ''}
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>ניתוחים שעברתי</span>
                  </div>
                </label>
                
                {formData.healthConditions.surgeries.hasSurgeries && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#F5E6E3',
                    borderRadius: '8px',
                    borderLeft: '4px solid #D4B5B0'
                  }}>
                    <label style={{
                      fontWeight: '600',
                      color: '#4A3429',
                      display: 'block',
                      marginBottom: '0.5rem'
                    }} htmlFor="surgeryDetails">פרטי הניתוחים *</label>
                    <textarea
                      id="surgeryDetails"
                      value={formData.healthConditions.surgeries.details}
                      onChange={(e) => handleSpecialConditionChange('surgeries', 'details', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: errors.surgeryDetails ? '2px solid #EF4444' : '2px solid #F5E6E3',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'border-color 0.15s ease',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                      placeholder="אנא פרטו את הניתוחים שעברתם, מתי ואיפה..."
                      rows={3}
                    />
                    {errors.surgeryDetails && (
                      <span style={{
                        color: '#EF4444',
                        fontSize: '0.875rem'
                      }}>{errors.surgeryDetails}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Other Medical Issues */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  padding: '1rem',
                  border: '2px solid #F5E6E3',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: 'white'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.healthConditions.otherMedicalIssues.hasOtherIssues}
                    onChange={(e) => handleSpecialConditionChange('otherMedicalIssues', 'hasOtherIssues', e.target.checked)}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: formData.healthConditions.otherMedicalIssues.hasOtherIssues ? '#D4B5B0' : 'inherit'
                  }}>
                    <span style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #F5E6E3',
                      borderRadius: '4px',
                      flexShrink: '0',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                      background: formData.healthConditions.otherMedicalIssues.hasOtherIssues ? '#D4B5B0' : 'white',
                      borderColor: formData.healthConditions.otherMedicalIssues.hasOtherIssues ? '#D4B5B0' : '#F5E6E3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}>
                      {formData.healthConditions.otherMedicalIssues.hasOtherIssues ? '✓' : ''}
                    </span>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}>בעיות רפואיות אחרות</span>
                  </div>
                </label>
                
                {formData.healthConditions.otherMedicalIssues.hasOtherIssues && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#F5E6E3',
                    borderRadius: '8px',
                    borderLeft: '4px solid #D4B5B0'
                  }}>
                    <label style={{
                      fontWeight: '600',
                      color: '#4A3429',
                      display: 'block',
                      marginBottom: '0.5rem'
                    }} htmlFor="otherIssuesDetails">פרטי הבעיות הרפואיות *</label>
                    <textarea
                      id="otherIssuesDetails"
                      value={formData.healthConditions.otherMedicalIssues.details}
                      onChange={(e) => handleSpecialConditionChange('otherMedicalIssues', 'details', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: errors.otherIssuesDetails ? '2px solid #EF4444' : '2px solid #F5E6E3',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        transition: 'border-color 0.15s ease',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                      placeholder="אנא פרטו בעיות רפואיות נוספות..."
                      rows={3}
                    />
                    {errors.otherIssuesDetails && (
                      <span style={{
                        color: '#EF4444',
                        fontSize: '0.875rem'
                      }}>{errors.otherIssuesDetails}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Declaration and Signature */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              color: '#4A3429',
              borderBottom: '2px solid #D4B5B0',
              paddingBottom: '0.5rem'
            }}>הצהרה וחתימה</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.5rem',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '8px'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  flexShrink: '0',
                  marginTop: '2px'
                }}>⚠️</span>
                <div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    marginBottom: '0.5rem',
                    color: '#4A3429'
                  }}>הצהרת אחריות</h3>
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    color: '#8B6F66',
                    margin: '0'
                  }}>
                    אני מצהיר/ה בזאת כי המידע שמסרתי הוא נכון ומדויק. אני מבין/ה כי הסתרת מידע רפואי 
                    עלולה לסכן את בטיחותי במהלך הטיפול. אני מתחייב/ת לעדכן את המטפלת על כל שינוי 
                    במצבי הבריאותי.
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                <input
                  type="checkbox"
                  checked={formData.declarationConfirmed}
                  onChange={(e) => handleInputChange('declarationConfirmed', e.target.checked)}
                  style={{
                    width: 'auto',
                    margin: '0'
                  }}
                />
                <span>אני מאשר/ת כי קראתי והבנתי את ההצהרה לעיל ומסכים/ה לתנאיה</span>
              </label>
              {errors.declarationConfirmed && (
                <span style={{
                  color: '#EF4444',
                  fontSize: '0.875rem'
                }}>{errors.declarationConfirmed}</span>
              )}
            </div>

            <div style={{
              borderTop: '1px solid #F5E6E3',
              paddingTop: '2rem',
              marginTop: '2rem'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                color: '#4A3429'
              }}>חתימה דיגיטלית</h4>
              <p style={{
                fontSize: '0.9rem',
                color: '#8B6F66',
                marginBottom: '1.5rem'
              }}>אנא הכניסו את שמכם המלא כחתימה דיגיטלית</p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <label style={{
                  fontWeight: '600',
                  color: '#4A3429'
                }} htmlFor="signature">חתימה *</label>
                <input
                  type="text"
                  id="signature"
                  value={formData.signature}
                  onChange={(e) => handleInputChange('signature', e.target.value)}
                  style={{
                    padding: '1rem',
                    border: errors.signature ? '2px solid #EF4444' : '2px dashed #D4B5B0',
                    borderRadius: '8px',
                    fontSize: '1.2rem',
                    fontFamily: 'Brush Script MT, cursive, sans-serif',
                    background: 'linear-gradient(135deg, #FFF 0%, #F9F9F9 100%)',
                    transition: 'border-color 0.15s ease'
                  }}
                  placeholder="הכנס שם מלא כחתימה"
                />
                {errors.signature && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '0.875rem'
                  }}>{errors.signature}</span>
                )}
              </div>
              
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: '#F5E6E3',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#8B6F66'
              }}>
                <p style={{ margin: '0' }}>
                  <strong>הערה:</strong> החתימה הדיגיטלית מהווה הסכמה מלאה לתנאי ההצהרה ואישור 
                  לביצוע הטיפול על בסיס המידע שנמסר.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{
            textAlign: 'center',
            marginTop: '2rem'
          }}>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              style={{
                background: 'linear-gradient(135deg, #D4B5B0 0%, #B89C94 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                margin: '0 auto',
                opacity: isSubmitting ? '0.7' : '1'
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ 
                    animation: 'spin 1s linear infinite',
                    display: 'inline-block'
                  }}>⌛</span>
                  שולח הצהרה...
                </>
              ) : (
                'שליחת הצהרת בריאות'
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .health-declaration-page {
            padding: 1rem 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HealthDeclarationPage;