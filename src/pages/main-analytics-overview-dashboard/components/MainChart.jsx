import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
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
import AnimatedChart from '../../../components/ui/AnimatedChart';

// Componente Tooltip memoizado
const CustomTooltip = memo(({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

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
});

CustomTooltip.displayName = 'CustomTooltip';

const MainChart = memo(({ data, chartType = 'line', className = '', selectedRange = 'today' }) => {
  // Memoizar el título y descripción del gráfico
  const chartInfo = useMemo(() => {
    const titles = {
      today: 'Análisis de Hoy - Mensajes, Satisfacción, Citas e Ingresos',
      week: 'Análisis de la Semana - Mensajes, Satisfacción, Citas e Ingresos',
      month: 'Análisis del Mes - Mensajes, Satisfacción, Citas e Ingresos'
    };

    const descriptions = {
      today: 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados hoy',
      week: 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados esta semana',
      month: 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados este mes'
    };

    return {
      title: titles[selectedRange] || 'Análisis de Mensajes, Satisfacción, Citas e Ingresos',
      description: descriptions[selectedRange] || 'Volumen de mensajes, calificación de satisfacción, citas programadas e ingresos generados'
    };
  }, [selectedRange]);

  // Memoizar las propiedades comunes del gráfico
  const commonProps = useMemo(() => ({
    data,
    margin: { top: 20, right: 30, left: 20, bottom: 5 }
  }), [data]);

  // Memoizar los gradientes
  const gradients = useMemo(() => ({
    barMessages: (
      <linearGradient id="barMessagesGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.7}/>
      </linearGradient>
    ),
    barSatisfaction: (
      <linearGradient id="barSatisfactionGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.9}/>
        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7}/>
      </linearGradient>
    ),
    barAppointments: (
      <linearGradient id="barAppointmentsGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
        <stop offset="95%" stopColor="#059669" stopOpacity={0.7}/>
      </linearGradient>
    ),
    barRevenue: (
      <linearGradient id="barRevenueGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.7}/>
      </linearGradient>
    ),
    areaMessages: (
      <linearGradient id="areaMessagesGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
      </linearGradient>
    ),
    areaSatisfaction: (
      <linearGradient id="areaSatisfactionGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
      </linearGradient>
    ),
    areaAppointments: (
      <linearGradient id="areaAppointmentsGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
      </linearGradient>
    ),
    areaRevenue: (
      <linearGradient id="areaRevenueGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
      </linearGradient>
    )
  }), []);

  // Renderizar gráfico de barras
  const renderBarChart = useCallback(() => (
    <ComposedChart {...commonProps}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
      <XAxis 
        dataKey="time" 
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <YAxis 
        yAxisId="left"
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <YAxis 
        yAxisId="right" 
        orientation="right"
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <defs>
        {gradients.barMessages}
        {gradients.barSatisfaction}
        {gradients.barAppointments}
        {gradients.barRevenue}
      </defs>
      <Bar 
        dataKey="messages" 
        fill="url(#barMessagesGradient)" 
        yAxisId="left"
        name="Mensajes"
        radius={[4, 4, 0, 0]}
      />
      <Bar 
        dataKey="appointments" 
        fill="url(#barAppointmentsGradient)" 
        yAxisId="left"
        name="Citas"
        radius={[4, 4, 0, 0]}
      />
      <Line 
        type="monotone" 
        dataKey="satisfaction" 
        stroke="#60a5fa" 
        strokeWidth={3}
        yAxisId="right"
        name="Satisfacción"
        dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="revenue" 
        stroke="#8b5cf6" 
        strokeWidth={3}
        yAxisId="right"
        name="Ingresos"
        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
      />
    </ComposedChart>
  ), [commonProps, gradients]);

  // Renderizar gráfico de área
  const renderAreaChart = useCallback(() => (
    <ComposedChart {...commonProps}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
      <XAxis 
        dataKey="time" 
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <YAxis 
        yAxisId="left"
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <YAxis 
        yAxisId="right" 
        orientation="right"
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <defs>
        {gradients.areaMessages}
        {gradients.areaSatisfaction}
        {gradients.areaAppointments}
        {gradients.areaRevenue}
      </defs>
      <Area 
        type="monotone" 
        dataKey="messages" 
        fill="url(#areaMessagesGradient)" 
        stroke="#3b82f6" 
        strokeWidth={2}
        yAxisId="left"
        name="Mensajes"
      />
      <Area 
        type="monotone" 
        dataKey="appointments" 
        fill="url(#areaAppointmentsGradient)" 
        stroke="#10b981" 
        strokeWidth={2}
        yAxisId="left"
        name="Citas"
      />
      <Line 
        type="monotone" 
        dataKey="satisfaction" 
        stroke="#60a5fa" 
        strokeWidth={3}
        yAxisId="right"
        name="Satisfacción"
        dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="revenue" 
        stroke="#8b5cf6" 
        strokeWidth={3}
        yAxisId="right"
        name="Ingresos"
        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
      />
    </ComposedChart>
  ), [commonProps, gradients]);

  // Renderizar gráfico de líneas
  const renderLineChart = useCallback(() => (
    <ComposedChart {...commonProps}>
      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
      <XAxis 
        dataKey="time" 
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <YAxis 
        yAxisId="left"
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <YAxis 
        yAxisId="right" 
        orientation="right"
        stroke="var(--text-muted)"
        fontSize={12}
      />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="messages" 
        stroke="#3b82f6" 
        strokeWidth={3}
        yAxisId="left"
        name="Mensajes"
        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="appointments" 
        stroke="#10b981" 
        strokeWidth={3}
        yAxisId="left"
        name="Citas"
        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="satisfaction" 
        stroke="#60a5fa" 
        strokeWidth={3}
        yAxisId="right"
        name="Satisfacción"
        dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="revenue" 
        stroke="#8b5cf6" 
        strokeWidth={3}
        yAxisId="right"
        name="Ingresos"
        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
      />
    </ComposedChart>
  ), [commonProps]);

  // Memoizar el gráfico a renderizar
  const chartComponent = useMemo(() => {
    switch (chartType) {
      case 'bar':
        return renderBarChart();
      case 'area':
        return renderAreaChart();
      case 'line':
      default:
        return renderLineChart();
    }
  }, [chartType, renderBarChart, renderAreaChart, renderLineChart]);

  return (
    <AnimatedChart 
      className={`card p-4 sm:p-6 ${className}`}
      height="400px"
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {chartInfo.title}
        </h3>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {chartInfo.description}
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        {chartComponent}
      </ResponsiveContainer>
    </AnimatedChart>
  );
});

MainChart.displayName = 'MainChart';

export default MainChart;