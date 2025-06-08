import { useState } from 'react';
import { useQuery } from 'react-query';
import { galleryApi } from '../../services/api';
import axios from 'axios';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const DebugUpload = () => {
  const [debugInfo, setDebugInfo] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const { data: debugData, isLoading, refetch } = useQuery(
    'debug-uploads',
    galleryApi.debugUploads,
    { enabled: false }
  );

  const testAPIConnection = async () => {
    setIsTestingConnection(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const healthUrl = `${API_BASE_URL.replace('/api', '')}/health`;
      const result = await axios.get(healthUrl);
      setDebugInfo({ type: 'success', message: 'חיבור API תקין', data: result.data });
    } catch (error) {
      setDebugInfo({ type: 'error', message: 'שגיאה בחיבור API', error: error.message });
    }
    setIsTestingConnection(false);
  };

  const testFileUpload = async () => {
    // יצירת קובץ בדיקה
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // רקע כחול
    ctx.fillStyle = '#4299ff';
    ctx.fillRect(0, 0, 100, 100);
    
    // טקסט
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TEST', 50, 50);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'test-image.png');
      formData.append('category', 'general');
      formData.append('description', 'תמונת בדיקה אוטומטית');

      try {
        const result = await galleryApi.upload(formData);
        setDebugInfo({ 
          type: 'success', 
          message: 'העלאת קובץ בדיקה הצליחה', 
          data: result 
        });
        refetch(); // רענון נתוני debug
      } catch (error) {
        setDebugInfo({ 
          type: 'error', 
          message: 'שגיאה בהעלאת קובץ בדיקה', 
          error: error.message 
        });
      }
    }, 'image/png');
  };

  return (
    <div className="debug-upload">
      <Card className="debug-card">
        <h2>🔧 כלי Debug להעלאות</h2>
        
        <div className="debug-actions">
          <Button 
            variant="outline" 
            onClick={testAPIConnection}
            disabled={isTestingConnection}
          >
            {isTestingConnection ? <Spinner size="small" /> : null}
            בדיקת חיבור API
          </Button>
          
          <Button variant="outline" onClick={testFileUpload}>
            בדיקת העלאת קובץ
          </Button>
          
          <Button variant="outline" onClick={() => refetch()}>
            בדיקת מצב uploads
          </Button>
        </div>

        {debugInfo && (
          <div className={`debug-result debug-result--${debugInfo.type}`}>
            <h4>{debugInfo.message}</h4>
            {debugInfo.data && (
              <pre>{JSON.stringify(debugInfo.data, null, 2)}</pre>
            )}
            {debugInfo.error && (
              <div className="error-details">
                <strong>שגיאה:</strong> {debugInfo.error}
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="loading-section">
            <Spinner size="medium" />
            <p>טוען נתוני debug...</p>
          </div>
        )}

        {debugData && (
          <div className="debug-data">
            <h3>מצב תיקיית Uploads</h3>
            <div className="debug-info-grid">
              <div className="info-item">
                <strong>נתיב:</strong> {debugData.uploadsPath}
              </div>
              <div className="info-item">
                <strong>קבצים בדיסק:</strong> {debugData.totalFilesOnDisk}
              </div>
              <div className="info-item">
                <strong>תמונות בDB:</strong> {debugData.totalDbImages}
              </div>
            </div>

            {debugData.filesOnDisk?.length > 0 && (
              <div className="files-section">
                <h4>קבצים בדיסק (10 ראשונים):</h4>
                <ul className="files-list">
                  {debugData.filesOnDisk.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}

            {debugData.dbImages?.length > 0 && (
              <div className="db-images-section">
                <h4>תמונות בבסיס נתונים (10 ראשונות):</h4>
                <div className="db-images-list">
                  {debugData.dbImages.map((image) => (
                    <div key={image._id} className="db-image-item">
                      <div><strong>קובץ:</strong> {image.filename}</div>
                      <div><strong>שם מקורי:</strong> {image.originalName}</div>
                      <div><strong>תאריך:</strong> {new Date(image.uploadedAt).toLocaleString('he-IL')}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="debug-tips">
          <h4>טיפים לפתרון בעיות:</h4>
          <ul>
            <li>ודא שתיקיית uploads קיימת ויש הרשאות כתיבה</li>
            <li>בדוק שהשרת רץ על פורט 5000</li>
            <li>ודא ש-CORS מוגדר נכון</li>
            <li>בדוק שגודל הקובץ לא עולה על 5MB</li>
            <li>ודא שסוג הקובץ נתמך (JPG, PNG, GIF, WebP)</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default DebugUpload;