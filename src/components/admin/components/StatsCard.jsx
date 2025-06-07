// src/components/admin/components/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCard.css';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  color = 'primary',
  trend,
  onClick,
  loading = false,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`stats-card stats-card--${color} ${onClick ? 'stats-card--clickable' : ''} ${loading ? 'stats-card--loading' : ''} ${className}`}
      onClick={handleClick}
      role={onClick ? 'button' : 'presentation'}
      tabIndex={onClick ? 0 : -1}
    >
      {loading && (
        <div className="stats-card-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className="stats-card-header">
        <div className="stats-card-icon">{icon}</div>
        <h3 className="stats-card-title">{title}</h3>
      </div>
      
      <div className="stats-card-content">
        <div className="stats-card-value">
          {typeof value === 'number' ? value.toLocaleString('he-IL') : value}
        </div>
        <div className="stats-card-subtitle">{subtitle}</div>
        
        {trend && (
          <div className={`stats-card-trend ${trend.isPositive ? 'trend-positive' : 'trend-negative'}`}>
            {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trend.value}%</span>
            <span className="trend-label">
              {trend.isPositive ? 'עלייה' : 'ירידה'} מהחודש הקודם
            </span>
          </div>
        )}
      </div>
      
      {onClick && (
        <div className="stats-card-overlay">
          <span>לחץ לפרטים נוספים</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;