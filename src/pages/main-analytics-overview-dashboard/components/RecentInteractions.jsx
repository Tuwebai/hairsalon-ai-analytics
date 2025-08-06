import React, { memo, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

// Componente de fila memoizado para la vista móvil
const MobileInteractionRow = memo(({ interaction }) => {
  const sentimentStyles = useMemo(() => {
    const colorMap = {
      positive: 'text-success bg-success/10',
      negative: 'text-error bg-error/10',
      neutral: 'text-muted-foreground bg-muted/30'
    };
    return colorMap[interaction.sentiment] || 'text-muted-foreground bg-muted/30';
  }, [interaction.sentiment]);

  const sentimentIcon = useMemo(() => {
    const iconMap = {
      positive: 'ThumbsUp',
      negative: 'ThumbsDown',
      neutral: 'Minus'
    };
    return iconMap[interaction.sentiment] || 'MessageSquare';
  }, [interaction.sentiment]);

  const outcomeStyles = useMemo(() => {
    const colorMap = {
      booked: 'text-success bg-success/10',
      interested: 'text-primary bg-primary/10',
      not_interested: 'text-error bg-error/10'
    };
    return colorMap[interaction.outcome] || 'text-muted-foreground bg-muted/30';
  }, [interaction.outcome]);

  const outcomeLabel = useMemo(() => {
    const labelMap = {
      booked: 'Reservado',
      interested: 'Interesado',
      not_interested: 'No Interesado'
    };
    return labelMap[interaction.outcome] || 'Pendiente';
  }, [interaction.outcome]);

  return (
    <div className="p-4 rounded-lg border" style={{ 
      background: 'var(--bg-secondary)',
      borderColor: 'var(--border-primary)'
    }}>
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--info-light)' }}>
          <Icon name="User" size={14} style={{ color: 'var(--info-dark)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {interaction.clientName}
          </p>
          <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
            {interaction.phone}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {interaction.time}
          </p>
        </div>
      </div>
      
      <p className="text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
        {interaction.message}
      </p>
      
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${sentimentStyles}`}>
          <Icon name={sentimentIcon} size={12} />
          <span className="capitalize">{interaction.sentiment}</span>
        </div>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${outcomeStyles}`}>
          {outcomeLabel}
        </div>
      </div>
    </div>
  );
});

MobileInteractionRow.displayName = 'MobileInteractionRow';

// Componente de fila memoizado para la vista desktop
const DesktopInteractionRow = memo(({ interaction }) => {
  const sentimentStyles = useMemo(() => {
    const colorMap = {
      positive: 'text-success bg-success/10',
      negative: 'text-error bg-error/10',
      neutral: 'text-muted-foreground bg-muted/30'
    };
    return colorMap[interaction.sentiment] || 'text-muted-foreground bg-muted/30';
  }, [interaction.sentiment]);

  const sentimentIcon = useMemo(() => {
    const iconMap = {
      positive: 'ThumbsUp',
      negative: 'ThumbsDown',
      neutral: 'Minus'
    };
    return iconMap[interaction.sentiment] || 'MessageSquare';
  }, [interaction.sentiment]);

  const outcomeStyles = useMemo(() => {
    const colorMap = {
      booked: 'text-success bg-success/10',
      interested: 'text-primary bg-primary/10',
      not_interested: 'text-error bg-error/10'
    };
    return colorMap[interaction.outcome] || 'text-muted-foreground bg-muted/30';
  }, [interaction.outcome]);

  const outcomeLabel = useMemo(() => {
    const labelMap = {
      booked: 'Reservado',
      interested: 'Interesado',
      not_interested: 'No Interesado'
    };
    return labelMap[interaction.outcome] || 'Pendiente';
  }, [interaction.outcome]);

  return (
    <tr className="hover:bg-accent/50 transition-colors">
      <td className="py-3 px-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--info-light)' }}>
            <Icon name="User" size={14} style={{ color: 'var(--info-dark)' }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              {interaction.clientName}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
              {interaction.phone}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 px-2">
        <p className="text-sm line-clamp-2 max-w-xs" style={{ color: 'var(--text-primary)' }}>
          {interaction.message}
        </p>
      </td>
      <td className="py-3 px-2">
        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${sentimentStyles}`}>
          <Icon name={sentimentIcon} size={12} />
          <span className="capitalize">{interaction.sentiment}</span>
        </div>
      </td>
      <td className="py-3 px-2">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${outcomeStyles}`}>
          {outcomeLabel}
        </div>
      </td>
      <td className="py-3 px-2">
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {interaction.time}
        </span>
      </td>
    </tr>
  );
});

DesktopInteractionRow.displayName = 'DesktopInteractionRow';

const RecentInteractions = memo(({ interactions, className = '' }) => {
  // Memoizar las interacciones limitadas para mostrar solo las primeras 10
  const limitedInteractions = useMemo(() => 
    interactions.slice(0, 10), 
    [interactions]
  );

  return (
    <div className={`card p-4 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Interacciones Recientes
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            Últimas conversaciones con clientes
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {limitedInteractions.map((interaction) => (
          <MobileInteractionRow key={interaction.id} interaction={interaction} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Cliente
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Mensaje
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Sentimiento
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Resultado
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Hora
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'var(--border-primary)' }}>
            {limitedInteractions.map((interaction) => (
              <DesktopInteractionRow key={interaction.id} interaction={interaction} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

RecentInteractions.displayName = 'RecentInteractions';

export default RecentInteractions;