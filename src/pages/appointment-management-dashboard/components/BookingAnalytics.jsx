import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const BookingAnalytics = () => {
  const [chartType, setChartType] = useState('bar');
  const [timeRange, setTimeRange] = useState('week');

  const chartTypeOptions = [
    { value: 'bar', label: 'Gráfico de Barras' },
    { value: 'line', label: 'Gráfico de Líneas' },
    { value: 'area', label: 'Gráfico de Área' },
    { value: 'pie', label: 'Gráfico Circular' }
  ];

  const timeRangeOptions = [
    { value: 'week', label: 'Esta Semana' },
    { value: 'month', label: 'Este Mes' },
    { value: 'quarter', label: 'Este Trimestre' },
    { value: 'year', label: 'Este Año' }
  ];

  const bookingsByHour = [
    { hour: '09:00', bookings: 12, revenue: 540 },
    { hour: '10:00', bookings: 18, revenue: 810 },
    { hour: '11:00', bookings: 22, revenue: 990 },
    { hour: '12:00', bookings: 15, revenue: 675 },
    { hour: '13:00', bookings: 8, revenue: 360 },
    { hour: '14:00', bookings: 20, revenue: 900 },
    { hour: '15:00', bookings: 25, revenue: 1125 },
    { hour: '16:00', bookings: 28, revenue: 1260 },
    { hour: '17:00', bookings: 24, revenue: 1080 },
    { hour: '18:00', bookings: 16, revenue: 720 },
    { hour: '19:00', bookings: 10, revenue: 450 },
    { hour: '20:00', bookings: 6, revenue: 270 }
  ];

  const bookingsByDay = [
    { day: 'Lun', bookings: 45, name: 'Lunes' },
    { day: 'Mar', bookings: 52, name: 'Martes' },
    { day: 'Mié', bookings: 48, name: 'Miércoles' },
    { day: 'Jue', bookings: 61, name: 'Jueves' },
    { day: 'Vie', bookings: 68, name: 'Viernes' },
    { day: 'Sáb', bookings: 72, name: 'Sábado' },
    { day: 'Dom', bookings: 28, name: 'Domingo' }
  ];

  const serviceDistribution = [
    { name: 'Corte de Cabello', value: 35, color: '#1565C0' },
    { name: 'Tinte y Color', value: 25, color: '#42A5F5' },
    { name: 'Peinado', value: 20, color: '#90CAF9' },
    { name: 'Manicura', value: 12, color: '#E3F2FD' },
    { name: 'Tratamiento', value: 8, color: '#BBDEFB' }
  ];

  const renderChart = () => {
    const data = timeRange === 'week' ? bookingsByDay : bookingsByHour;
    
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3F2FD" />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : 'hour'} 
                stroke="#666666"
                fontSize={12}
              />
              <YAxis stroke="#666666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E3F2FD',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#1565C0" 
                strokeWidth={3}
                dot={{ fill: '#1565C0', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3F2FD" />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : 'hour'} 
                stroke="#666666"
                fontSize={12}
              />
              <YAxis stroke="#666666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E3F2FD',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="bookings" 
                stroke="#1565C0" 
                fill="url(#colorBookings)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1565C0" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1565C0" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default: // bar
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E3F2FD" />
              <XAxis 
                dataKey={timeRange === 'week' ? 'day' : 'hour'} 
                stroke="#666666"
                fontSize={12}
              />
              <YAxis stroke="#666666" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E3F2FD',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="bookings" 
                fill="#1565C0"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Chart */}
      <div className="bg-card rounded-lg card-shadow">
        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Análisis de Patrones de Reserva
            </h3>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Select
                options={timeRangeOptions}
                value={timeRange}
                onChange={setTimeRange}
                className="w-full sm:w-40"
              />
              
              <Select
                options={chartTypeOptions}
                value={chartType}
                onChange={setChartType}
                className="w-full sm:w-48"
              />
            </div>
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          {renderChart()}
        </div>
      </div>

      {/* Peak Hours Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card rounded-lg p-3 sm:p-4 card-shadow">
          <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
            Horarios Más Populares
          </h4>
          <div className="space-y-3">
            {bookingsByHour
              .sort((a, b) => b.bookings - a.bookings)
              .slice(0, 5)
              .map((slot, index) => (
                <div key={slot.hour} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                      index === 0 ? 'bg-primary text-white' :
                      index === 1 ? 'bg-secondary text-white': 'bg-muted text-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">{slot.hour}</p>
                      <p className="text-xs text-muted-foreground">
                        €{slot.revenue} ingresos
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-semibold text-foreground">
                      {slot.bookings} citas
                    </p>
                    <div className="w-16 sm:w-20 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(slot.bookings / 28) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-3 sm:p-4 card-shadow">
          <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
            Distribución de Servicios
          </h4>
          <div className="space-y-3">
            {serviceDistribution.map((service, index) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div 
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{ backgroundColor: service.color }}
                  ></div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    {service.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 sm:w-20 h-2 bg-muted rounded-full">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${service.value}%`,
                        backgroundColor: service.color
                      }}
                    ></div>
              </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground w-6 sm:w-8">
                    {service.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAnalytics;