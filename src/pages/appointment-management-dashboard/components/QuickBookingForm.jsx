import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickBookingForm = ({ onBookingCreate, suggestedSlots }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    service: '',
    staff: '',
    date: '',
    time: '',
    duration: 60,
    notes: ''
  });

  const serviceOptions = [
    { value: 'corte', label: 'Corte de Cabello', duration: 45 },
    { value: 'tinte', label: 'Tinte y Color', duration: 120 },
    { value: 'peinado', label: 'Peinado', duration: 60 },
    { value: 'manicura', label: 'Manicura', duration: 60 },
    { value: 'tratamiento', label: 'Tratamiento Capilar', duration: 90 }
  ];

  const staffOptions = [
    { value: 'maria', label: 'María García', specialties: ['corte', 'peinado'] },
    { value: 'ana', label: 'Ana López', specialties: ['tinte', 'tratamiento'] },
    { value: 'carmen', label: 'Carmen Ruiz', specialties: ['manicura', 'peinado'] }
  ];

  const aiSuggestedSlots = [
    {
      date: '2024-07-29',
      time: '10:00',
      staff: 'María García',
      confidence: 95,
      reason: 'Horario preferido del cliente basado en historial'
    },
    {
      date: '2024-07-29',
      time: '14:30',
      staff: 'Ana López',
      confidence: 88,
      reason: 'Disponibilidad óptima para el servicio solicitado'
    },
    {
      date: '2024-07-30',
      time: '11:00',
      staff: 'Carmen Ruiz',
      confidence: 82,
      reason: 'Alternativa con menor tiempo de espera'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-set duration based on service
      if (field === 'service') {
        const selectedService = serviceOptions.find(s => s.value === value);
        if (selectedService) {
          newData.duration = selectedService.duration;
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookingCreate && onBookingCreate(formData);
    
    // Reset form
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      service: '',
      staff: '',
      date: '',
      time: '',
      duration: 60,
      notes: ''
    });
    setIsExpanded(false);
  };

  const handleSuggestedSlotSelect = (slot) => {
    setFormData(prev => ({
      ...prev,
      date: slot.date,
      time: slot.time,
      staff: slot.staff
    }));
  };

  const getAvailableStaff = () => {
    if (!formData.service) return staffOptions;
    
    return staffOptions.filter(staff => 
      staff.specialties.includes(formData.service)
    );
  };

  return (
    <div className="bg-card rounded-lg card-shadow">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Nueva Cita
          </h3>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Customer Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">
              Información del Cliente
            </h4>
            
            <Input
              label="Nombre Completo"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Nombre del cliente"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Teléfono"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+34 600 000 000"
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="cliente@email.com"
              />
            </div>
          </div>

          {/* Service Information */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">
              Detalles del Servicio
            </h4>
            
            <Select
              label="Servicio"
              options={serviceOptions}
              value={formData.service}
              onChange={(value) => handleInputChange('service', value)}
              placeholder="Seleccionar servicio"
              required
            />
            
            <Select
              label="Personal"
              options={getAvailableStaff()}
              value={formData.staff}
              onChange={(value) => handleInputChange('staff', value)}
              placeholder="Seleccionar estilista"
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Fecha"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
              <Input
                label="Hora"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                required
              />
            </div>
            
            <Input
              label="Duración (minutos)"
              type="number"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              min="15"
              max="300"
              step="15"
            />
            
            <Input
              label="Notas"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Notas adicionales o preferencias..."
            />
          </div>

          {/* AI Suggested Slots */}
          {formData.service && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Bot" size={16} className="text-primary" />
                <h4 className="text-sm font-medium text-foreground">
                  Horarios Sugeridos por IA
                </h4>
              </div>
              
              <div className="space-y-2">
                {aiSuggestedSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestedSlotSelect(slot)}
                    className="p-3 border border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(slot.date).toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            day: 'numeric', 
                            month: 'long' 
                          })} a las {slot.time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {slot.staff}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Icon name="Zap" size={12} className="text-primary" />
                          <span className="text-xs font-medium text-primary">
                            {slot.confidence}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground max-w-32 truncate">
                          {slot.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
            >
              Crear Cita
            </Button>
          </div>
        </form>
      )}

      {/* Collapsed View */}
      {!isExpanded && (
        <div className="p-4">
          <Button
            variant="outline"
            fullWidth
            iconName="Plus"
            onClick={() => setIsExpanded(true)}
          >
            Crear Nueva Cita
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickBookingForm;