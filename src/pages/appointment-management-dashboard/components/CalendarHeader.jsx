import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CalendarHeader = ({ currentDate, onDateChange, selectedFilters, onFiltersChange }) => {
  const [viewMode, setViewMode] = useState('week');

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'confirmed', label: 'Confirmadas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'cancelled', label: 'Canceladas' }
  ];

  const staffOptions = [
    { value: 'all', label: 'Todo el personal' },
    { value: 'maria', label: 'María García' },
    { value: 'ana', label: 'Ana López' },
    { value: 'carmen', label: 'Carmen Ruiz' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'Todas las fuentes' },
    { value: 'ai', label: 'IA Chatbot' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'walkin', label: 'Presencial' },
    { value: 'online', label: 'Web' }
  ];

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatDateRange = () => {
    if (viewMode === 'week') {
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 card-shadow mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Date Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => navigateDate('prev')}
            />
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => navigateDate('next')}
            />
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-foreground capitalize">
              {formatDateRange()}
            </h2>
            <p className="text-sm text-muted-foreground">
              Semana {Math.ceil((currentDate.getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()) / 7)}
            </p>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={goToToday}
          >
            Hoy
          </Button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'day' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Día
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'week' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Semana
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Select
          label="Estado de Citas"
          options={statusOptions}
          value={selectedFilters.status}
          onChange={(value) => onFiltersChange({ ...selectedFilters, status: value })}
        />
        
        <Select
          label="Personal"
          options={staffOptions}
          value={selectedFilters.staff}
          onChange={(value) => onFiltersChange({ ...selectedFilters, staff: value })}
        />
        
        <Select
          label="Fuente de Reserva"
          options={sourceOptions}
          value={selectedFilters.source}
          onChange={(value) => onFiltersChange({ ...selectedFilters, source: value })}
        />
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-muted-foreground">Confirmadas: 18</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-muted-foreground">Pendientes: 4</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm text-muted-foreground">Canceladas: 2</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Última actualización: {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;