import { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Heart, 
  Calendar, 
  Phone, 
  User, 
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { healthDeclarationsApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const HealthDeclarations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [selectedDeclaration, setSelectedDeclaration] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: declarationsData, isLoading } = useQuery(
    ['health-declarations', page, searchTerm, dateRange],
    () => healthDeclarationsApi.getAll({
      page,
      limit: 20,
      search: searchTerm,
      fromDate: dateRange.from,
      toDate: dateRange.to
    }),
    { keepPreviousData: true }
  );

  const { data: statsData } = useQuery(
    'health-declarations-stats',
    healthDeclarationsApi.getStats,
    { staleTime: 5 * 60 * 1000 }
  );

  const handleExport = () => {
    // Implementation for exporting data
    console.log('Exporting declarations...');
    // Here you would typically create a CSV or PDF export
  };

  const handleViewDeclaration = (declaration) => {
    setSelectedDeclaration(declaration);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConditionsCount = (healthConditions) => {
    if (!healthConditions) return 0;
    return Object.entries(healthConditions)
      .filter(([key, value]) => {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'object' && value !== null) {
          return value.hasSurgeries || value.hasOtherIssues || false;
        }
        return false;
      }).length;
  };

  const getRiskLevel = (conditionsCount) => {
    if (conditionsCount === 0) return { level: 'low', label: 'נמוך', color: 'success' };
    if (conditionsCount <= 3) return { level: 'medium', label: 'בינוני', color: 'warning' };
    return { level: 'high', label: 'גבוה', color: 'error' };
  };

  const healthConditionLabels = {
    skinDiseases: 'מחלות עור',
    heartDiseases: 'מחלות לב',
    diabetes: 'סוכרת',
    bloodPressure: 'לחץ דם',
    spineProblems: 'בעיות עמוד שדרה',
    fracturesOrSprains: 'שברים או נקעים',
    fluFeverInflammation: 'שפעת/חום/דלקת',
    epilepsy: 'אפילפסיה',
    surgeries: 'ניתוחים',
    chronicMedications: 'תרופות כרוניות',
    pregnancy: 'הריון',
    otherMedicalIssues: 'בעיות רפואיות אחרות'
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
      {/* Header with Stats */}
      <div className="manager-header">
        <div className="header-content">
          <div className="header-info">
            <h1>
              <Heart size={32} />
              הצהרות בריאות
            </h1>
            <p>נהל ועקוב אחר הצהרות הבריאות של המטופלים</p>
          </div>
          <Button variant="outline" onClick={handleExport} className="export-btn">
            <Download size={16} />
            יצוא נתונים
          </Button>
        </div>

        {/* Stats Cards */}
        {statsData && (
          <div className="stats-overview">
            <div className="stat-card-mini">
              <div className="stat-icon">
                <FileText size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.total}</div>
                <div className="stat-label">סה"כ הצהרות</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-icon success">
                <Calendar size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.today}</div>
                <div className="stat-label">היום</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-icon info">
                <Clock size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.thisWeek}</div>
                <div className="stat-label">השבוע</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <div className="stat-icon warning">
                <BarChart3 size={20} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{statsData.thisMonth}</div>
                <div className="stat-label">החודש</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
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
              <Calendar size={16} />
              <label>מתאריך:</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div className="date-input-group">
              <Calendar size={16} />
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

      {/* Declarations List */}
      <div className="declarations-list">
        {declarations.length === 0 ? (
          <Card className="empty-state">
            <div className="empty-content">
              <Heart size={64} />
              <h3>אין הצהרות להצגה</h3>
              <p>
                {searchTerm || dateRange.from || dateRange.to
                  ? 'לא נמצאו הצהרות התואמות לחיפוש'
                  : 'עדיין לא נשלחו הצהרות בריאות'
                }
              </p>
            </div>
          </Card>
        ) : (
          declarations.map((declaration) => {
            const conditionsCount = getConditionsCount(declaration.healthConditions);
            const riskLevel = getRiskLevel(conditionsCount);
            
            return (
              <Card key={declaration._id} className="declaration-item">
                <div className="declaration-header">
                  <div className="patient-info">
                    <div className="patient-main">
                      <h3>{declaration.fullName}</h3>
                      <div className="patient-details">
                        <span className="detail-item">
                          <User size={14} />
                          ת.ז: {declaration.idNumber}
                        </span>
                        <span className="detail-item">
                          <Phone size={14} />
                          {declaration.phoneNumber}
                        </span>
                        {declaration.ipAddress && (
                          <span className="detail-item">
                            <MapPin size={14} />
                            IP: {declaration.ipAddress}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="declaration-meta">
                    <div className="submission-time">
                      <Clock size={14} />
                      {formatDate(declaration.createdAt)}
                    </div>
                    <div className={`risk-badge risk-${riskLevel.color}`}>
                      {riskLevel.color === 'success' && <CheckCircle size={14} />}
                      {riskLevel.color === 'warning' && <AlertTriangle size={14} />}
                      {riskLevel.color === 'error' && <AlertTriangle size={14} />}
                      סיכון {riskLevel.label}
                    </div>
                  </div>
                </div>

                <div className="conditions-summary">
                  <h4>
                    <Heart size={16} />
                    מצבים רפואיים ({conditionsCount} מתוך {Object.keys(healthConditionLabels).length})
                  </h4>
                  
                  {conditionsCount > 0 ? (
                    <div className="conditions-grid">
                      {Object.entries(declaration.healthConditions)
                        .filter(([key, value]) => {
                          if (typeof value === 'boolean') return value;
                          if (typeof value === 'object' && value !== null) {
                            return value.hasSurgeries || value.hasOtherIssues || false;
                          }
                          return false;
                        })
                        .slice(0, 6)
                        .map(([condition, value]) => (
                          <span key={condition} className="condition-tag">
                            {healthConditionLabels[condition] || condition}
                            {typeof value === 'object' && value.details && (
                              <small>: {value.details.substring(0, 30)}...</small>
                            )}
                          </span>
                        ))
                      }
                      {conditionsCount > 6 && (
                        <span className="condition-tag more">
                          +{conditionsCount - 6} נוספים
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="no-conditions">
                      <CheckCircle size={16} />
                      <span>לא דווחו מצבים רפואיים</span>
                    </div>
                  )}
                </div>

                <div className="declaration-actions">
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => handleViewDeclaration(declaration)}
                  >
                    <Eye size={14} />
                    צפייה מלאה
                  </Button>
                  <Button variant="outline" size="small">
                    <Download size={14} />
                    הורד PDF
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="pagination-btn"
          >
            הקודם
          </Button>
          <div className="pagination-info">
            <span className="current-page">{page}</span>
            <span className="separator">מתוך</span>
            <span className="total-pages">{pagination.pages}</span>
          </div>
          <Button
            variant="outline"
            disabled={page >= pagination.pages}
            onClick={() => setPage(page + 1)}
            className="pagination-btn"
          >
            הבא
          </Button>
        </div>
      )}

      {/* Declaration Modal */}
      {showModal && selectedDeclaration && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <FileText size={24} />
                הצהרת בריאות - {selectedDeclaration.fullName}
              </h2>
              <Button variant="ghost" onClick={() => setShowModal(false)}>
                <X size={20} />
              </Button>
            </div>

            <div className="modal-body">
              <div className="patient-details-full">
                <h3>פרטי המטופל</h3>
                <div className="details-grid">
                  <div className="detail-row">
                    <span className="label">שם מלא:</span>
                    <span className="value">{selectedDeclaration.fullName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">ת.ז:</span>
                    <span className="value">{selectedDeclaration.idNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">טלפון:</span>
                    <span className="value">{selectedDeclaration.phoneNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">תאריך שליחה:</span>
                    <span className="value">{formatDate(selectedDeclaration.createdAt)}</span>
                  </div>
                  {selectedDeclaration.ipAddress && (
                    <div className="detail-row">
                      <span className="label">כתובת IP:</span>
                      <span className="value">{selectedDeclaration.ipAddress}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="health-conditions-full">
                <h3>מצבים רפואיים</h3>
                <div className="conditions-list">
                  {Object.entries(selectedDeclaration.healthConditions).map(([condition, value]) => {
                    const isActive = typeof value === 'boolean' ? value : 
                                   (typeof value === 'object' && value !== null) ? 
                                   (value.hasSurgeries || value.hasOtherIssues || false) : false;
                    
                    return (
                      <div key={condition} className={`condition-item ${isActive ? 'active' : 'inactive'}`}>
                        <div className="condition-header">
                          {isActive ? <CheckCircle size={16} /> : <div className="empty-circle" />}
                          <span className="condition-name">
                            {healthConditionLabels[condition] || condition}
                          </span>
                        </div>
                        {typeof value === 'object' && value !== null && value.details && (
                          <div className="condition-details">
                            <p>{value.details}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="declaration-confirmation">
                <h3>אישור הצהרה</h3>
                <div className="confirmation-item">
                  <CheckCircle size={16} color="green" />
                  <span>המטופל אישר כי המידע שמסר נכון ומדויק</span>
                </div>
                {selectedDeclaration.signature && (
                  <div className="signature-section">
                    <h4>חתימה דיגיטלית:</h4>
                    <div className="signature-display">
                      <img src={selectedDeclaration.signature} alt="חתימה דיגיטלית" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <Button variant="primary">
                <Download size={16} />
                הורד PDF
              </Button>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                סגור
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthDeclarations;