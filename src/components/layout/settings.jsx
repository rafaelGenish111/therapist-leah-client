import React, { useState } from 'react';
import {
  Save,
  User,
  Bell,
  Globe,
  Shield,
  Database,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Upload,
  Trash2
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'קליניקת לאה גניש',
    siteDescription: 'הבחירה להרגיש טוב',
    siteKeywords: 'עיסוי, טיפול, קליניקה, לאה גניש, תל אביב',
    logoFile: null,

    // Contact Settings
    contactEmail: 'info@leahgenish.co.il',
    contactPhone: '050-123-4567',
    whatsappNumber: '050-123-4567',
    address: 'רחוב הרצל 123, תל אביב',
    workingHours: {
      sunday: { open: '09:00', close: '20:00', enabled: true },
      monday: { open: '09:00', close: '20:00', enabled: true },
      tuesday: { open: '09:00', close: '20:00', enabled: true },
      wednesday: { open: '09:00', close: '20:00', enabled: true },
      thursday: { open: '09:00', close: '16:00', enabled: true },
      friday: { open: '', close: '', enabled: false },
      saturday: { open: '', close: '', enabled: false }
    },

    // Notification Settings
    emailNotifications: {
      newHealthDeclaration: true,
      newContactForm: true,
      systemUpdates: false,
      weeklyReport: true
    },

    // Privacy Settings
    dataRetention: '12', // months
    cookieConsent: true,
    analyticsEnabled: true,

    // System Settings
    autoPublishArticles: false,
    enableComments: false,
    maintenanceMode: false,
    backupFrequency: 'weekly'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const tabs = [
    { id: 'general', label: 'כללי', icon: <Globe size={16} /> },
    { id: 'contact', label: 'פרטי קשר', icon: <Phone size={16} /> },
    { id: 'notifications', label: 'התראות', icon: <Bell size={16} /> },
    { id: 'privacy', label: 'פרטיות', icon: <Shield size={16} /> },
    { id: 'system', label: 'מערכת', icon: <Database size={16} /> },
    { id: 'account', label: 'חשבון', icon: <User size={16} /> }
  ];

  const dayNames = {
    sunday: 'ראשון',
    monday: 'שני',
    tuesday: 'שלישי',
    wednesday: 'רביעי',
    thursday: 'חמישי',
    friday: 'שישי',
    saturday: 'שבת'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast.success('הגדרות נשמרו בהצלחה!');
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('הסיסמאות החדשות אינן תואמות');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('הסיסמה החדשה חייבת להכיל לפחות 6 תווים');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('הסיסמה שונתה בהצלחה!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings({
        ...settings,
        logoFile: file
      });
      toast.success('הלוגו הועלה בהצלחה!');
    }
  };

  const removeLogo = () => {
    setSettings({
      ...settings,
      logoFile: null
    });
    toast.success('הלוגו הוסר');
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'clinic-settings.json';
    link.click();

    toast.success('הגדרות יוצאו בהצלחה!');
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <h3>הגדרות כלליות</h3>

      <div className="form-group">
        <label>שם האתר</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
          placeholder="שם הקליניקה"
        />
      </div>

      <div className="form-group">
        <label>תיאור האתר</label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
          placeholder="תיאור קצר של הקליניקה"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>מילות מפתח (SEO)</label>
        <input
          type="text"
          value={settings.siteKeywords}
          onChange={(e) => setSettings({ ...settings, siteKeywords: e.target.value })}
          placeholder="מילות מפתח מופרדות בפסיקים"
        />
      </div>

      <div className="form-group">
        <label>לוגו האתר</label>
        <div className="logo-upload">
          {settings.logoFile ? (
            <div className="logo-preview">
              <div className="logo-placeholder">
                <Globe size={24} />
                <span>{settings.logoFile.name}</span>
              </div>
              <Button variant="danger" size="small" onClick={removeLogo}>
                <Trash2 size={14} />
                הסר
              </Button>
            </div>
          ) : (
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="upload-label">
                <Upload size={24} />
                <span>העלה לוגו</span>
                <small>PNG, JPG או SVG - עד 2MB</small>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="settings-section">
      <h3>פרטי יצירת קשר</h3>

      <div className="form-row">
        <div className="form-group">
          <label>אימייל</label>
          <input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            placeholder="info@example.co.il"
          />
        </div>

        <div className="form-group">
          <label>טלפון</label>
          <input
            type="tel"
            value={settings.contactPhone}
            onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
            placeholder="050-123-4567"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>WhatsApp</label>
          <input
            type="tel"
            value={settings.whatsappNumber}
            onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
            placeholder="050-123-4567"
          />
        </div>

        <div className="form-group">
          <label>כתובת</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            placeholder="רחוב, עיר"
          />
        </div>
      </div>

      <div className="form-group">
        <label>שעות פעילות</label>
        <div className="working-hours">
          {Object.entries(settings.workingHours).map(([day, hours]) => (
            <div key={day} className="hour-row">
              <div className="day-name">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={hours.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      workingHours: {
                        ...settings.workingHours,
                        [day]: { ...hours, enabled: e.target.checked }
                      }
                    })}
                  />
                  {dayNames[day]}
                </label>
              </div>

              {hours.enabled && (
                <div className="time-inputs">
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => setSettings({
                      ...settings,
                      workingHours: {
                        ...settings.workingHours,
                        [day]: { ...hours, open: e.target.value }
                      }
                    })}
                  />
                  <span>עד</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => setSettings({
                      ...settings,
                      workingHours: {
                        ...settings.workingHours,
                        [day]: { ...hours, close: e.target.value }
                      }
                    })}
                  />
                </div>
              )}

              {!hours.enabled && (
                <div className="closed-indicator">סגור</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3>הגדרות התראות</h3>

      <div className="notifications-grid">
        <div className="notification-item">
          <div className="notification-info">
            <Mail size={20} />
            <div>
              <h4>הצהרת בריאות חדשה</h4>
              <p>קבל התראה כשמישהו ממלא הצהרת בריאות</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications.newHealthDeclaration}
              onChange={(e) => setSettings({
                ...settings,
                emailNotifications: {
                  ...settings.emailNotifications,
                  newHealthDeclaration: e.target.checked
                }
              })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <Phone size={20} />
            <div>
              <h4>פנייה חדשה ביצירת קשר</h4>
              <p>קבל התראה כשמישהו שולח הודעה בטופס יצירת קשר</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications.newContactForm}
              onChange={(e) => setSettings({
                ...settings,
                emailNotifications: {
                  ...settings.emailNotifications,
                  newContactForm: e.target.checked
                }
              })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <Bell size={20} />
            <div>
              <h4>עדכוני מערכת</h4>
              <p>קבל התראות על עדכונים ושיפורים במערכת</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications.systemUpdates}
              onChange={(e) => setSettings({
                ...settings,
                emailNotifications: {
                  ...settings.emailNotifications,
                  systemUpdates: e.target.checked
                }
              })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <Database size={20} />
            <div>
              <h4>דוח שבועי</h4>
              <p>קבל דוח שבועי עם סטטיסטיקות ופעילות באתר</p>
            </div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications.weeklyReport}
              onChange={(e) => setSettings({
                ...settings,
                emailNotifications: {
                  ...settings.emailNotifications,
                  weeklyReport: e.target.checked
                }
              })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-section">
      <h3>הגדרות פרטיות</h3>

      <div className="form-group">
        <label>תקופת שמירת נתונים (חודשים)</label>
        <select
          value={settings.dataRetention}
          onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
        >
          <option value="6">6 חודשים</option>
          <option value="12">12 חודשים</option>
          <option value="24">24 חודשים</option>
          <option value="36">36 חודשים</option>
        </select>
      </div>

      <div className="privacy-toggles">
        <div className="privacy-item">
          <div className="privacy-info">
            <h4>הסכמה לעוגיות</h4>
            <p>הצג הודעת הסכמה לעוגיות למבקרים באתר</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.cookieConsent}
              onChange={(e) => setSettings({ ...settings, cookieConsent: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="privacy-item">
          <div className="privacy-info">
            <h4>Google Analytics</h4>
            <p>אפשר מעקב וניתוח תנועה באתר</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.analyticsEnabled}
              onChange={(e) => setSettings({ ...settings, analyticsEnabled: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="settings-section">
      <h3>הגדרות מערכת</h3>

      <div className="system-toggles">
        <div className="system-item">
          <div className="system-info">
            <h4>פרסום מאמרים אוטומטי</h4>
            <p>פרסם מאמרים חדשים אוטומטיים ללא אישור ידני</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.autoPublishArticles}
              onChange={(e) => setSettings({ ...settings, autoPublishArticles: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="system-item">
          <div className="system-info">
            <h4>הפעל תגובות</h4>
            <p>אפשר למבקרים להגיב על מאמרים</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.enableComments}
              onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="system-item">
          <div className="system-info">
            <h4>מצב תחזוקה</h4>
            <p>הפעל מצב תחזוקה - האתר יהיה זמנית לא זמין</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>תדירות גיבוי</label>
        <select
          value={settings.backupFrequency}
          onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
        >
          <option value="daily">יומי</option>
          <option value="weekly">שבועי</option>
          <option value="monthly">חודשי</option>
        </select>
      </div>

      <div className="backup-actions">
        <Button variant="outline">
          <Database size={16} />
          יצירת גיבוי עכשיו
        </Button>
        <Button variant="outline" onClick={exportSettings}>
          <Upload size={16} />
          יצוא הגדרות
        </Button>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="settings-section">
      <h3>הגדרות חשבון</h3>

      <form onSubmit={handlePasswordChange} className="password-form">
        <div className="form-group">
          <label>סיסמה נוכחית</label>
          <div className="password-input">
            <input
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              placeholder="הכנס סיסמה נוכחית"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => togglePasswordVisibility('current')}
            >
              {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>סיסמה חדשה</label>
          <div className="password-input">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              placeholder="הכנס סיסמה חדשה"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => togglePasswordVisibility('new')}
            >
              {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>אישור סיסמה חדשה</label>
          <div className="password-input">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              placeholder="אשר סיסמה חדשה"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <Button type="submit" variant="primary">
          <Shield size={16} />
          שינוי סיסמה
        </Button>
      </form>

      <div className="account-danger-zone">
        <h4>אזור מסוכן</h4>
        <p>פעולות אלו אינן הפיכות. נא לפעול בזהירות.</p>
        <div className="danger-actions">
          <Button variant="danger" onClick={() => alert('פונקציה זו תיושם בעתיד')}>
            <Trash2 size={16} />
            מחיקת כל הנתונים
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'contact':
        return renderContactSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'system':
        return renderSystemSettings();
      case 'account':
        return renderAccountSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="settings-manager">
      <div className="manager-header">
        <h1>הגדרות מערכת</h1>
        <div className="header-actions">
          <Button variant="primary" onClick={handleSubmit}>
            <Save size={16} />
            שמור הגדרות
          </Button>
        </div>
      </div>

      <div className="settings-container">
        <Card className="settings-tabs">
          <nav className="tabs-nav">
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
          </nav>
        </Card>

        <Card className="settings-content">
          <form onSubmit={handleSubmit}>
            {renderTabContent()}
          </form>
        </Card>
      </div>

      <style jsx>{`
        .settings-manager {
          max-width: 1200px;
          margin: 0 auto;
        }

        .settings-container {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: var(--spacing-xl);
        }

        .settings-tabs {
          padding: 0;
          height: fit-content;
          position: sticky;
          top: var(--spacing-xl);
        }

        .tabs-nav {
          display: flex;
          flex-direction: column;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md) var(--spacing-lg);
          background: none;
          border: none;
          text-align: right;
          cursor: pointer;
          transition: all var(--transition-fast);
          border-radius: 0;
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          font-weight: 500;
        }

        .tab-button:hover {
          background: var(--background-alt);
          color: var(--primary-color);
        }

        .tab-button.active {
          background: var(--primary-color);
          color: var(--white);
        }

        .tab-button:first-child {
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }

        .tab-button:last-child {
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        }

        .settings-content {
          padding: var(--spacing-2xl);
        }

        .settings-section {
          margin-bottom: var(--spacing-2xl);
        }

        .settings-section h3 {
          font-size: var(--font-size-xl);
          color: var(--text-primary);
          margin-bottom: var(--spacing-xl);
          padding-bottom: var(--spacing-sm);
          border-bottom: 2px solid var(--border);
        }

        .logo-upload {
          border: 2px dashed var(--border);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          text-align: center;
        }

        .logo-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md);
          background: var(--background-alt);
          border-radius: var(--radius-md);
        }

        .logo-placeholder {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
        }

        .upload-area {
          padding: var(--spacing-xl);
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          cursor: pointer;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .upload-label:hover {
          color: var(--primary-color);
        }

        .upload-label small {
          font-size: var(--font-size-xs);
          color: var(--text-muted);
        }

        .working-hours {
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .hour-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          align-items: center;
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--border);
        }

        .hour-row:last-child {
          border-bottom: none;
        }

        .day-name {
          font-weight: 500;
        }

        .time-inputs {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .time-inputs input[type="time"] {
          width: auto;
          padding: var(--spacing-xs) var(--spacing-sm);
          font-size: var(--font-size-sm);
        }

        .time-inputs span {
          color: var(--text-muted);
          font-size: var(--font-size-sm);
        }

        .closed-indicator {
          color: var(--text-muted);
          font-style: italic;
          font-size: var(--font-size-sm);
        }

        .notifications-grid,
        .privacy-toggles,
        .system-toggles {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .notification-item,
        .privacy-item,
        .system-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-lg);
          background: var(--background-alt);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
          transition: border-color var(--transition-fast);
        }

        .notification-item:hover,
        .privacy-item:hover,
        .system-item:hover {
          border-color: var(--primary-color);
        }

        .notification-info,
        .privacy-info,
        .system-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          flex: 1;
        }

        .notification-info svg,
        .privacy-info svg,
        .system-info svg {
          color: var(--primary-color);
          flex-shrink: 0;
        }

        .notification-info h4,
        .privacy-info h4,
        .system-info h4 {
          margin: 0 0 var(--spacing-xs) 0;
          color: var(--text-primary);
          font-size: var(--font-size-base);
        }

        .notification-info p,
        .privacy-info p,
        .system-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
          cursor: pointer;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--border);
          transition: var(--transition-normal);
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: var(--white);
          transition: var(--transition-normal);
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: var(--primary-color);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        .password-form {
          margin-bottom: var(--spacing-2xl);
          padding-bottom: var(--spacing-2xl);
          border-bottom: 1px solid var(--border);
        }

        .password-input {
          position: relative;
        }

        .password-input input {
          padding-left: 40px;
        }

        .password-toggle {
          position: absolute;
          left: var(--spacing-sm);
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: var(--spacing-xs);
          border-radius: var(--radius-sm);
          transition: color var(--transition-fast);
        }

        .password-toggle:hover {
          color: var(--primary-color);
        }

        .account-danger-zone {
          padding: var(--spacing-lg);
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: var(--radius-md);
        }

        .account-danger-zone h4 {
          color: var(--error);
          margin-bottom: var(--spacing-sm);
        }

        .account-danger-zone p {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-lg);
          font-size: var(--font-size-sm);
        }

        .danger-actions {
          display: flex;
          gap: var(--spacing-sm);
        }

        .backup-actions {
          display: flex;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .settings-container {
            grid-template-columns: 1fr;
            gap: var(--spacing-md);
          }

          .settings-tabs {
            position: static;
          }

          .tabs-nav {
            flex-direction: row;
            overflow-x: auto;
            gap: 0;
          }

          .tab-button {
            flex-shrink: 0;
            min-width: 120px;
            justify-content: center;
            padding: var(--spacing-sm) var(--spacing-md);
          }

          .tab-button span {
            display: none;
          }

          .tab-button:first-child,
          .tab-button:last-child {
            border-radius: 0;
          }

          .settings-content {
            padding: var(--spacing-lg);
          }

          .hour-row {
            grid-template-columns: 1fr;
            gap: var(--spacing-sm);
          }

          .time-inputs {
            justify-content: center;
          }

          .notification-item,
          .privacy-item,
          .system-item {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }

          .backup-actions {
            flex-direction: column;
          }

          .danger-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .settings-content {
            padding: var(--spacing-md);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .time-inputs {
            flex-direction: column;
            align-items: stretch;
          }

          .time-inputs span {
            text-align: center;
          }
        }

        /* Print Styles */
        @media print {
          .settings-tabs,
          .header-actions,
          .backup-actions,
          .danger-actions {
            display: none;
          }

          .settings-container {
            grid-template-columns: 1fr;
          }

          .account-danger-zone {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;