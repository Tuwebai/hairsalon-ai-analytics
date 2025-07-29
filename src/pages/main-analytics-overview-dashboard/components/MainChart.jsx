import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const MainChart = ({ data, chartType = 'line', className = '', selectedRange = 'today' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 modal-shadow">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getChartTitle = () => {
    switch (selectedRange) {
      case 'today':
        return 'Análisis de Hoy - Mensajes, Satisfacción, Citas e Ingresos';
      case 'week':
        return 'Análisis de la Semana - Mensajes, Satisfacción, Citas e Ingresos';
      case 'month':
        return 'Análisis del Mes - Mensajes, Satisfacción, Citas e Ingresos';
      default:
        return 'Análisis de Mensajes, Satisfacción, Citas e Ingresos';
    }
  };

  const getChartDescription = () => {
    switch (selectedRange) {
      case 'today':
        return 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados hoy';
      case 'week':
        return 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados esta semana';
      case 'month':
        return 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados este mes';
      default:
        return 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados';
    }
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    if (chartType === 'bar') {
      return (
        <ComposedChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3F2FD" />
          <XAxis 
            dataKey="time" 
            stroke="#666666"
            fontSize={12}
          />
          <YAxis 
            yAxisId="left"
            stroke="#666666"
            fontSize={12}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            stroke="#666666"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="messages" 
            fill="#42A5F5" 
            name="Mensajes"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="satisfaction" 
            fill="#1565C0" 
            name="Satisfacción"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="appointments" 
            fill="#4CAF50" 
            name="Citas"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="revenue" 
            fill="#FF9800" 
            name="Ingresos (€)"
            radius={[4, 4, 0, 0]}
          />
        </ComposedChart>
      );
    }

    if (chartType === 'area') {
      return (
        <ComposedChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E3F2FD" />
          <XAxis 
            dataKey="time" 
            stroke="#666666"
            fontSize={12}
          />
          <YAxis 
            yAxisId="left"
            stroke="#666666"
            fontSize={12}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            stroke="#666666"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="messages" 
            stroke="#42A5F5" 
            fill="#42A5F5"
            fillOpacity={0.3}
            name="Mensajes"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="satisfaction" 
            stroke="#1565C0" 
            fill="#1565C0"
            fillOpacity={0.3}
            name="Satisfacción"
          />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="appointments" 
            stroke="#4CAF50" 
            fill="#4CAF50"
            fillOpacity={0.3}
            name="Citas"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="revenue" 
            stroke="#FF9800" 
            fill="#FF9800"
            fillOpacity={0.3}
            name="Ingresos (€)"
          />
        </ComposedChart>
      );
    }

    // Default line chart
    return (
      <ComposedChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E3F2FD" />
        <XAxis 
          dataKey="time" 
          stroke="#666666"
          fontSize={12}
        />
        <YAxis 
          yAxisId="left"
          stroke="#666666"
          fontSize={12}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          stroke="#666666"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="messages" 
          stroke="#42A5F5" 
          strokeWidth={3}
          name="Mensajes"
          dot={{ fill: '#42A5F5', strokeWidth: 2, r: 4 }}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="satisfaction" 
          stroke="#1565C0" 
          strokeWidth={3}
          name="Satisfacción"
          dot={{ fill: '#1565C0', strokeWidth: 2, r: 4 }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="appointments" 
          stroke="#4CAF50" 
          strokeWidth={3}
          name="Citas"
          dot={{ fill: '#4CAF50', strokeWidth: 2, r: 4 }}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="revenue" 
          stroke="#FF9800" 
          strokeWidth={3}
          name="Ingresos (€)"
          dot={{ fill: '#FF9800', strokeWidth: 2, r: 4 }}
        />
      </ComposedChart>
    );
  };

  return (
    <div className={`card p-4 sm:p-6 ${className}`}>
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {getChartTitle()}
        </h3>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          {getChartDescription()}
        </p>
      </div>
      
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;