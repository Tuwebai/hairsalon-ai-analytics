import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import DemoModeIndicator from '../../components/ui/DemoModeIndicator';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';

// Datos simulados más realistas y dinámicos
const SIMULATED_DATA = {
  baseMetrics: {
    today: { messages: 127, appointments: 34, satisfaction: 4.7, revenue: 1250 },
    week: { messages: 1106, appointments: 218, satisfaction: 4.5, revenue: 14650 },
    month: { messages: 2635, appointments: 523, satisfaction: 4.4, revenue: 32900 }
  },
  trends: {
    today: { messages: 12.5, appointments: 8.2, satisfaction: 3.1, revenue: 5.7 },
    week: { messages: 15.3, appointments: 12.8, satisfaction: 2.4, revenue: 8.9 },
    month: { messages: 18.7, appointments: 14.2, satisfaction: 1.8, revenue: 11.5 }
  },
  chartData: {
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
  }
};

const MainAnalyticsOverviewDashboard = () => {
  const [selectedRange, setSelectedRange] = useState('today');
  const [chartType, setChartType] = useState('line');
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: 'info' });
  const [liveData, setLiveData] = useState({ messages: 0, appointments: 0 });
  
  const navigate = useNavigate();
  const { user } = useAuth();

  // Usuario actual memoizado
  const currentUser = useMemo(() => ({
    name: user?.username || "Usuario",
    role: user?.role || "Administrador"
  }), [user?.username, user?.role]);

  // Generar datos dinámicos basados en el rango seleccionado
  const generateDynamicData = useCallback((range) => {
    const base = SIMULATED_DATA.baseMetrics[range];
    const trends = SIMULATED_DATA.trends[range];
    
    // Simular variación realista basada en la hora del día
    const now = new Date();
    const hour = now.getHours();
    const timeMultiplier = hour >= 9 && hour <= 18 ? 1.2 : 0.8;
    
    return {
      messages: Math.round(base.messages * timeMultiplier),
      appointments: Math.round(base.appointments * timeMultiplier),
      satisfaction: Math.min(5, Math.max(1, base.satisfaction + (Math.random() - 0.5) * 0.2)),
      revenue: Math.round(base.revenue * timeMultiplier),
      trends
    };
  }, []);

  // Datos del gráfico memoizados
  const chartData = useMemo(() => 
    SIMULATED_DATA.chartData[selectedRange] || SIMULATED_DATA.chartData.today,
    [selectedRange]
  );

  // KPIs memoizados y dinámicos
  const kpiData = useMemo(() => {
    const dynamicData = generateDynamicData(selectedRange);
    
    return [
      {
        title: `Mensajes ${selectedRange === 'today' ? 'de Hoy' : selectedRange === 'week' ? 'de la Semana' : 'del Mes'}`,
        value: dynamicData.messages,
        trend: "up",
        trendValue: dynamicData.trends.messages,
        icon: "MessageSquare",
        color: "blue",
        isLive: true
      },
      {
        title: "Citas Reservadas",
        value: dynamicData.appointments,
        trend: "up",
        trendValue: dynamicData.trends.appointments,
        icon: "Calendar",
        color: "green"
      },
      {
        title: "Satisfacción Promedio",
        value: dynamicData.satisfaction,
        trend: "up",
        trendValue: dynamicData.trends.satisfaction,
        icon: "Star",
        color: "yellow",
        suffix: "/5"
      },
      {
        title: `Ingresos ${selectedRange === 'today' ? 'del Día' : selectedRange === 'week' ? 'de la Semana' : 'del Mes'}`,
        value: dynamicData.revenue,
        trend: "up",
        trendValue: dynamicData.trends.revenue,
        icon: "DollarSign",
        color: "purple",
        suffix: "€"
      }
    ];
  }, [selectedRange, generateDynamicData]);

  // Datos de citas simulados y dinámicos
  const appointmentsData = useMemo(() => {
    const baseAppointments = [
      { id: 1, clientName: "Ana Martínez", service: "Corte y Peinado", time: "10:00", status: "confirmed" },
      { id: 2, clientName: "Carlos Rodríguez", service: "Coloración", time: "11:30", status: "pending" },
      { id: 3, clientName: "Laura Fernández", service: "Tratamiento Capilar", time: "14:00", status: "confirmed" },
      { id: 4, clientName: "Miguel Torres", service: "Corte Masculino", time: "15:30", status: "cancelled" },
      { id: 5, clientName: "Patricia Silva", service: "Manicura", time: "16:00", status: "pending" }
    ];

    // Generar citas adicionales basadas en el rango
    const additionalCount = selectedRange === 'today' ? 0 : selectedRange === 'week' ? 15 : 50;
    const additionalAppointments = Array.from({ length: additionalCount }, (_, i) => ({
      id: 100 + i,
      clientName: `Cliente ${i + 1}`,
      service: ["Corte", "Coloración", "Tratamiento", "Manicura"][Math.floor(Math.random() * 4)],
      time: `${Math.floor(Math.random() * 8) + 9}:${Math.random() > 0.5 ? '00' : '30'}`,
      status: ["confirmed", "pending", "cancelled"][Math.floor(Math.random() * 3)],
      date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));

    return [...baseAppointments, ...additionalAppointments];
  }, [selectedRange]);

  // Filtros de citas
  const [appointmentFilters, setAppointmentFilters] = useState({ status: 'all' });

  // Citas filtradas memoizadas
  const filteredAppointments = useMemo(() => 
    appointmentFilters.status === 'all' 
      ? appointmentsData 
      : appointmentsData.filter(apt => apt.status === appointmentFilters.status),
    [appointmentsData, appointmentFilters.status]
  );

  // Datos de interacciones simulados y dinámicos
  const interactionsData = useMemo(() => {
    const baseInteractions = [
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
        clientName: "Valentin Berretta",
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

    // Generar interacciones adicionales basadas en el rango
    const additionalCount = selectedRange === 'today' ? 0 : selectedRange === 'week' ? 10 : 25;
    const additionalInteractions = Array.from({ length: additionalCount }, (_, i) => ({
      id: 1000 + i,
      clientName: `Cliente ${i + 1}`,
      phone: `+34 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
      message: "Consulta sobre servicios disponibles",
      sentiment: ["positive", "neutral", "negative"][Math.floor(Math.random() * 3)],
      outcome: ["booked", "interested", "not_interested"][Math.floor(Math.random() * 3)],
      time: `hace ${Math.floor(Math.random() * 60) + 1} min`
    }));

    return [...baseInteractions, ...additionalInteractions];
  }, [selectedRange]);

  // Simulación de datos en tiempo real
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      setLiveData(prev => ({
        messages: prev.messages + Math.floor(Math.random() * 3) + 1,
        appointments: prev.appointments + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeEnabled]);

  // Handlers memoizados
  const handleRangeChange = useCallback((range, customDates = null) => {
    console.log('🔄 handleRangeChange called with:', range, 'customDates:', customDates);
    console.log('📊 Previous selectedRange:', selectedRange);
    
    setSelectedRange(range);
    
    const rangeLabel = range === 'today' ? 'Hoy' : range === 'week' ? 'Esta semana' : 'Este mes';
    console.log('🏷️ Range label:', rangeLabel);
    
    showNotification(`Filtro actualizado a: ${rangeLabel}`, 'info');
  }, [selectedRange]);

  const handleChartTypeChange = useCallback((type) => {
    setChartType(type);
    showNotification(`Tipo de gráfico cambiado a: ${type === 'line' ? 'Línea' : type === 'area' ? 'Área' : 'Barras'}`, 'info');
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ isVisible: true, message, type });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification({ isVisible: false, message: '', type: 'info' });
  }, []);

  const handleExport = useCallback(async (format) => {
    console.log(`Exporting data in ${format} format...`);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Export completed: analytics_report.${format}`);
        resolve();
      }, 2000);
    });
  }, []);

  const handleViewAllAppointments = useCallback(() => {
    navigate('/appointment-management-dashboard');
  }, [navigate]);

  const handleAppointmentStatusFilter = useCallback((status) => {
    setAppointmentFilters({ status });
  }, []);

  // Datos del footer memoizados (eliminando duplicación)
  const footerStats = useMemo(() => {
    const dynamicData = generateDynamicData(selectedRange);
    return {
      messages: {
        title: `Mensajes ${selectedRange === 'today' ? 'de Hoy' : selectedRange === 'week' ? 'de la Semana' : 'del Mes'}`,
        value: dynamicData.messages.toLocaleString(),
        period: selectedRange === 'today' ? 'Hoy' : selectedRange === 'week' ? 'Esta semana' : 'Este mes',
        icon: "MessageSquare",
        color: "info"
      },
      appointments: {
        title: `Citas ${selectedRange === 'today' ? 'de Hoy' : selectedRange === 'week' ? 'de la Semana' : 'del Mes'}`,
        value: dynamicData.appointments.toLocaleString(),
        period: selectedRange === 'today' ? 'Hoy' : selectedRange === 'week' ? 'Esta semana' : 'Este mes',
        icon: "Calendar",
        color: "success"
      }
    };
  }, [selectedRange, generateDynamicData]);

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)' }}>
      <ParticleBackground particleCount={15} />
      <DemoModeIndicator />
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
              key={selectedRange}
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
              key={`${selectedRange}-${index}`}
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

        {/* Footer Stats - Optimizado y sin duplicación */}
        <div className="card p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg mx-auto mb-2 sm:mb-3" style={{ background: 'var(--info-light)' }}>
                <Icon name={footerStats.messages.icon} size={20} className="sm:w-6 sm:h-6" style={{ color: 'var(--info-dark)' }} />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {footerStats.messages.title}
              </h4>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-accent)' }}>
                {footerStats.messages.value}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {footerStats.messages.period}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg mx-auto mb-2 sm:mb-3" style={{ background: 'var(--success-light)' }}>
                <Icon name={footerStats.appointments.icon} size={20} className="sm:w-6 sm:h-6" style={{ color: 'var(--success-dark)' }} />
              </div>
              <h4 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {footerStats.appointments.title}
              </h4>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--success-dark)' }}>
                {footerStats.appointments.value}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {footerStats.appointments.period}
              </p>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        <NotificationToast
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
          duration={3000}
        />
      </div>
    </div>
  );
};

export default MainAnalyticsOverviewDashboard;