import React from 'react';
import Icon from '../../../components/AppIcon';

const ChartTypeSwitcher = ({ selectedType, onTypeChange, className = '' }) => {
  const chartTypes = [
    { id: 'line', label: 'Línea', icon: 'TrendingUp' },
    { id: 'bar', label: 'Barras', icon: 'BarChart3' },
    { id: 'area', label: 'Área', icon: 'Activity' }
  ];

  return (
    <div className={`flex items-center bg-muted rounded-lg p-1 ${className}`}>
      {chartTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onTypeChange(type.id)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            selectedType === type.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={type.icon} size={16} />
          <span className="hidden sm:inline">{type.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSwitcher;