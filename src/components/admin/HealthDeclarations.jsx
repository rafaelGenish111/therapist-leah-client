import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Download, Search, Filter, Eye, Trash2, FileText, Calendar, Phone, User, Heart, AlertCircle, FileDown } from 'lucide-react';
import { healthDeclarationsApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import { generateAllDeclarationsPDF, generateSingleDeclarationPDF } from '../../utils/PDFGenerator';
import './HealthDeclarations.css';

const HealthDeclarations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedDeclaration, setSelectedDeclaration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { data: declarationsData, isLoading } = useQuery(
    ['health-declarations', page, searchTerm, dateRange],
    () => healthDeclarationsApi.getAll({
      page,
      limit: 12,
      search: searchTerm,
      fromDate: dateRange.from,
      toDate: dateRange.to
    }),
    { keepPreviousData: true }
  );

  const deleteMutation = useMutation(healthDeclarationsApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('health-declarations');
      toast.success('ההצהרה נמחקה בהצלחה');
    },
    onError: (error) => {
      toast.error(error.message || 'שגיאה במחיקת ההצהרה');
    }
  });

  const handleExport = async () => {
    try {
      toast.loading('יוצר קובץ PDF...');
      const allDeclarations = await healthDeclarationsApi.getAll({ limit: 1000 });
      await generateAllDeclarationsPDF(allDeclarations.declarations);
      toast.dismiss();
      toast.success('הקובץ הורד בהצלחה!');
    } catch (error) {
      toast.dismiss();
      toast.error('שגיאה ביצירת הקובץ');
      console.error('Export error:', error);
    }
  };

  const handleSinglePDFDownload = async (declaration) => {
    try {
      toast.loading('יוצר קובץ PDF...');
      await generateSingleDeclarationPDF(declaration);
      toast.dismiss();
      toast.success('הקובץ הורד בהצלחה!');
    } catch (error) {
      toast.dismiss();
      toast.error('שגיאה ביצירת הקובץ');
      console.error('PDF generation error:', error);
    }
  };

  const viewDeclaration = (declaration) => {
    setSelectedDeclaration(declaration);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את ההצהרה?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="declarations-manager">
        <div className="loading-container">
          <Spinner size="large" />
          <p>טוען הצהרות...</p>
        </div>
      </div>
    );
  }

  const declarations = declarationsData?.declarations || [];
  const pagination = declarationsData?.pagination || {};

  return (
    <div className="declarations-manager">
      <div className="manager-header">
        <div className="header-content">
          <div>
            <h1>הצהרות בריאות</h1>
            <p>ניהול והצגת הצהרות בריאות של המטופלים</p>
          </div>
          <Button variant="primary" onClick={handleExport}>
            <Download size={16} />
            יצוא כל ההצהרות
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="filters-container">
          <div className="search-input-group">
            <Search size={20} />
            <input
              type="text"
              placeholder="חיפוש לפי שם או ת.ז..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="date-filters">
            <div className="date-input-group">
              <label>מתאריך:</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div className="date-input-group">
              <label>עד תאריך:</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="declarations-grid">
        {declarations.map((declaration) => {
          const hasConditions = Object.values(declaration.healthConditions).some(
            condition => condition === true || 
            (typeof condition === 'object' && (condition.hasSurgeries || condition.hasOtherIssues))
          );

          return (
            <Card key={declaration._id} className="declaration-card" hover>
              <div className="declaration-header">
                <div className="patient-avatar">
                  <User size={24} />
                </div>
                <div className="patient-details">
                  <h3>{declaration.fullName}</h3>
                  <div className="patient-meta">
                    <span className="id-badge">
                      <FileText size={14} />
                      {declaration.idNumber}
                    </span>
                    <span className="phone-badge">
                      <Phone size={14} />
                      {declaration.phoneNumber}
                    </span>
                  </div>
                </div>
                <div className="declaration-status">
                  {hasConditions ? (
                    <span className="status-badge warning">
                      <AlertCircle size={14} />
                      דורש תשומת לב
                    </span>
                  ) : (
                    <span className="status-badge success">
                      <Heart size={14} />
                      תקין
                    </span>
                  )}
                </div>
              </div>

              <div className="declaration-summary">
                {hasConditions ? (
                  <div className="conditions-preview">
                    <h4>מצבים רפואיים:</h4>
                    <div className="conditions-tags">
                      {Object.entries(declaration.healthConditions)
                        .filter(([key, value]) => value === true || 
                          (typeof value === 'object' && (value.hasSurgeries || value.hasOtherIssues)))
                        .slice(0, 3)
                        .map(([condition], index) => (
                          <span key={index} className="condition-tag">
                            {condition === 'skinDiseases' && 'מחלות עור'}
                            {condition === 'heartDiseases' && 'מחלות לב'}
                            {condition === 'diabetes' && 'סוכרת'}
                            {condition === 'bloodPressure' && 'לחץ דם'}
                            {condition === 'spineProblems' && 'בעיות עמוד שדרה'}
                            {condition === 'fracturesOrSprains' && 'שברים/נקעים'}
                            {condition === 'fluFeverInflammation' && 'שפעת/חום'}
                            {condition === 'epilepsy' && 'אפילפסיה'}
                            {condition === 'surgeries' && 'ניתוחים'}
                            {condition === 'chronicMedications' && 'תרופות כרוניות'}
                            {condition === 'pregnancy' && 'הריון'}
                            {condition === 'otherMedicalIssues' && 'אחר'}
                          </span>
                        ))}
                      {Object.entries(declaration.healthConditions)
                        .filter(([key, value]) => value === true || 
                          (typeof value === 'object' && (value.hasSurgeries || value.hasOtherIssues)))
                        .length > 3 && (
                        <span className="condition-tag more">
                          +{Object.entries(declaration.healthConditions)
                            .filter(([key, value]) => value === true || 
                              (typeof value === 'object' && (value.hasSurgeries || value.hasOtherIssues)))
                            .length - 3} נוספים
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="no-conditions">
                    <Heart size={20} />
                    <p>לא דווחו מצבים רפואיים</p>
                  </div>
                )}
              </div>

              <div className="declaration-footer">
                <div className="declaration-date">
                  <Calendar size={14} />
                  {new Date(declaration.createdAt).toLocaleDateString('he-IL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="declaration-actions">
                  <Button 
                    variant="outline" 
                    size="small" 
                    onClick={() => viewDeclaration(declaration)}
                  >
                    <Eye size={14} />
                    צפייה
                  </Button>
                  <Button 
                    variant="outline" 
                    size="small" 
                    onClick={() => handleSinglePDFDownload(declaration)}
                  >
                    <FileDown size={14} />
                    PDF
                  </Button>
                  <Button 
                    variant="danger" 
                    size="small" 
                    onClick={() => handleDelete(declaration._id)}
                    disabled={deleteMutation.isLoading}
                  >
                    <Trash2 size={14} />
                    מחיקה
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {declarations.length === 0 && (
        <Card className="empty-state">
          <div className="empty-content">
            <FileText size={48} />
            <h3>אין הצהרות זמינות</h3>
            <p>לא נמצאו הצהרות בריאות בהתאם לחיפוש</p>
          </div>
        </Card>
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            הקודם
          </Button>
          <span className="page-info">
            עמוד {page} מתוך {pagination.pages} ({pagination.total} הצהרות)
          </span>
          <Button
            variant="outline"
            disabled={page >= pagination.pages}
            onClick={() => setPage(page + 1)}
          >
            הבא
          </Button>
        </div>
      )}

      {/* Modal for viewing declaration details */}
      {showModal && selectedDeclaration && (
        <DeclarationModal 
          declaration={selectedDeclaration}
          onClose={() => setShowModal(false)}
          onDownload={() => handleSinglePDFDownload(selectedDeclaration)}
        />
      )}
    </div>
  );
};

// Modal component for detailed view
const DeclarationModal = ({ declaration, onClose, onDownload }) => {
  const conditionLabels = {
    skinDiseases: 'מחלות עור',
    heartDiseases: 'מחלות לב', 
    diabetes: 'סוכרת',
    bloodPressure: 'לחץ דם גבוה',
    spineProblems: 'בעיות עמוד שדרה',
    fracturesOrSprains: 'שברים או נקעים',
    fluFeverInflammation: 'שפעת, חום או דלקת',
    epilepsy: 'אפילפסיה',
    surgeries: 'ניתוחים בעבר',
    chronicMedications: 'נטילת תרופות כרוניות',
    pregnancy: 'הריון',
    otherMedicalIssues: 'בעיות רפואיות אחרות'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>הצהרת בריאות - {declaration.fullName}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="patient-info-section">
            <h3>פרטי המטופל</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>שם מלא:</label>
                <span>{declaration.fullName}</span>
              </div>
              <div className="info-item">
                <label>מספר זהות:</label>
                <span>{declaration.idNumber}</span>
              </div>
              <div className="info-item">
                <label>טלפון:</label>
                <span>{declaration.phoneNumber}</span>
              </div>
              <div className="info-item">
                <label>תאריך הצהרה:</label>
                <span>{new Date(declaration.createdAt).toLocaleDateString('he-IL')}</span>
              </div>
            </div>
          </div>

          <div className="conditions-section">
            <h3>מצבים רפואיים</h3>
            <div className="conditions-list">
              {Object.entries(declaration.healthConditions).map(([key, value]) => (
                <div key={key} className={`condition-item ${value ? 'positive' : 'negative'}`}>
                  <div className="condition-label">
                    {value ? '✓' : '✗'} {conditionLabels[key]}
                  </div>
                  {typeof value === 'object' && value.details && (
                    <div className="condition-details">
                      פרטים: {value.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="declaration-confirmation">
            <div className="confirmation-item">
              <strong>אישור הצהרה:</strong> 
              <span className={declaration.declarationConfirmed ? 'confirmed' : 'not-confirmed'}>
                {declaration.declarationConfirmed ? 'אושר' : 'לא אושר'}
              </span>
            </div>
            <div className="confirmation-item">
              <strong>חתימה דיגיטלית:</strong>
              <span>{declaration.signature ? 'קיימת' : 'חסרה'}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="primary" onClick={() => handleSinglePDFDownload(declaration)}>
            <FileDown size={16} />
            הורד PDF
          </Button>
          <Button variant="outline" onClick={onClose}>
            סגור
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthDeclarations;