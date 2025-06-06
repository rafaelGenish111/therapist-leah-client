import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Send, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import { healthDeclarationsApi } from '../../services/api';
import toast from 'react-hot-toast';

const HealthDeclarationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [declarationId, setDeclarationId] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState('');
  const canvasRef = useRef(null);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const watchSurgeries = watch('healthConditions.surgeries.hasSurgeries');
  const watchOtherIssues = watch('healthConditions.otherMedicalIssues.hasOtherIssues');

  // Signature drawing functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      setSignatureData(dataURL);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData('');
  };

  // Initialize canvas
  const initCanvas = (canvas) => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#4A3429';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const healthConditions = [
    { key: 'skinDiseases', label: 'מחלות עור' },
    { key: 'heartDiseases', label: 'מחלות לב' },
    { key: 'diabetes', label: 'סוכרת' },
    { key: 'bloodPressure', label: 'לחץ דם גבוה/נמוך' },
    { key: 'spineProblems', label: 'בעיות עמוד שדרה' },
    { key: 'fracturesOrSprains', label: 'שברים או נקעים' },
    { key: 'fluFeverInflammation', label: 'שפעת/חום/דלקת' },
    { key: 'epilepsy', label: 'אפילפסיה' },
    { key: 'chronicMedications', label: 'נטילת תרופות קבועות' },
    { key: 'pregnancy', label: 'הריון (עבור נשים)' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Format the data according to server expectations
      const formattedData = {
        fullName: data.fullName,
        idNumber: data.idNumber,
        phoneNumber: data.phoneNumber,
        healthConditions: {
          skinDiseases: data.healthConditions?.skinDiseases || false,
          heartDiseases: data.healthConditions?.heartDiseases || false,
          diabetes: data.healthConditions?.diabetes || false,
          bloodPressure: data.healthConditions?.bloodPressure || false,
          spineProblems: data.healthConditions?.spineProblems || false,
          fracturesOrSprains: data.healthConditions?.fracturesOrSprains || false,
          fluFeverInflammation: data.healthConditions?.fluFeverInflammation || false,
          epilepsy: data.healthConditions?.epilepsy || false,
          surgeries: {
            hasSurgeries: data.healthConditions?.surgeries?.hasSurgeries || false,
            details: data.healthConditions?.surgeries?.details || ''
          },
          chronicMedications: data.healthConditions?.chronicMedications || false,
          pregnancy: data.healthConditions?.pregnancy || false,
          otherMedicalIssues: {
            hasOtherIssues: data.healthConditions?.otherMedicalIssues?.hasOtherIssues || false,
            details: data.healthConditions?.otherMedicalIssues?.details || ''
          }
        },
        declarationConfirmed: data.declarationConfirmed,
        signature: signatureData || 'חתימה דיגיטלית: ' + data.fullName
      };

      const response = await healthDeclarationsApi.submit(formattedData);
      
      setDeclarationId(response.declarationId);
      setIsSubmitted(true);
      toast.success('הצהרת הבריאות נשלחה בהצלחה!');
      reset();
      
      // Reset success state after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setDeclarationId(null);
      }, 10000);
      
    } catch (error) {
      toast.error(error.message || 'שגיאה בשליחת ההצהרה');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="health-declaration-form">
        <div className="container">
          <Card className="declaration-success">
            <div className="success-content">
              <CheckCircle size={64} className="success-icon" />
              <h2>הצהרת הבריאות נשלחה בהצלחה!</h2>
              <p>תודה על מילוי ההצהרה. מספר ההצהרה שלכם הוא:</p>
              <div className="declaration-id">
                <strong>{declarationId}</strong>
              </div>
              <p>אנא שמרו על מספר זה לעיון עתידי.</p>
              <Button 
                variant="primary" 
                onClick={() => {
                  setIsSubmitted(false);
                  setDeclarationId(null);
                }}
              >
                מלא הצהרה חדשה
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="health-declaration-form">
      <div className="container">
        <div className="form-header">
          <h1>הצהרת בריאות</h1>
          <p>אנא מלאו את הפרטים הבאים לפני הטיפול</p>
        </div>

        <Card className="declaration-card">
          <form onSubmit={handleSubmit(onSubmit)} className="declaration-form">
            {/* Personal Information */}
            <div className="form-section">
              <h3>פרטים אישיים</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">שם מלא *</label>
                  <input
                    type="text"
                    id="fullName"
                    {...register('fullName', {
                      required: 'שם מלא נדרש',
                      minLength: {
                        value: 2,
                        message: 'שם מלא חייב להכיל לפחות 2 תווים'
                      },
                      maxLength: {
                        value: 100,
                        message: 'שם מלא לא יכול להכיל יותר מ-100 תווים'
                      }
                    })}
                    className={errors.fullName ? 'error' : ''}
                    placeholder="הכנס שם מלא"
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="idNumber">מספר תעודת זהות *</label>
                  <input
                    type="text"
                    id="idNumber"
                    {...register('idNumber', {
                      required: 'מספר תעודת זהות נדרש',
                      pattern: {
                        value: /^\d{9}$/,
                        message: 'מספר תעודת זהות חייב להכיל 9 ספרות בלבד'
                      }
                    })}
                    className={errors.idNumber ? 'error' : ''}
                    placeholder="123456789"
                    maxLength="9"
                  />
                  {errors.idNumber && (
                    <span className="error-message">{errors.idNumber.message}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">מספר טלפון *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  {...register('phoneNumber', {
                    required: 'מספר טלפון נדרש',
                    pattern: {
                      value: /^0\d{1,2}-?\d{7}$/,
                      message: 'מספר טלפון לא תקין (לדוגמה: 050-1234567)'
                    }
                  })}
                  className={errors.phoneNumber ? 'error' : ''}
                  placeholder="050-1234567"
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber.message}</span>
                )}
              </div>
            </div>

            {/* Health Conditions */}
            <div className="form-section">
              <h3>מצב בריאותי</h3>
              <p className="section-description">
                אנא סמנו את כל המצבים הרפואיים הרלוונטיים עבורכם:
              </p>

              <div className="health-conditions-grid">
                {healthConditions.map((condition) => (
                  <div key={condition.key} className="condition-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        {...register(`healthConditions.${condition.key}`)}
                      />
                      <span className="checkmark"></span>
                      {condition.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Surgeries Details */}
              <div className="condition-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('healthConditions.surgeries.hasSurgeries')}
                  />
                  <span className="checkmark"></span>
                  ניתוחים שעברתי
                </label>
              </div>

              {watchSurgeries && (
                <div className="form-group conditional-field">
                  <label htmlFor="surgeryDetails">פרטי הניתוחים *</label>
                  <textarea
                    id="surgeryDetails"
                    rows="3"
                    {...register('healthConditions.surgeries.details', {
                      required: watchSurgeries ? 'יש לפרט את הניתוחים שעברת' : false,
                      maxLength: {
                        value: 500,
                        message: 'הפירוט לא יכול להכיל יותר מ-500 תווים'
                      }
                    })}
                    className={errors.healthConditions?.surgeries?.details ? 'error' : ''}
                    placeholder="אנא פרטו את הניתוחים שעברתם..."
                  />
                  {errors.healthConditions?.surgeries?.details && (
                    <span className="error-message">
                      {errors.healthConditions.surgeries.details.message}
                    </span>
                  )}
                </div>
              )}

              {/* Other Medical Issues */}
              <div className="condition-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('healthConditions.otherMedicalIssues.hasOtherIssues')}
                  />
                  <span className="checkmark"></span>
                  בעיות רפואיות אחרות
                </label>
              </div>

              {watchOtherIssues && (
                <div className="form-group conditional-field">
                  <label htmlFor="otherIssuesDetails">פרטי הבעיות הרפואיות *</label>
                  <textarea
                    id="otherIssuesDetails"
                    rows="3"
                    {...register('healthConditions.otherMedicalIssues.details', {
                      required: watchOtherIssues ? 'יש לפרט את הבעיות הרפואיות האחרות' : false,
                      maxLength: {
                        value: 500,
                        message: 'הפירוט לא יכול להכיל יותר מ-500 תווים'
                      }
                    })}
                    className={errors.healthConditions?.otherMedicalIssues?.details ? 'error' : ''}
                    placeholder="אנא פרטו את הבעיות הרפואיות האחרות..."
                  />
                  {errors.healthConditions?.otherMedicalIssues?.details && (
                    <span className="error-message">
                      {errors.healthConditions.otherMedicalIssues.details.message}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Declaration and Signature */}
            <div className="form-section">
              <h3>הצהרה וחתימה</h3>
              
              <div className="declaration-text">
                <div className="info-box">
                  <AlertCircle size={20} />
                  <div>
                    <p>
                      <strong>הצהרה:</strong> אני מצהיר/ה כי המידע שמסרתי לעיל הוא נכון ומלא.
                      אני מבין/ה כי מסירת מידע כוזב עלולה לסכן את בריאותי ולפגוע ביעילות הטיפול.
                    </p>
                    <p>
                      אני מתחייב/ת ליידע את המטפלת על כל שינוי במצבי הבריאותי לפני הטיפולים הבאים.
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>חתימה ידנית *</label>
                <div className="signature-container">
                  <canvas
                    ref={(canvas) => {
                      canvasRef.current = canvas;
                      initCanvas(canvas);
                    }}
                    width="400"
                    height="150"
                    className="signature-canvas"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  <div className="signature-controls">
                    <Button
                      type="button"
                      variant="outline"
                      size="small"
                      onClick={clearSignature}
                    >
                      <RotateCcw size={14} />
                      נקה חתימה
                    </Button>
                    <span className="signature-help">
                      חתמו באמצעות העכבר או המגע
                    </span>
                  </div>
                </div>
                {!signatureData && (
                  <span className="error-message">חתימה נדרשת</span>
                )}
              </div>

              <div className="form-group">
                <label className="checkbox-label declaration-confirm">
                  <input
                    type="checkbox"
                    {...register('declarationConfirmed', {
                      required: 'יש לאשר את ההצהרה כדי להמשיך'
                    })}
                  />
                  <span className="checkmark"></span>
                  <span>
                    אני מאשר/ת כי קראתי והבנתי את ההצהרה לעיל, והמידע שמסרתי הוא נכון ומלא.
                  </span>
                </label>
                {errors.declarationConfirmed && (
                  <span className="error-message">{errors.declarationConfirmed.message}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isSubmitting || !signatureData}
                className="submit-declaration"
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="small" />
                    שולח הצהרה...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    שלח הצהרת בריאות
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default HealthDeclarationForm;