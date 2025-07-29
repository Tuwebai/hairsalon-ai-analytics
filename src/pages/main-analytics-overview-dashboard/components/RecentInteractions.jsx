import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentInteractions = ({ interactions, className = '' }) => {
  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success bg-success/10';
      case 'negative': return 'text-error bg-error/10';
      case 'neutral': return 'text-muted-foreground bg-muted/30';
      default: return 'text-muted-foreground bg-muted/30';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'ThumbsUp';
      case 'negative': return 'ThumbsDown';
      case 'neutral': return 'Minus';
      default: return 'MessageSquare';
    }
  };

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'booked': return 'text-success bg-success/10';
      case 'interested': return 'text-primary bg-primary/10';
      case 'not_interested': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/30';
    }
  };

  const getOutcomeLabel = (outcome) => {
    switch (outcome) {
      case 'booked': return 'Reservado';
      case 'interested': return 'Interesado';
      case 'not_interested': return 'No Interesado';
      default: return 'Pendiente';
    }
  };

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
        {interactions.map((interaction) => (
          <div key={interaction.id} className="p-4 rounded-lg border" style={{ 
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
              <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(interaction.sentiment)}`}>
                <Icon name={getSentimentIcon(interaction.sentiment)} size={12} />
                <span className="capitalize">{interaction.sentiment}</span>
              </div>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(interaction.outcome)}`}>
                {getOutcomeLabel(interaction.outcome)}
              </div>
            </div>
          </div>
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
            {interactions.map((interaction) => (
              <tr key={interaction.id} className="hover:bg-accent/50 transition-colors">
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
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(interaction.sentiment)}`}>
                    <Icon name={getSentimentIcon(interaction.sentiment)} size={12} />
                    <span className="capitalize">{interaction.sentiment}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(interaction.outcome)}`}>
                    {getOutcomeLabel(interaction.outcome)}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {interaction.time}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInteractions;