import React from 'react';
import Icon from '../AppIcon';

const MobileNavigationToggle = ({ isOpen, onToggle, className = '' }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center justify-center w-10 h-10 rounded-lg
        text-muted-foreground hover:text-foreground hover:bg-accent
        transition-all duration-200 ease-smooth
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        ${className}
      `}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
    >
      <Icon 
        name={isOpen ? 'X' : 'Menu'} 
        size={20}
        className="transition-transform duration-200"
      />
    </button>
  );
};

export default MobileNavigationToggle;