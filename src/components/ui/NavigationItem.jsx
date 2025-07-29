import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({ 
  path, 
  label, 
  icon, 
  tooltip, 
  isActive, 
  onClick,
  className = '' 
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      to={path}
      onClick={handleClick}
      className={`
        group relative flex items-center space-x-2 px-4 py-2 rounded-lg
        transition-all duration-200 ease-smooth
        ${isActive 
          ? 'bg-primary text-primary-foreground shadow-sm' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        }
        ${className}
      `}
      title={tooltip}
    >
      <Icon 
        name={icon} 
        size={18} 
        className={`transition-colors duration-200 ${
          isActive ? 'text-primary-foreground' : 'group-hover:text-foreground'
        }`}
      />
      <span className="text-sm font-medium whitespace-nowrap">
        {label}
      </span>
      
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </Link>
  );
};

export default NavigationItem;