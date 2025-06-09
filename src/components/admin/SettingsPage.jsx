import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  User,
  Lock,
  Bell,
  Globe,
  Database,
  Shield,
  Save,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Check,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import './SettingsPage.css';

const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: 'admin@leahgenish.co.il',
      phone: '054-9414947',
      notifications: {
        email: true,
        browser: true,
        newDeclarations: true,
        newComments: false
      },
      theme: 'light',
      language: 'he',
      backupFrequency: 'weekly'
    }
  });

  const tabs = [
    { id: 'profile', label: 'פרופיל אישי', icon: <User size={20} /> },
    { id: 'security', label: 'אבטחה', icon: <Lock size={20} /> },
    { id: 'notifications', label: 'התראות', icon: <Bell size={20} /> },
    { id: 'general', label: 'כללי', icon: <Globe size={20} /> },
    { id: 'backup', label: 'גיבויים', icon: <Database size={20} /> },
    { id: 'system', label: 'מערכת', icon: <Shield size={20} /> }
  ];

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('ההגדרות נשמרו בהצלחה');
      console.log('Settings saved:', data);
    } catch (error) {
      toast.error('שגיאה בשמירת ההגדרות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      // Mock backup creation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create a mock backup file
      const backupData = {
        date: new Date().toISOString(),
        version: '1.0.0',
        articles: 'backed up',
        gallery: 'backed up',
        declarations: 'backed up',
        settings: 'backed up'
      };

      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clinic-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('הגיבוי נוצר בהצלחה');
    } catch (error) {
      toast.error('שגיאה ביצירת הגיבוי');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל ההגדרות?')) {
      reset();
      toast.success('ההגדרות אופסו בהצלחה');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="tab-content">
            <h3>פרטים אישיים</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="username">שם משתמש</label>
                <input
                  type="text"
                  id="username"
                  {...register('username', { required: 'שם משתמש נדרש' })}
                  className={errors.username ? 'error' : ''}
                />
                {errors.username && (
                  <span className="error-message">{errors.username.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">כתובת אימייל</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'אימייל נדרש',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'כתובת אימייל לא תקינה'
                    }
                  })}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">טלפון</label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">אודות</label>
                <textarea
                  id="bio"
                  rows="4"
                  {...register('bio')}
                  placeholder="ספר קצת על עצמך..."
                />
              </div>
            </div>

            <div className="profile-picture">
              <h4>תמונת פרופיל</h4>
              <div className="picture-upload">
                <div className="current-picture">
                  <User size={48} />
                </div>
                <div className="upload-actions">
                  <Button variant="outline" size="small">
                    <Upload size={16} />
                    העלה תמונה
                  </Button>
                  <Button variant="ghost" size="small">
                    <Trash2 size={16} />
                    הסר
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="tab-content">
            <h3>אבטחה וסיסמה</h3>

            <Card className="security-status">
              <div className="status-header">
                <Shield size={24} />
                <div>
                  <h4>סטטוס אבטחה</h4>
                  <p>החשבון שלך מוגן</p>
                </div>
                <div className="status-indicator good">
                  <Check size={16} />
                  טוב
                </div>
              </div>
            </Card>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="currentPassword">סיסמה נוכחית</label>
                <div className="password-input">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="currentPassword"
                    {...register('currentPassword')}
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

              <div className="form-group">
                <label htmlFor="newPassword">סיסמה חדשה</label>
                <input
                  type="password"
                  id="newPassword"
                  {...register('newPassword', {
                    minLength: {
                      value: 8,
                      message: 'סיסמה חייבת להכיל לפחות 8 תווים'
                    }
                  })}
                  className={errors.newPassword ? 'error' : ''}
                />
                {errors.newPassword && (
                  <span className="error-message">{errors.newPassword.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">אישור סיסמה</label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    validate: value =>
                      value === watch('newPassword') || 'הסיסמאות אינן תואמות'
                  })}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>

            <div className="security-tips">
              <h4>טיפים לאבטחה</h4>
              <ul>
                <li>השתמש בסיסמה חזקה עם לפחות 8 תווים</li>
                <li>כלול אותיות גדולות וקטנות, מספרים וסימנים</li>
                <li>אל תשתף את הסיסמה עם אחרים</li>
                <li>החלף סיסמה מדי פעם</li>
              </ul>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="tab-content">
            <h3>הגדרות התראות</h3>

            <div className="notifications-section">
              <h4>התראות אימייל</h4>
              <div className="toggle-group">
                <label className="toggle-item">
                  <input
                    type="checkbox"
                    {...register('notifications.email')}
                  />
                  <span className="toggle-switch"></span>
                  <span>קבל התראות באימייל</span>
                </label>

                <label className="toggle-item">
                  <input
                    type="checkbox"
                    {...register('notifications.newDeclarations')}
                  />
                  <span className="toggle-switch"></span>
                  <span>הצהרות בריאות חדשות</span>
                </label>

                <label className="toggle-item">
                  <input
                    type="checkbox"
                    {...register('notifications.newComments')}
                  />
                  <span className="toggle-switch"></span>
                  <span>תגובות חדשות</span>
                </label>
              </div>
            </div>

            <div className="notifications-section">
              <h4>התראות דפדפן</h4>
              <div className="toggle-group">
                <label className="toggle-item">
                  <input
                    type="checkbox"
                    {...register('notifications.browser')}
                  />
                  <span className="toggle-switch"></span>
                  <span>הפעל התראות דפדפן</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'general':
        return (
          <div className="tab-content">
            <h3>הגדרות כלליות</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="language">שפה</label>
                <select id="language" {...register('language')}>
                  <option value="he">עברית</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="theme">ערכת נושא</label>
                <select id="theme" {...register('theme')}>
                  <option value="light">בהיר</option>
                  <option value="dark">כהה</option>
                  <option value="auto">אוטומטי</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timezone">אזור זמן</label>
                <select id="timezone" {...register('timezone')}>
                  <option value="Asia/Jerusalem">ירושלים (GMT+2)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dateFormat">פורמט תאריך</label>
                <select id="dateFormat" {...register('dateFormat')}>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="tab-content">
            <h3>גיבויים ושחזור</h3>

            <Card className="backup-status">
              <div className="backup-info">
                <Database size={24} />
                <div>
                  <h4>גיבוי אחרון</h4>
                  <p>23/05/2024 בשעה 14:30</p>
                </div>
                <div className="backup-size">
                  <span>2.3 MB</span>
                </div>
              </div>
            </Card>

            <div className="backup-actions">
              <div className="action-group">
                <h4>יצירת גיבוי</h4>
                <p>צור גיבוי מלא של כל הנתונים</p>
                <Button
                  variant="primary"
                  onClick={handleBackup}
                  disabled={isLoading}
                >
                  <Download size={16} />
                  {isLoading ? 'יוצר גיבוי...' : 'צור גיבוי עכשיו'}
                </Button>
              </div>

              <div className="action-group">
                <h4>שחזור מגיבוי</h4>
                <p>שחזר נתונים מקובץ גיבוי קיים</p>
                <Button variant="outline">
                  <Upload size={16} />
                  העלה קובץ גיבוי
                </Button>
              </div>

              <div className="action-group">
                <h4>גיבוי אוטומטי</h4>
                <div className="form-group">
                  <label htmlFor="backupFrequency">תדירות גיבוי</label>
                  <select id="backupFrequency" {...register('backupFrequency')}>
                    <option value="daily">יומי</option>
                    <option value="weekly">שבועי</option>
                    <option value="monthly">חודשי</option>
                    <option value="manual">ידני בלבד</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="tab-content">
            <h3>מידע מערכת</h3>

            <div className="system-info">
              <div className="info-grid">
                <div className="info-item">
                  <h4>גירסת מערכת</h4>
                  <p>1.0.0</p>
                </div>

                <div className="info-item">
                  <h4>סביבה</h4>
                  <p>ייצור</p>
                </div>

                <div className="info-item">
                  <h4>עדכון אחרון</h4>
                  <p>15/05/2024</p>
                </div>

                <div className="info-item">
                  <h4>מקום אחסון</h4>
                  <p>75% בשימוש</p>
                </div>
              </div>
            </div>

            <div className="danger-zone">
              <h4>
                <AlertTriangle size={20} />
                אזור מסוכן
              </h4>
              <p>פעולות אלו עלולות להשפיע על פעולת המערכת</p>

              <div className="danger-actions">
                <Button
                  variant="outline"
                  onClick={handleResetSettings}
                  className="danger-btn"
                >
                  <Trash2 size={16} />
                  אפס הגדרות
                </Button>

                <Button
                  variant="outline"
                  className="danger-btn"
                  onClick={() => {
                    if (window.confirm('האם אתה בטוח? פעולה זו תמחק את כל הנתונים!')) {
                      toast.error('פעולה זו לא זמינה בגירסת הדגמה');
                    }
                  }}
                >
                  <Trash2 size={16} />
                  מחק כל הנתונים
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>הגדרות מערכת</h1>
        <p>נהל את הגדרות הקליניקה והחשבון האישי</p>
      </div>

      <div className="settings-container">
        {/* Tabs Navigation */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="settings-content">
          <Card className="content-card">
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderTabContent()}

              {activeTab !== 'system' && activeTab !== 'backup' && (
                <div className="form-actions">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="small" />
                        שומר...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        שמור שינויים
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                  >
                    ביטול
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;