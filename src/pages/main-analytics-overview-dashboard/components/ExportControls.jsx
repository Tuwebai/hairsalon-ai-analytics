import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportControls = ({ onExport, className = '' }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const exportOptions = [
    { id: 'pdf', label: 'Exportar PDF', icon: 'FileText', format: 'pdf' },
    { id: 'csv', label: 'Exportar CSV', icon: 'Download', format: 'csv' },
    { id: 'excel', label: 'Exportar Excel', icon: 'FileSpreadsheet', format: 'xlsx' }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    setShowDropdown(false);
    
    try {
      await onExport(format);
      // Simulate export delay
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setShowDropdown(!showDropdown)}
        loading={isExporting}
        iconName="Download"
        iconPosition="left"
        disabled={isExporting}
      >
        {isExporting ? 'Exportando...' : 'Exportar'}
        <Icon name="ChevronDown" size={16} className="ml-2" />
      </Button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow z-50">
          <div className="py-2">
            {exportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleExport(option.format)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                disabled={isExporting}
              >
                <Icon name={option.icon} size={16} className="text-muted-foreground" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default ExportControls;