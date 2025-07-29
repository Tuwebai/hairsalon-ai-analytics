import React, { useState, useEffect } from 'react';
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
            <linearGradient id="barMessagesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.7}/>
            </linearGradient>
            <linearGradient id="barSatisfactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7}/>
            </linearGradient>
            <linearGradient id="barAppointmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.7}/>
            </linearGradient>
            <linearGradient id="barRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
              <stop offset="95%" stopColor="#d97706" stopOpacity={0.7}/>
            </linearGradient>
          </defs>
          <Bar 
            yAxisId="left"
            dataKey="messages" 
            fill="url(#barMessagesGradient)" 
            name="Mensajes"
            radius={[12, 12, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="satisfaction" 
            fill="url(#barSatisfactionGradient)" 
            name="Satisfacción"
            radius={[12, 12, 0, 0]}
          />
          <Bar 
            yAxisId="left"
            dataKey="appointments" 
            fill="url(#barAppointmentsGradient)" 
            name="Citas"
            radius={[12, 12, 0, 0]}
          />
          <Bar 
            yAxisId="right"
            dataKey="revenue" 
            fill="url(#barRevenueGradient)" 
            name="Ingresos (€)"
            radius={[12, 12, 0, 0]}
          />
        </ComposedChart>
      );
    }

    if (chartType === 'area') {
      return (
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
            <linearGradient id="areaMessagesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="areaSatisfactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="areaAppointmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="areaRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#d97706" stopOpacity={0.2}/>
            </linearGradient>
          </defs>

        </ComposedChart>
      );
    }

    // Default line chart
    return (
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
            {/* Modern Line Gradients with Fade Effect */}
            <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
              <stop offset="30%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="60%" stopColor="#a855f7" stopOpacity={0.6}/>
              <stop offset="85%" stopColor="#c084fc" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#e879f9" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
              <stop offset="30%" stopColor="#22d3ee" stopOpacity={0.8}/>
              <stop offset="60%" stopColor="#67e8f9" stopOpacity={0.6}/>
              <stop offset="85%" stopColor="#a5f3fc" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#cffafe" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="appointmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
              <stop offset="30%" stopColor="#34d399" stopOpacity={0.8}/>
              <stop offset="60%" stopColor="#6ee7b7" stopOpacity={0.6}/>
              <stop offset="85%" stopColor="#a7f3d0" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#d1fae5" stopOpacity={0.2}/>
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
              <stop offset="30%" stopColor="#fb923c" stopOpacity={0.8}/>
              <stop offset="60%" stopColor="#fdba74" stopOpacity={0.6}/>
              <stop offset="85%" stopColor="#fed7aa" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#ffedd5" stopOpacity={0.2}/>
            </linearGradient>
            
            {/* Modern Area Gradients with Enhanced Fade */}
            <linearGradient id="areaMessagesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity={0.5}/>
              <stop offset="50%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="75%" stopColor="#c084fc" stopOpacity={0.15}/>
              <stop offset="100%" stopColor="#e879f9" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="areaSatisfactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8}/>
              <stop offset="25%" stopColor="#22d3ee" stopOpacity={0.5}/>
              <stop offset="50%" stopColor="#67e8f9" stopOpacity={0.3}/>
              <stop offset="75%" stopColor="#a5f3fc" stopOpacity={0.15}/>
              <stop offset="100%" stopColor="#cffafe" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="areaAppointmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="25%" stopColor="#34d399" stopOpacity={0.5}/>
              <stop offset="50%" stopColor="#6ee7b7" stopOpacity={0.3}/>
              <stop offset="75%" stopColor="#a7f3d0" stopOpacity={0.15}/>
              <stop offset="100%" stopColor="#d1fae5" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="areaRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.8}/>
              <stop offset="25%" stopColor="#fb923c" stopOpacity={0.5}/>
              <stop offset="50%" stopColor="#fdba74" stopOpacity={0.3}/>
              <stop offset="75%" stopColor="#fed7aa" stopOpacity={0.15}/>
              <stop offset="100%" stopColor="#ffedd5" stopOpacity={0.05}/>
            </linearGradient>
            
            {/* Modern Bar Gradients */}
            <linearGradient id="barMessagesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity={0.9}/>
              <stop offset="50%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="75%" stopColor="#c084fc" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#e879f9" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="barSatisfactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
              <stop offset="25%" stopColor="#22d3ee" stopOpacity={0.9}/>
              <stop offset="50%" stopColor="#67e8f9" stopOpacity={0.8}/>
              <stop offset="75%" stopColor="#a5f3fc" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#cffafe" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="barAppointmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
              <stop offset="25%" stopColor="#34d399" stopOpacity={0.9}/>
              <stop offset="50%" stopColor="#6ee7b7" stopOpacity={0.8}/>
              <stop offset="75%" stopColor="#a7f3d0" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#d1fae5" stopOpacity={0.6}/>
            </linearGradient>
            <linearGradient id="barRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={1}/>
              <stop offset="25%" stopColor="#fb923c" stopOpacity={0.9}/>
              <stop offset="50%" stopColor="#fdba74" stopOpacity={0.8}/>
              <stop offset="75%" stopColor="#fed7aa" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#ffedd5" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
          {/* Background Areas for Line/Area Effect */}
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="messages" 
            stroke="none"
            fill="url(#areaMessagesGradient)"
            name="Mensajes"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="satisfaction" 
            stroke="none"
            fill="url(#areaSatisfactionGradient)"
            name="Satisfacción"
          />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="appointments" 
            stroke="none"
            fill="url(#areaAppointmentsGradient)"
            name="Citas"
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="revenue" 
            stroke="none"
            fill="url(#areaRevenueGradient)"
            name="Ingresos (€)"
          />
          
          {/* Lines on top of areas */}
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="messages" 
            stroke="url(#messagesGradient)" 
            strokeWidth={4}
            name="Mensajes"
            dot={false}
            activeDot={false}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="satisfaction" 
            stroke="url(#satisfactionGradient)" 
            strokeWidth={4}
            name="Satisfacción"
            dot={false}
            activeDot={false}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="appointments" 
            stroke="url(#appointmentsGradient)" 
            strokeWidth={4}
            name="Citas"
            dot={false}
            activeDot={false}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="revenue" 
            stroke="url(#revenueGradient)" 
            strokeWidth={4}
            name="Ingresos (€)"
            dot={false}
            activeDot={false}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
      </ComposedChart>
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <AnimatedChart 
      isLoading={isLoading}
      className={`card p-4 sm:p-6 ${className}`}
      delay={1}
      height="500px"
    >
      <div className="mb-4 sm:mb-6">
        <motion.h3 
          className="text-base sm:text-lg font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {getChartTitle()}
        </motion.h3>
        <motion.p 
          className="text-xs sm:text-sm"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {getChartDescription()}
        </motion.p>
      </div>
      
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </AnimatedChart>
  );
};

export default MainChart;