import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  color = 'blue',
  suffix = '',
  isLive = false 
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'var(--success-dark)';
    if (trend === 'down') return 'var(--error-dark)';
    return 'var(--text-muted)';
  };

  const getIconBackground = () => {
    const colorMap = {
      blue: 'var(--info-light)',
      green: 'var(--success-light)',
      yellow: 'var(--warning-light)',
      purple: 'var(--info-light)'
    };
    return colorMap[color] || 'var(--info-light)';
  };

  const getIconColor = () => {
    const colorMap = {
      blue: 'var(--info-dark)',
      green: 'var(--success-dark)',
      yellow: 'var(--warning-dark)',
      purple: 'var(--info-dark)'
    };
    return colorMap[color] || 'var(--info-dark)';
  };

  return (
    <div className="card p-4 sm:p-6 card-hover">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
          style={{ background: getIconBackground() }}
        >
          <Icon name={icon} size={20} className="sm:w-6 sm:h-6" style={{ color: getIconColor() }} />
        </div>
        {isLive && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs" style={{ color: 'var(--success-dark)' }}>En vivo</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {value}{suffix}
          </span>
          {trendValue && (
            <div className="flex items-center space-x-1" style={{ color: getTrendColor() }}>
              <Icon name={getTrendIcon()} size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">{trendValue}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;