import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AppointmentDetails = ({ selectedAppointment, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    service: '',
    date: '',
    time: '',
    duration: 60,
    staff: '',
    status: 'pending',
    phone: '',
    email: '',
    notes: ''
  });

  // Update form data when selectedAppointment changes
  useEffect(() => {
    if (selectedAppointment) {
      setFormData({
        customerName: selectedAppointment.customerName || '',
        service: selectedAppointment.service || '',
        date: selectedAppointment.date ? new Date(selectedAppointment.date).toISOString().split('T')[0] : '',
        time: selectedAppointment.time || '',
        duration: selectedAppointment.duration || 60,
        staff: selectedAppointment.staff || '',
        status: selectedAppointment.status || 'pending',
        phone: selectedAppointment.phone || '',
        email: selectedAppointment.email || '',
        notes: selectedAppointment.notes || ''
      });
    }
  }, [selectedAppointment]);

  const serviceOptions = [
    { value: 'Corte y Peinado', label: 'Corte y Peinado' },
    { value: 'Coloración', label: 'Coloración' },
    { value: 'Tratamiento Capilar', label: 'Tratamiento Capilar' },
    { value: 'Corte Masculino', label: 'Corte Masculino' },
    { value: 'Manicura', label: 'Manicura' },
    { value: 'Peinado', label: 'Peinado' }
  ];

  const staffOptions = [
    { value: 'María García', label: 'María García' },
    { value: 'Ana López', label: 'Ana López' },
    { value: 'Carmen Ruiz', label: 'Carmen Ruiz' }
  ];

  const statusOptions = [
    { value: 'confirmed', label: 'Confirmada' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'cancelled', label: 'Cancelada' },
    { value: 'completed', label: 'Completada' }
  ];

  const customerHistory = [
    {
      id: 1,
      date: "2024-07-15",
      service: "Corte y Peinado",
      staff: "María García",
      rating: 5,
      notes: "Cliente muy satisfecha con el resultado"
    },
    {
      id: 2,
      date: "2024-06-20",
      service: "Tinte",
      staff: "Ana López",
      rating: 4,
      notes: "Cambio de color exitoso"
    },
    {
      id: 3,
      date: "2024-05-10",
      service: "Tratamiento",
      staff: "Carmen Ruiz",
      rating: 5,
      notes: "Tratamiento hidratante"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
    // Show success message
    alert('Cita actualizada correctamente');
  };

  const handleCancel = () => {
    // Reset form data to original appointment data
    if (selectedAppointment) {
      setFormData({
        customerName: selectedAppointment.customerName || '',
        service: selectedAppointment.service || '',
        date: selectedAppointment.date ? new Date(selectedAppointment.date).toISOString().split('T')[0] : '',
        time: selectedAppointment.time || '',
        duration: selectedAppointment.duration || 60,
        staff: selectedAppointment.staff || '',
        status: selectedAppointment.status || 'pending',
        phone: selectedAppointment.phone || '',
        email: selectedAppointment.email || '',
        notes: selectedAppointment.notes || ''
      });
    }
    setIsEditing(false);
  };

  const handleConfirmAppointment = () => {
    const updatedData = { ...formData, status: 'confirmed' };
    setFormData(updatedData);
    if (onSave) {
      onSave(updatedData);
    }
    alert('Cita confirmada correctamente');
  };

  const handleCancelAppointment = () => {
    const updatedData = { ...formData, status: 'cancelled' };
    setFormData(updatedData);
    if (onSave) {
      onSave(updatedData);
    }
    alert('Cita cancelada correctamente');
  };

  const handleReschedule = () => {
    setIsEditing(true);
  };

  const handleSendSMS = () => {
    console.log('Sending SMS to:', formData.phone);
    // Simulate SMS sending
    alert(`SMS enviado a ${formData.phone}`);
  };

  const handleCall = () => {
    console.log('Calling:', formData.phone);
    // Simulate calling
    alert(`Llamando a ${formData.phone}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'cancelled': return 'text-error bg-error/10';
      case 'completed': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  if (!selectedAppointment) {
    return (
      <div className="bg-card rounded-lg p-4 sm:p-6 card-shadow">
        <div className="text-center py-6 sm:py-8">
          <Icon name="Calendar" size={40} className="sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
            Selecciona una Cita
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Haz clic en una cita del calendario para ver los detalles
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg card-shadow overflow-hidden">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            Detalles de la Cita
          </h3>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => setIsEditing(true)}
                  className="text-xs"
                >
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={onClose}
                  className="text-xs"
                />
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  onClick={handleSave}
                  className="text-xs"
                >
                  Guardar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  onClick={handleCancel}
                  className="text-xs"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Appointment Info */}
        <div className="space-y-4">
          {isEditing ? (
            <>
              <Input
                label="Nombre del Cliente"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Nombre completo"
              />
              
              <Input
                label="Teléfono"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+34 xxx xxx xxx"
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@ejemplo.com"
              />
              
              <Select
                label="Servicio"
                options={serviceOptions}
                value={formData.service}
                onChange={(value) => handleInputChange('service', value)}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Fecha"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
                <Input
                  label="Hora"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Duración (minutos)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  min="15"
                  max="300"
                />
                <Select
                  label="Personal"
                  options={staffOptions}
                  value={formData.staff}
                  onChange={(value) => handleInputChange('staff', value)}
                />
              </div>
              
              <Select
                label="Estado"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value)}
              />
              
              <Input
                label="Notas"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Notas adicionales..."
              />
            </>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h4 className="text-lg sm:text-xl font-semibold text-foreground">
                  {selectedAppointment.customerName}
                </h4>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(selectedAppointment.status)}`}>
                  {getStatusLabel(selectedAppointment.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">{selectedAppointment.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
                  <span className="text-xs sm:text-sm text-foreground">{selectedAppointment.email}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Servicio</p>
                  <p className="text-sm sm:text-base font-medium text-foreground">{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Personal</p>
                  <p className="text-sm sm:text-base font-medium text-foreground">{selectedAppointment.staff}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Fecha y Hora</p>
                  <p className="text-sm sm:text-base font-medium text-foreground">
                    {selectedAppointment.time} - {selectedAppointment.duration}min
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Fuente</p>
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={selectedAppointment.source === 'ai' ? 'Bot' : 'Phone'} 
                      size={14} 
                      className="sm:w-4 sm:h-4 text-muted-foreground" 
                    />
                    <span className="text-sm sm:text-base font-medium text-foreground">
                      {selectedAppointment.source === 'ai' ? 'IA Chatbot' : 'Teléfono'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Notas</p>
                  <p className="text-xs sm:text-sm text-foreground">{selectedAppointment.notes}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Actions */}
        {!isEditing && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            <Button variant="success" size="sm" iconName="Check" onClick={handleConfirmAppointment} className="text-xs">
              Confirmar
            </Button>
            <Button variant="warning" size="sm" iconName="Clock" onClick={handleReschedule} className="text-xs">
              Reprogramar
            </Button>
            <Button variant="outline" size="sm" iconName="MessageSquare" onClick={handleSendSMS} className="text-xs">
              Enviar SMS
            </Button>
            <Button variant="outline" size="sm" iconName="Phone" onClick={handleCall} className="text-xs">
              Llamar
            </Button>
            <Button variant="destructive" size="sm" iconName="X" onClick={handleCancelAppointment} className="text-xs">
              Cancelar
            </Button>
          </div>
        )}

        {/* Customer History */}
        {!isEditing && (
          <div className="pt-4 border-t border-border">
            <h5 className="text-xs sm:text-sm font-medium text-foreground mb-3">
              Historial del Cliente
            </h5>
            <div className="space-y-3 max-h-32 sm:max-h-48 overflow-y-auto">
              {customerHistory.map((visit) => (
                <div key={visit.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {visit.service}
                      </p>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={10}
                            className={`sm:w-3 sm:h-3 ${i < visit.rating ? 'text-warning fill-current' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(visit.date).toLocaleDateString('es-ES')} • {visit.staff}
                    </p>
                    {visit.notes && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {visit.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;