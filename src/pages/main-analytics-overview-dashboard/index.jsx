import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import KPICard from './components/KPICard';
import DateRangePicker from './components/DateRangePicker';
import ChartTypeSwitcher from './components/ChartTypeSwitcher';
import MainChart from './components/MainChart';
import AppointmentCalendar from './components/AppointmentCalendar';
import RecentInteractions from './components/RecentInteractions';
import ExportControls from './components/ExportControls';
import NotificationToast from '../../components/ui/NotificationToast';
import ParticleBackground from '../../components/ui/ParticleBackground';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';

const MainAnalyticsOverviewDashboard = () => {
  const [selectedRange, setSelectedRange] = useState('today');
  const [chartType, setChartType] = useState('line');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'info' });
  const navigate = useNavigate();
  const { user } = useAuth();

  // Current user from auth context
  const currentUser = {
    name: user?.username || "Usuario",
    role: user?.role || "Administrador"
  };

  // Generate live message count based on selected range
  const getLiveMessageCount = (range) => {
    const baseCounts = {
      today: 127,
      week: 1106,
      month: 2635
    };
    return baseCounts[range] || baseCounts.today;
  };

  // Get current live message count
  const liveMessageCount = getLiveMessageCount(selectedRange);

  // Generate example data based on selected range with more realistic data
  const generateDataForRange = (range) => {
    const baseData = {
      today: [
        { time: '09:00', messages: 15, satisfaction: 4.2, appointments: 3, revenue: 180 },
        { time: '10:00', messages: 23, satisfaction: 4.5, appointments: 5, revenue: 320 },
        { time: '11:00', messages: 18, satisfaction: 4.3, appointments: 4, revenue: 280 },
        { time: '12:00', messages: 31, satisfaction: 4.7, appointments: 7, revenue: 450 },
        { time: '13:00', messages: 25, satisfaction: 4.4, appointments: 6, revenue: 380 },
        { time: '14:00', messages: 28, satisfaction: 4.6, appointments: 8, revenue: 520 },
        { time: '15:00', messages: 22, satisfaction: 4.8, appointments: 5, revenue: 350 },
        { time: '16:00', messages: 35, satisfaction: 4.5, appointments: 9, revenue: 580 }
      ],
      week: [
        { time: 'Lun', messages: 145, satisfaction: 4.3, appointments: 28, revenue: 1850 },
        { time: 'Mar', messages: 167, satisfaction: 4.5, appointments: 32, revenue: 2100 },
        { time: 'Mié', messages: 134, satisfaction: 4.2, appointments: 25, revenue: 1650 },
        { time: 'Jue', messages: 189, satisfaction: 4.7, appointments: 35, revenue: 2300 },
        { time: 'Vie', messages: 201, satisfaction: 4.6, appointments: 38, revenue: 2450 },
        { time: 'Sáb', messages: 156, satisfaction: 4.4, appointments: 30, revenue: 1950 },
        { time: 'Dom', messages: 98, satisfaction: 4.1, appointments: 22, revenue: 1400 }
      ],
      month: [
        { time: 'Sem 1', messages: 580, satisfaction: 4.2, appointments: 115, revenue: 7200 },
        { time: 'Sem 2', messages: 645, satisfaction: 4.4, appointments: 128, revenue: 8100 },
        { time: 'Sem 3', messages: 712, satisfaction: 4.6, appointments: 142, revenue: 8900 },
        { time: 'Sem 4', messages: 698, satisfaction: 4.5, appointments: 138, revenue: 8700 }
      ]
    };
    return baseData[range] || baseData.today;
  };

  // Generate KPI data based on selected range
  const generateKPIData = (range) => {
    const kpiDataByRange = {
      today: [
    {
      title: "Mensajes de Hoy",
          value: 127,
      trend: "up",
      trendValue: 12.5,
      icon: "MessageSquare",
      color: "blue",
      isLive: true
    },
    {
      title: "Citas Reservadas",
      value: 34,
      trend: "up",
      trendValue: 8.2,
      icon: "Calendar",
      color: "green"
    },
    {
      title: "Satisfacción Promedio",
      value: 4.7,
      trend: "up",
      trendValue: 3.1,
      icon: "Star",
      color: "yellow",
      suffix: "/5"
    },
    {
      title: "Ingresos del Día",
      value: 1250,
      trend: "up",
      trendValue: 5.7,
      icon: "DollarSign",
      color: "purple",
      suffix: "€"
    }
      ],
      week: [
        {
          title: "Mensajes de la Semana",
          value: 1106,
          trend: "up",
          trendValue: 15.3,
          icon: "MessageSquare",
          color: "blue",
          isLive: true
        },
        {
          title: "Citas Reservadas",
          value: 218,
          trend: "up",
          trendValue: 12.8,
          icon: "Calendar",
          color: "green"
        },
        {
          title: "Satisfacción Promedio",
          value: 4.5,
          trend: "up",
          trendValue: 2.4,
          icon: "Star",
          color: "yellow",
          suffix: "/5"
        },
        {
          title: "Ingresos de la Semana",
          value: 14650,
          trend: "up",
          trendValue: 8.9,
          icon: "DollarSign",
          color: "purple",
          suffix: "€"
        }
      ],
      month: [
        {
          title: "Mensajes del Mes",
          value: 2635,
          trend: "up",
          trendValue: 18.7,
          icon: "MessageSquare",
          color: "blue",
          isLive: true
        },
        {
          title: "Citas Reservadas",
          value: 523,
          trend: "up",
          trendValue: 14.2,
          icon: "Calendar",
          color: "green"
        },
        {
          title: "Satisfacción Promedio",
          value: 4.4,
          trend: "up",
          trendValue: 1.8,
          icon: "Star",
          color: "yellow",
          suffix: "/5"
        },
        {
          title: "Ingresos del Mes",
          value: 32900,
          trend: "up",
          trendValue: 11.5,
          icon: "DollarSign",
          color: "purple",
          suffix: "€"
        }
      ]
    };
    return kpiDataByRange[range] || kpiDataByRange.today;
  };

  // Get chart data based on selected range
  const chartData = generateDataForRange(selectedRange);

  // Get KPI data based on selected range
  const kpiData = generateKPIData(selectedRange);

  // Mock appointments data with status filters
  const [appointmentFilters, setAppointmentFilters] = useState({
    status: 'all'
  });

  const allAppointmentsData = [
    {
      id: 1,
      clientName: "Ana Martínez",
      service: "Corte y Peinado",
      time: "10:00",
      date: new Date().toISOString(),
      status: "confirmed"
    },
    {
      id: 2,
      clientName: "Carlos Rodríguez",
      service: "Coloración",
      time: "11:30",
      date: new Date().toISOString(),
      status: "pending"
    },
    {
      id: 3,
      clientName: "Laura Fernández",
      service: "Tratamiento Capilar",
      time: "14:00",
      date: new Date().toISOString(),
      status: "confirmed"
    },
    {
      id: 4,
      clientName: "Miguel Torres",
      service: "Corte Masculino",
      time: "15:30",
      date: new Date().toISOString(),
      status: "cancelled"
    },
    {
      id: 5,
      clientName: "Patricia Silva",
      service: "Manicura",
      time: "16:00",
      date: new Date().toISOString(),
      status: "pending"
    }
  ];

  // Filter appointments based on status
  const filteredAppointments = appointmentFilters.status === 'all' 
    ? allAppointmentsData 
    : allAppointmentsData.filter(apt => apt.status === appointmentFilters.status);

  // Mock interactions data
  const interactionsData = [
    {
      id: 1,
      clientName: "Sofia López",
      phone: "+34 612 345 678",
      message: "Hola, me gustaría reservar una cita para un corte y peinado para el viernes por la tarde.",
      sentiment: "positive",
      outcome: "booked",
      time: "hace 5 min"
    },
    {
      id: 2,
      clientName: "David García",
      phone: "+34 623 456 789",
      message: "¿Tienen disponibilidad para coloración esta semana? Necesito cambiar mi look urgentemente.",
      sentiment: "neutral",
      outcome: "interested",
      time: "hace 12 min"
    },
    {
      id: 3,
      clientName: "Carmen Ruiz",
      phone: "+34 634 567 890",
      message: "El servicio de la última vez no me gustó nada. Los precios son muy altos para la calidad.",
      sentiment: "negative",
      outcome: "not_interested",
      time: "hace 25 min"
    },
    {
      id: 4,
      clientName: "Roberto Jiménez",
      phone: "+34 645 678 901",
      message: "Excelente atención, muy profesionales. ¿Puedo reservar para el mismo estilista de la vez anterior?",
      sentiment: "positive",
      outcome: "booked",
      time: "hace 1 hora"
    }
  ];

  // Simulate real-time message updates
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      // The liveMessageCount state is now derived from selectedRange,
      // so we don't need to update it here directly.
      // The interval will continue to run, but the value displayed will
      // reflect the current selectedRange.
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeEnabled, selectedRange]); // Added selectedRange to dependency array

  const handleRangeChange = (range, customDates = null) => {
    setSelectedRange(range);
    showNotification(`Filtro actualizado a: ${range === 'today' ? 'Hoy' : range === 'week' ? 'Esta semana' : 'Este mes'}`, 'info');
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    showNotification(`Tipo de gráfico cambiado a: ${type === 'line' ? 'Línea' : type === 'area' ? 'Área' : 'Barras'}`, 'info');
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ isVisible: true, message, type });
  };

  const hideNotification = () => {
    setNotification({ isVisible: false, message: '', type: 'info' });
  };

  const handleExport = async (format) => {
    console.log(`Exporting data in ${format} format...`);
    // Simulate export process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Export completed: analytics_report.${format}`);
        resolve();
      }, 2000);
    });
  };

  const handleViewAllAppointments = () => {
    navigate('/appointment-management-dashboard');
  };

  const handleAppointmentStatusFilter = (status) => {
    setAppointmentFilters({ status });
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)' }}>
      <ParticleBackground particleCount={15} />
      <NavigationBar currentUser={currentUser} />
      
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
                Panel de Análisis Principal
              </h1>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                Resumen completo del rendimiento del salón y métricas de IA
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 card rounded-lg">
                <div className={`w-2 h-2 rounded-full ${realTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {realTimeEnabled ? 'En vivo' : 'Pausado'}
                </span>
                <button
                  onClick={() => setRealTimeEnabled(!realTimeEnabled)}
                  className="text-xs" style={{ color: 'var(--text-accent)' }}
                >
                  {realTimeEnabled ? 'Pausar' : 'Activar'}
                </button>
              </div>
              <ExportControls onExport={handleExport} />
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="sm:col-span-1 lg:col-span-4">
            <DateRangePicker
              selectedRange={selectedRange}
              onRangeChange={handleRangeChange}
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-4">
            <ChartTypeSwitcher
              selectedType={chartType}
              onTypeChange={handleChartTypeChange}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-center sm:justify-end">
            <div className="text-xs sm:text-sm text-center sm:text-right" style={{ color: 'var(--text-muted)' }}>
              Última actualización: {new Date().toLocaleTimeString('es-ES')}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              trend={kpi.trend}
              trendValue={kpi.trendValue}
              icon={kpi.icon}
              color={kpi.color}
              suffix={kpi.suffix}
              isLive={kpi.isLive}
              delay={index}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Main Chart */}
          <div className="xl:col-span-8">
            <MainChart
              data={chartData}
              chartType={chartType}
              selectedRange={selectedRange}
            />
          </div>

          {/* Appointment Calendar */}
          <div className="xl:col-span-4">
            <AppointmentCalendar 
              appointments={filteredAppointments} 
              onViewAll={handleViewAllAppointments}
              onStatusFilter={handleAppointmentStatusFilter}
              selectedStatusFilter={appointmentFilters.status}
            />
          </div>
        </div>

        {/* Recent Interactions Table */}
        <div className="mb-6 sm:mb-8">
          <RecentInteractions interactions={interactionsData} />
        </div>

        {/* Footer Stats - Removed staff utilization and other unwanted metrics */}
        <div className="card p-4 sm:p-6">
          
          {/* Notification Toast */}
          <NotificationToast
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={hideNotification}
            duration={3000}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg mx-auto mb-2 sm:mb-3" style={{ background: 'var(--info-light)' }}>
                <Icon name="MessageSquare" size={20} className="sm:w-6 sm:h-6" style={{ color: 'var(--info-dark)' }} />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {selectedRange === 'today' ? 'Mensajes de Hoy' : 
                 selectedRange === 'week' ? 'Mensajes de la Semana' : 'Mensajes del Mes'}
              </h4>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-accent)' }}>
                {selectedRange === 'today' ? '127' : 
                 selectedRange === 'week' ? '1,106' : '2,635'}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {selectedRange === 'today' ? 'Hoy' : 
                 selectedRange === 'week' ? 'Esta semana' : 'Este mes'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg mx-auto mb-2 sm:mb-3" style={{ background: 'var(--success-light)' }}>
                <Icon name="Calendar" size={20} className="sm:w-6 sm:h-6" style={{ color: 'var(--success-dark)' }} />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {selectedRange === 'today' ? 'Citas de Hoy' : 
                 selectedRange === 'week' ? 'Citas de la Semana' : 'Citas del Mes'}
              </h4>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--success-dark)' }}>
                {selectedRange === 'today' ? '34' : 
                 selectedRange === 'week' ? '218' : '523'}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {selectedRange === 'today' ? 'Hoy' : 
                 selectedRange === 'week' ? 'Esta semana' : 'Este mes'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAnalyticsOverviewDashboard;