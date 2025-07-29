import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangePicker = ({ selectedRange, onRangeChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const presets = [
    { id: 'today', label: 'Hoy', value: 'today' },
    { id: 'week', label: 'Esta Semana', value: 'week' },
    { id: 'month', label: 'Este Mes', value: 'month' },
    { id: 'custom', label: 'Personalizado', value: 'custom' }
  ];

  const handlePresetSelect = (preset) => {
    if (preset.value === 'custom') {
      return;
    }
    onRangeChange(preset.value);
    setIsOpen(false);
  };

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      onRangeChange('custom', { start: customStart, end: customEnd });
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    const preset = presets.find(p => p.value === selectedRange);
    return preset ? preset.label : 'Seleccionar rango';
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Calendar"
        iconPosition="left"
        className="w-full justify-between"
      >
        {getDisplayText()}
        <Icon name="ChevronDown" size={16} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg modal-shadow z-50">
          <div className="p-4 space-y-3">
            {presets.map((preset) => (
              <div key={preset.id}>
                <button
                  onClick={() => handlePresetSelect(preset)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedRange === preset.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent/50 text-foreground'
                  }`}
                >
                  {preset.label}
                </button>
                
                {preset.value === 'custom' && selectedRange === 'custom' && (
                  <div className="mt-3 p-3 bg-muted rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Desde
                        </label>
                        <input
                          type="date"
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Hasta
                        </label>
                        <input
                          type="date"
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                        />
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleCustomApply}
                      disabled={!customStart || !customEnd}
                      className="w-full"
                    >
                      Aplicar
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;