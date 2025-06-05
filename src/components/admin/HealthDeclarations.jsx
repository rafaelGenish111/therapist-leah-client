import { useState } from 'react';
import { useQuery } from 'react-query';
import { Download, Search, Filter, Eye } from 'lucide-react';
import { healthDeclarationsApi } from '../../services/api';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

const HealthDeclarations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

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

  const handleExport = () => {
    // Implementation for exporting data
    console.log('Exporting declarations...');
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
        <h1>הצהרות בריאות</h1>
        <Button variant="outline" onClick={handleExport}>
          <Download size={16} />
          יצוא נתונים
        </Button>
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
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              placeholder="מתאריך"
            />
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              placeholder="עד תאריך"
            />
          </div>
        </div>
      </Card>

      <div className="declarations-list">
        {declarations.map((declaration) => (
          <Card key={declaration._id} className="declaration-item">
            <div className="declaration-header">
              <div className="patient-info">
                <h3>{declaration.fullName}</h3>
                <span className="id-number">ת.ז: {declaration.idNumber}</span>
                <span className="phone">{declaration.phoneNumber}</span>
              </div>
              <div className="declaration-date">
                {new Date(declaration.createdAt).toLocaleDateString('he-IL')}
              </div>
            </div>

            <div className="health-conditions">
              <h4>מצבים רפואיים מדווחים:</h4>
              <div className="conditions-list">
                {Object.entries(declaration.healthConditions)
                  .filter(([key, value]) => value === true)
                  .map(([condition]) => (
                    <span key={condition} className="condition-tag">
                      {condition}
                    </span>
                  ))}
              </div>
            </div>

            <div className="declaration-actions">
              <Button variant="outline" size="small">
                <Eye size={14} />
                צפייה מלאה
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="pagination">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            הקודם
          </Button>
          <span>עמוד {page} מתוך {pagination.pages}</span>
          <Button
            variant="outline"
            disabled={page >= pagination.pages}
            onClick={() => setPage(page + 1)}
          >
            הבא
          </Button>
        </div>
      )}
    </div>
  );
};

export default HealthDeclarations;