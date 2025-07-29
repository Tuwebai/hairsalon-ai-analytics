import React, { useState } from 'react';
import NavigationBar from '../../components/ui/NavigationBar';
import AppointmentStatistics from './components/AppointmentStatistics';
import CalendarHeader from './components/CalendarHeader';
import WeeklyCalendar from './components/WeeklyCalendar';
import AppointmentDetails from './components/AppointmentDetails';
import QuickBookingForm from './components/QuickBookingForm';
import BookingAnalytics from './components/BookingAnalytics';

const AppointmentManagementDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    staff: 'all',
    source: 'all'
  });

  const currentUser = {
    name: "Administrador",
    role: "admin"
  };

  // Enhanced sample appointments data
  const sampleAppointments = [
    {
      id: 1,
      customerName: "Ana Martínez",
      service: "Corte y Peinado",
      time: "10:00",
      date: new Date().toISOString(),
      duration: 60,
      staff: "María García",
      status: "confirmed",
      phone: "+34 612 345 678",
      email: "ana.martinez@email.com",
      notes: "Cliente frecuente, prefiere estilo clásico",
      source: "ai"
    },
    {
      id: 2,
      customerName: "Carlos Rodríguez",
      service: "Coloración",
      time: "11:30",
      date: new Date().toISOString(),
      duration: 120,
      staff: "Ana López",
      status: "pending",
      phone: "+34 623 456 789",
      email: "carlos.rodriguez@email.com",
      notes: "Primera vez con coloración, consultar opciones",
      source: "phone"
    },
    {
      id: 3,
      customerName: "Laura Fernández",
      service: "Tratamiento Capilar",
      time: "14:00",
      date: new Date().toISOString(),
      duration: 90,
      staff: "Carmen Ruiz",
      status: "confirmed",
      phone: "+34 634 567 890",
      email: "laura.fernandez@email.com",
      notes: "Cabello dañado, necesita tratamiento intensivo",
      source: "ai"
    },
    {
      id: 4,
      customerName: "Miguel Torres",
      service: "Corte Masculino",
      time: "15:30",
      date: new Date().toISOString(),
      duration: 45,
      staff: "María García",
      status: "cancelled",
      phone: "+34 645 678 901",
      email: "miguel.torres@email.com",
      notes: "Canceló por urgencia familiar",
      source: "phone"
    }
  ];

  const handleAppointmentClick = (appointment) => {
    // Find the appointment from our sample data or use the clicked one
    const fullAppointment = sampleAppointments.find(apt => apt.id === appointment.id) || appointment;
    setSelectedAppointment(fullAppointment);
  };

  const handleTimeSlotClick = (dayIndex, timeSlot) => {
    console.log(`Time slot clicked: Day ${dayIndex}, Time ${timeSlot}`);
  };

  const handleBookingCreate = (bookingData) => {
    console.log('New booking created:', bookingData);
  };

  const handleAppointmentSave = (appointmentData) => {
    console.log('Appointment updated:', appointmentData);
    // Update the appointment in the list
    const updatedAppointment = { ...selectedAppointment, ...appointmentData };
    setSelectedAppointment(updatedAppointment);
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar 
        currentUser={currentUser}
        onLogout={() => console.log('Logout')}
      />
      
      <div className="container mx-auto px-4 py-4 sm:py-6">
        {/* Page Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Gestión de Citas
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Panel de control para la administración de citas y análisis de reservas
          </p>
        </div>

        {/* Calendar Header with Filters */}
        <CalendarHeader
          currentDate={currentDate}
          onDateChange={handleDateChange}
          selectedFilters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-24 gap-4 sm:gap-6">
          {/* Left Sidebar - Statistics */}
          <div className="xl:col-span-6">
            <AppointmentStatistics />
          </div>

          {/* Main Calendar Area */}
          <div className="xl:col-span-12">
            <WeeklyCalendar
              currentDate={currentDate}
              appointments={sampleAppointments}
              onAppointmentClick={handleAppointmentClick}
              onTimeSlotClick={handleTimeSlotClick}
            />
          </div>

          {/* Right Panel - Details and Quick Booking */}
          <div className="xl:col-span-6 space-y-4 sm:space-y-6">
            <AppointmentDetails
              selectedAppointment={selectedAppointment}
              onClose={() => setSelectedAppointment(null)}
              onSave={handleAppointmentSave}
            />
            
            <QuickBookingForm
              onBookingCreate={handleBookingCreate}
              suggestedSlots={[]}
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-6 sm:mt-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              Análisis de Patrones de Reserva
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Insights y métricas para optimizar la gestión de citas
            </p>
          </div>
          
          <BookingAnalytics />
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagementDashboard;