import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import AnimatedCard from '../../../components/ui/AnimatedCard';

const KPICard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon, 
  color = 'blue',
  suffix = '',
  isLive = false,
  delay = 0
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'var(--success-dark)';
    if (trend === 'down') return 'var(--error-dark)';
    return 'var(--text-muted)';
  };

  const getIconBackground = () => {
    const colorMap = {
      blue: 'var(--info-light)',
      green: 'var(--success-light)',
      yellow: 'var(--warning-light)',
      purple: 'var(--info-light)'
    };
    return colorMap[color] || 'var(--info-light)';
  };

  const getIconColor = () => {
    const colorMap = {
      blue: 'var(--info-dark)',
      green: 'var(--success-dark)',
      yellow: 'var(--warning-dark)',
      purple: 'var(--info-dark)'
    };
    return colorMap[color] || 'var(--info-dark)';
  };

  return (
    <AnimatedCard 
      className="card p-4 sm:p-6 card-hover relative overflow-hidden group"
      delay={delay}
      particleEffect={true}
    >
      {/* Premium gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: `linear-gradient(135deg, ${getIconColor()}15 0%, transparent 50%, ${getIconColor()}05 100%)`,
          pointerEvents: 'none'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 20% 80%, ${getIconColor()}10 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, ${getIconColor()}05 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${getIconBackground()} 0%, ${getIconColor()}20 100%)`,
              border: `2px solid ${getIconColor()}20`,
              boxShadow: `0 10px 25px -5px ${getIconColor()}20`
            }}
          >
            <Icon name={icon} size={20} className="sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" style={{ color: getIconColor() }} />
          </div>
          {isLive && (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
              <span className="text-xs font-medium" style={{ color: 'var(--success-dark)' }}>En vivo</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xs sm:text-sm font-medium transition-colors duration-300 group-hover:text-opacity-80" style={{ color: 'var(--text-muted)' }}>{title}</h3>
          <div className="flex items-end justify-between">
            <span className="text-lg sm:text-2xl font-bold transition-all duration-300 group-hover:scale-105" style={{ color: 'var(--text-primary)' }}>
              {value}{suffix}
            </span>
            {trendValue && (
              <div className="flex items-center space-x-1 transition-all duration-300 group-hover:scale-105" style={{ color: getTrendColor() }}>
                <Icon name={getTrendIcon()} size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">{trendValue}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default KPICard;