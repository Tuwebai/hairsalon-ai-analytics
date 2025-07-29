import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AppointmentCalendar = ({ 
  appointments, 
  className = '', 
  onViewAll, 
  onStatusFilter, 
  selectedStatusFilter = 'all' 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/30 text-muted-foreground border-muted/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Calendar';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return 'Programada';
    }
  };

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'confirmed', label: 'Confirmadas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'cancelled', label: 'Canceladas' }
  ];

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  const handleViewAllClick = () => {
    if (onViewAll) {
      onViewAll();
    }
  };

  const handleStatusFilterChange = (status) => {
    if (onStatusFilter) {
      onStatusFilter(status);
    }
  };

  return (
    <div className={`card p-4 sm:p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Citas de Hoy
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {todayAppointments.length} citas programadas
          </p>
        </div>
        <button
          onClick={handleViewAllClick}
          className="btn-secondary w-full sm:w-auto text-xs"
        >
          Ver Todo
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <Select
          options={statusOptions}
          value={selectedStatusFilter}
          onChange={handleStatusFilterChange}
          placeholder="Filtrar por estado"
        />
      </div>

      <div className="space-y-3">
        {todayAppointments.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <Icon name="Calendar" size={40} className="sm:w-12 sm:h-12 mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
              {selectedStatusFilter === 'all' ?'No hay citas programadas para hoy'
                : `No hay citas ${getStatusLabel(selectedStatusFilter).toLowerCase()} para hoy`
              }
            </p>
          </div>
        ) : (
          todayAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center space-x-3 p-3 rounded-lg border transition-colors cursor-pointer"
              style={{ 
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-primary)'
              }}
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--info-light)' }}>
                  <Icon name="User" size={14} className="sm:w-4 sm:h-4" style={{ color: 'var(--info-dark)' }} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {appointment.clientName}
                  </p>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {appointment.time}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {appointment.service}
                  </p>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    <Icon name={getStatusIcon(appointment.status)} size={10} className="sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">{getStatusLabel(appointment.status)}</span>
                    <span className="sm:hidden">{getStatusLabel(appointment.status).charAt(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {todayAppointments.length > 0 && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="grid grid-cols-2 gap-2">
            <button className="btn-secondary text-xs">
              Llamar
            </button>
            <button className="btn-secondary text-xs">
              Mensaje
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;