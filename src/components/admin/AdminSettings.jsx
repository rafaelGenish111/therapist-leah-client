import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Save, 
  RefreshCw, 
  Shield, 
  Bell, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Key,
  User,
  Settings as SettingsIcon
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Site Settings Form
  const siteForm = useForm({
    defaultValues: {
      siteName: 'קליניקת לאה גניש',
      siteDescription: 'הבחירה להרגיש טוב - טיפולי עיסוי מקצועיים ורפואה משלימה',
      siteKeywords: 'עיסוי, טיפול, קליניקה, לאה גניש, תל אביב, רפואה משלימה',
      contactEmail: 'info@leahgenish.co.il',
      contactPhone: '050-123-4567',
      address: 'רחוב הרצל 123, תל אביב-יפו',
      workingHours: 'ראשון-רביעי: 9:00-20:00, חמישי: 9:00-16:00',
      googleMapsUrl: '',
      facebookUrl: '',
      instagramUrl: '',
      whatsappNumber: '050-123-4567'
    }
  });

  // Notification Settings Form
  const notificationForm = useForm({
    defaultValues: {
      emailNotifications: true,
      newDeclarationAlert: true,
      newContactFormAlert: true,
      dailyReports: false,
      weeklyReports: true,
      maintenanceAlerts: true,
      notificationEmail: 'admin@leahgenish.co.il'
    }
  });

  // Security Settings Form
  const securityForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      sessionTimeout: '8',
      enableTwoFactor: false,
      loginAttempts: '5',
      blockDuration: '30'
    }
  });

  // System Settings Form
  const systemForm = useForm({
    defaultValues: {
      autoPublishArticles: false,
      autoBackup: true,
      backupFrequency: 'daily',
      maxUploadSize: '5',
      enableComments: false,
      enableRegistration: false,
      maintenanceMode: false,
      debugMode: false
    }
  });

  const tabs = [
    {
      id: 'general',
      label: 'הגדרות כלליות',
      icon: <Globe size={16} />
    },
    {
      id: 'notifications',
      label: 'התראות',
      icon: <Bell size={16} />
    },
    {
      id: 'security',
      label: 'אבטחה',
      icon: <Shield size={16} />
    },
    {
      id: 'system',
      label: 'מערכת',
      icon: <SettingsIcon size={16} />
    }
  ];

  const handleSaveSettings = async (data, formType) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`הגדרות ${formType} נשמרו בהצלחה!`);
      console.log(`${formType} settings:`, data);
    } catch (error) {
      toast.error('שגיאה בשמירת ההגדרות');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('הסיסמאות אינן תואמות');
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('הסיסמה שונתה בהצלחה!');
      securityForm.reset({
        ...securityForm.getValues(),
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('שגיאה בשינוי הסיסמה');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemMaintenance = async () => {
    if (window.confirm('האם אתה בטוח שברצונך להפעיל מצב תחזוקה? המשתמשים לא יוכלו לגשת לאתר.')) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success('מצב תחזוקה הופעל');
      } catch (error) {
        toast.error('שגיאה בהפעלת מצב תחזוקה');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderGeneralSettings = () => (
    <form onSubmit={siteForm.handleSubmit((data) => handleSaveSettings(data, 'כלליות'))}>
      <div className="form-section">
        <h3>פרטי האתר</h3>
        
        <div className="form-group">
          <label>שם האתר</label>
          <input
            {...siteForm.register('siteName', { required: 'שם האתר נדרש' })}
            placeholder="שם הקליניקה"
          />
          {siteForm.formState.errors.siteName && (
            <span className="error-message">{siteForm.formState.errors.siteName.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>תיאור האתר</label>
          <textarea
            {...siteForm.register('siteDescription')}
            placeholder="תיאור קצר של הקליניקה"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>מילות מפתח</label>
          <input
            {...siteForm.register('siteKeywords')}
            placeholder="מילות מפתח מופרדות בפסיקים"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>פרטי יצירת קשר</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>אימייל</label>
            <div className="input-with-icon">
              <Mail size={16} />
              <input
                type="email"
                {...siteForm.register('contactEmail', { 
                  required: 'אימייל נדרש',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'כתובת אימייל לא תקינה'
                  }
                })}
                placeholder="info@example.com"
              />
            </div>
            {siteForm.formState.errors.contactEmail && (
              <span className="error-message">{siteForm.formState.errors.contactEmail.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>טלפון</label>
            <div className="input-with-icon">
              <Phone size={16} />
              <input
                type="tel"
                {...siteForm.register('contactPhone', { required: 'מספר טלפון נדרש' })}
                placeholder="050-123-4567"
              />
            </div>
            {siteForm.formState.errors.contactPhone && (
              <span className="error-message">{siteForm.formState.errors.contactPhone.message}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>כתובת</label>
          <div className="input-with-icon">
            <MapPin size={16} />
            <input
              {...siteForm.register('address')}
              placeholder="כתובת הקליניקה"
            />
          </div>
        </div>

        <div className="form-group">
          <label>שעות פעילות</label>
          <input
            {...siteForm.register('workingHours')}
            placeholder="ראשון-רביעי: 9:00-20:00"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>קישורים חיצוניים</h3>
        
        <div className="form-group">
          <label>קישור למפות גוגל</label>
          <input
            {...siteForm.register('googleMapsUrl')}
            placeholder="https://maps.google.com/..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>פייסבוק</label>
            <input
              {...siteForm.register('facebookUrl')}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="form-group">
            <label>אינסטגרם</label>
            <input
              {...siteForm.register('instagramUrl')}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>

        <div className="form-group">
          <label>מספר וואטסאפ</label>
          <input
            {...siteForm.register('whatsappNumber')}
            placeholder="050-123-4567"
          />
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Spinner size="small" /> : <Save size={16} />}
          שמור שינויים
        </Button>
        <Button type="button" variant="outline" onClick={() => siteForm.reset()}>
          <RefreshCw size={16} />
          איפוס
        </Button>
      </div>
    </form>
  );

  const renderNotificationSettings = () => (
    <form onSubmit={notificationForm.handleSubmit((data) => handleSaveSettings(data, 'התראות'))}>
      <div className="form-section">
        <h3>התראות אימייל</h3>
        
        <div className="form-group">
          <label>כתובת אימייל להתראות</label>
          <div className="input-with-icon">
            <Mail size={16} />
            <input
              type="email"
              {...notificationForm.register('notificationEmail', { required: 'אימייל נדרש' })}
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...notificationForm.register('emailNotifications')}
            />
            <span className="checkmark"></span>
            הפעל התראות אימייל
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...notificationForm.register('newDeclarationAlert')}
            />
            <span className="checkmark"></span>
            התראה על הצהרת בריאות חדשה
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...notificationForm.register('newContactFormAlert')}
            />
            <span className="checkmark"></span>
            התראה על יצירת קשר חדשה
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...notificationForm.register('maintenanceAlerts')}
            />
            <span className="checkmark"></span>
            התראות תחזוקה מערכת
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>דוחות תקופתיים</h3>
        
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...notificationForm.register('dailyReports')}
            />
            <span className="checkmark"></span>
            דוח יומי
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...notificationForm.register('weeklyReports')}
            />
            <span className="checkmark"></span>
            דוח שבועי
          </label>
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Spinner size="small" /> : <Save size={16} />}
          שמור הגדרות
        </Button>
      </div>
    </form>
  );

  const renderSecuritySettings = () => (
    <div className="security-settings">
      {/* Password Change */}
      <form onSubmit={securityForm.handleSubmit(handlePasswordChange)}>
        <div className="form-section">
          <h3>שינוי סיסמה</h3>
          
          <div className="form-group">
            <label>סיסמה נוכחית</label>
            <div className="input-with-icon">
              <Key size={16} />
              <input
                type={showPassword ? 'text' : 'password'}
                {...securityForm.register('currentPassword', { required: 'סיסמה נוכחית נדרשת' })}
                placeholder="הכנס סיסמה נוכחית"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>סיסמה חדשה</label>
              <input
                type="password"
                {...securityForm.register('newPassword', { 
                  required: 'סיסמה חדשה נדרשת',
                  minLength: {
                    value: 6,
                    message: 'הסיסמה חייבת להכיל לפחות 6 תווים'
                  }
                })}
                placeholder="הכנס סיסמה חדשה"
              />
              {securityForm.formState.errors.newPassword && (
                <span className="error-message">{securityForm.formState.errors.newPassword.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>אישור סיסמה</label>
              <input
                type="password"
                {...securityForm.register('confirmPassword', { required: 'אישור סיסמה נדרש' })}
                placeholder="הכנס סיסמה שוב"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner size="small" /> : <Key size={16} />}
            שנה סיסמה
          </Button>
        </div>
      </form>

      {/* Security Options */}
      <form onSubmit={securityForm.handleSubmit((data) => handleSaveSettings(data, 'אבטחה'))}>
        <div className="form-section">
          <h3>הגדרות אבטחה</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>זמן פקיעת הפעלה (שעות)</label>
              <select {...securityForm.register('sessionTimeout')}>
                <option value="1">1 שעה</option>
                <option value="4">4 שעות</option>
                <option value="8">8 שעות</option>
                <option value="24">24 שעות</option>
              </select>
            </div>

            <div className="form-group">
              <label>ניסיונות התחברות מקסימליים</label>
              <select {...securityForm.register('loginAttempts')}>
                <option value="3">3 ניסיונות</option>
                <option value="5">5 ניסיונות</option>
                <option value="10">10 ניסיונות</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>זמן חסימה (דקות)</label>
            <select {...securityForm.register('blockDuration')}>
              <option value="15">15 דקות</option>
              <option value="30">30 דקות</option>
              <option value="60">60 דקות</option>
            </select>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...securityForm.register('enableTwoFactor')}
              />
              <span className="checkmark"></span>
              הפעל אימות דו-שלבי
            </label>
          </div>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner size="small" /> : <Shield size={16} />}
            שמור הגדרות אבטחה
          </Button>
        </div>
      </form>
    </div>
  );

  const renderSystemSettings = () => (
    <form onSubmit={systemForm.handleSubmit((data) => handleSaveSettings(data, 'מערכת'))}>
      <div className="form-section">
        <h3>הגדרות תוכן</h3>
        
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...systemForm.register('autoPublishArticles')}
            />
            <span className="checkmark"></span>
            פרסום מאמרים אוטומטי
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...systemForm.register('enableComments')}
            />
            <span className="checkmark"></span>
            אפשר תגובות על מאמרים
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...systemForm.register('enableRegistration')}
            />
            <span className="checkmark"></span>
            אפשר רישום משתמשים חדשים
          </label>
        </div>
      </div>

      <div className="form-section">
        <h3>הגדרות מערכת</h3>
        
        <div className="form-group">
          <label>גודל מקסימלי להעלאה (MB)</label>
          <select {...systemForm.register('maxUploadSize')}>
            <option value="1">1 MB</option>
            <option value="5">5 MB</option>
            <option value="10">10 MB</option>
            <option value="20">20 MB</option>
          </select>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...systemForm.register('autoBackup')}
            />
            <span className="checkmark"></span>
            גיבוי אוטומטי
          </label>
        </div>

        {systemForm.watch('autoBackup') && (
          <div className="form-group">
            <label>תדירות גיבוי</label>
            <select {...systemForm.register('backupFrequency')}>
              <option value="daily">יומי</option>
              <option value="weekly">שבועי</option>
              <option value="monthly">חודשי</option>
            </select>
          </div>
        )}
      </div>

      <div className="form-section">
        <h3>מצבי מערכת</h3>
        
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              {...systemForm.register('debugMode')}
            />
            <span className="checkmark"></span>
            מצב פיתוח (Debug)
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              {...systemForm.register('maintenanceMode')}
              onChange={(e) => {
                if (e.target.checked) {
                  handleSystemMaintenance();
                }
              }}
            />
            <span className="checkmark"></span>
            מצב תחזוקה
          </label>
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Spinner size="small" /> : <Save size={16} />}
          שמור הגדרות מערכת
        </Button>
      </div>
    </form>
  );

  return (
    <div className="settings-manager">
      <div className="manager-header">
        <div>
          <h1>הגדרות מערכת</h1>
          <p>ניהול הגדרות האתר והמערכת</p>
        </div>
      </div>

      <div className="settings-container">
        {/* Settings Navigation */}
        <Card className="settings-nav">
          <div className="nav-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Settings Content */}
        <Card className="settings-content">
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'notifications' && renderNotificationSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'system' && renderSystemSettings()}
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;