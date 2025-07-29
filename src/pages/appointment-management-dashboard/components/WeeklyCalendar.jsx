import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyCalendar = ({ currentDate, appointments, onAppointmentClick, onTimeSlotClick }) => {
  const [draggedAppointment, setDraggedAppointment] = useState(null);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9; // 9 AM to 8 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setDate(startOfWeek.getDate() + i);
    return startOfWeek;
  });

  const mockAppointments = [
    {
      id: 1,
      customerName: "María González",
      service: "Corte y Peinado",
      time: "10:00",
      duration: 90,
      status: "confirmed",
      staff: "María García",
      source: "ai",
      day: 1
    },
    {
      id: 2,
      customerName: "Ana Martín",
      service: "Tinte",
      time: "11:30",
      duration: 120,
      status: "pending",
      staff: "Ana López",
      source: "phone",
      day: 1
    },
    {
      id: 3,
      customerName: "Carmen Silva",
      service: "Manicura",
      time: "14:00",
      duration: 60,
      status: "confirmed",
      staff: "Carmen Ruiz",
      source: "online",
      day: 2
    },
    {
      id: 4,
      customerName: "Laura Pérez",
      service: "Corte",
      time: "16:00",
      duration: 45,
      status: "confirmed",
      staff: "María García",
      source: "walkin",
      day: 3
    },
    {
      id: 5,
      customerName: "Isabel Ruiz",
      service: "Tratamiento",
      time: "12:00",
      duration: 75,
      status: "cancelled",
      staff: "Ana López",
      source: "ai",
      day: 4
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-white';
      case 'pending': return 'bg-warning text-white';
      case 'cancelled': return 'bg-error text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'ai': return 'Bot';
      case 'phone': return 'Phone';
      case 'online': return 'Globe';
      case 'walkin': return 'MapPin';
      default: return 'Calendar';
    }
  };

  const handleDragStart = (e, appointment) => {
    setDraggedAppointment(appointment);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dayIndex, timeSlot) => {
    e.preventDefault();
    if (draggedAppointment) {
      console.log(`Moving appointment ${draggedAppointment.id} to day ${dayIndex} at ${timeSlot}`);
      setDraggedAppointment(null);
    }
  };

  const getAppointmentsForSlot = (dayIndex, timeSlot) => {
    return mockAppointments.filter(apt => 
      apt.day === dayIndex && apt.time === timeSlot
    );
  };

  const isTimeSlotBusy = (dayIndex, timeSlot) => {
    const appointments = getAppointmentsForSlot(dayIndex, timeSlot);
    return appointments.length > 0;
  };

  return (
    <div className="bg-card rounded-lg card-shadow overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Calendario Semanal</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header with days */}
          <div className="grid grid-cols-8 border-b border-border">
            <div className="p-3 text-sm font-medium text-muted-foreground bg-muted">
              Hora
            </div>
            {weekDays.map((day, index) => (
              <div key={index} className="p-3 text-center border-l border-border">
                <div className="text-sm font-medium text-foreground">
                  {day.toLocaleDateString('es-ES', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-semibold mt-1 ${
                  day.toDateString() === new Date().toDateString() 
                    ? 'text-primary' :'text-foreground'
                }`}>
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          <div className="divide-y divide-border">
            {timeSlots.map((timeSlot, timeIndex) => (
              <div key={timeSlot} className="grid grid-cols-8 min-h-[80px]">
                <div className="p-3 text-sm text-muted-foreground bg-muted border-r border-border flex items-start">
                  {timeSlot}
                </div>
                {weekDays.map((day, dayIndex) => {
                  const appointments = getAppointmentsForSlot(dayIndex, timeSlot);
                  const isBusy = isTimeSlotBusy(dayIndex, timeSlot);
                  
                  return (
                    <div
                      key={`${dayIndex}-${timeSlot}`}
                      className={`border-l border-border p-2 relative cursor-pointer transition-colors hover:bg-accent/50 ${
                        isBusy ? 'bg-accent/20' : ''
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, dayIndex, timeSlot)}
                      onClick={() => onTimeSlotClick && onTimeSlotClick(dayIndex, timeSlot)}
                    >
                      {appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, appointment)}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAppointmentClick && onAppointmentClick(appointment);
                          }}
                          className={`
                            ${getStatusColor(appointment.status)}
                            rounded-md p-2 mb-1 text-xs cursor-move
                            hover:shadow-md transition-shadow
                            ${draggedAppointment?.id === appointment.id ? 'opacity-50' : ''}
                          `}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium truncate">
                              {appointment.customerName}
                            </span>
                            <Icon 
                              name={getSourceIcon(appointment.source)} 
                              size={12} 
                              className="opacity-80"
                            />
                          </div>
                          <div className="truncate opacity-90">
                            {appointment.service}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="opacity-80">
                              {appointment.duration}min
                            </span>
                            <span className="opacity-80">
                              {appointment.staff.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {!isBusy && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Icon name="Plus" size={16} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Estados:</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-xs text-muted-foreground">Confirmada</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-warning rounded"></div>
              <span className="text-xs text-muted-foreground">Pendiente</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span className="text-xs text-muted-foreground">Cancelada</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Fuentes:</span>
            <div className="flex items-center space-x-1">
              <Icon name="Bot" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">IA</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Phone" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Teléfono</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Web</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;