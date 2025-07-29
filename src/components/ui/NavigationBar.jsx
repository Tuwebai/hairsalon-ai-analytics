import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Icon from '../AppIcon';
import NavigationItem from './NavigationItem';
import MobileNavigationToggle from './MobileNavigationToggle';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const NavigationBar = ({ currentUser, onLogout, className = '' }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      path: '/main-analytics-overview-dashboard',
      label: 'Resumen',
      icon: 'BarChart3',
      tooltip: 'Panel de análisis general'
    },
    {
      path: '/appointment-management-dashboard',
      label: 'Citas',
      icon: 'Calendar',
      tooltip: 'Gestión de citas y calendario'
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`navbar fixed top-0 left-0 right-0 z-navigation nav-shadow ${className}`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <Link to="/main-analytics-overview-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
              <Icon name="Scissors" size={24} color="white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gradient leading-tight">
                HairSalon AI
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Analytics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <NavigationItem
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                tooltip={item.tooltip}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>

          {/* User Section and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user?.username || currentUser?.name || 'Usuario'}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-all duration-200"
                title="Cerrar sesión"
              >
                <Icon name="LogOut" size={16} />
                <span className="hidden lg:inline">Salir</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <MobileNavigationToggle
              isOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-navigation navbar border-t">
        <div className="flex items-center justify-around h-16 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-accent bg-accent/20' :'text-muted-foreground hover:text-foreground hover:bg-accent/10'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Content Spacer */}
      <div className="h-16 md:h-16"></div>
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default NavigationBar;