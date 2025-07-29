import React from 'react';
import Icon from '../../../components/AppIcon';

const AppointmentStatistics = () => {
  const statisticsData = [
    {
      id: 1,
      title: "Citas de Hoy",
      value: 24,
      target: 30,
      change: "+12%",
      trend: "up",
      icon: "Calendar",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Tasa de Cancelación",
      value: "8.5%",
      target: "< 10%",
      change: "-2.1%",
      trend: "down",
      icon: "XCircle",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 3,
      title: "No Presentados",
      value: "3.2%",
      target: "< 5%",
      change: "+0.5%",
      trend: "up",
      icon: "UserX",
      color: "text-error",
      bgColor: "bg-error/10"
    },
    {
      id: 4,
      title: "Ingresos Proyectados",
      value: "€2,450",
      target: "€2,800",
      change: "+18%",
      trend: "up",
      icon: "Euro",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Estadísticas de Citas</h3>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Ver detalles
        </button>
      </div>

      <div className="space-y-3">
        {statisticsData.map((stat) => (
          <div key={stat.id} className="bg-card rounded-lg p-4 card-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon name={stat.icon} size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={stat.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                  />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Meta: {stat.target}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentStatistics;