import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';

const NotificationToast = ({ 
  message, 
  type = 'info', 
  isVisible, 
  onClose, 
  duration = 4000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Info';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success': return 'var(--success-dark)';
      case 'error': return 'var(--error-dark)';
      case 'warning': return 'var(--warning-dark)';
      case 'info': return 'var(--info-dark)';
      default: return 'var(--info-dark)';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'var(--success-light)';
      case 'error': return 'var(--error-light)';
      case 'warning': return 'var(--warning-light)';
      case 'info': return 'var(--info-light)';
      default: return 'var(--info-light)';
    }
  };

  const toastVariants = {
    hidden: { 
      opacity: 0, 
      x: 300,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: 300,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50 max-w-sm"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div 
            className="card p-4 shadow-xl border-l-4"
            style={{ 
              borderLeftColor: getColor(),
              background: getBgColor()
            }}
          >
            <div className="flex items-start space-x-3">
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getColor() }}
              >
                <Icon 
                  name={getIcon()} 
                  size={16} 
                  className="text-white" 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {message}
                </p>
              </div>
              
              <button
                onClick={onClose}
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
                style={{ color: getColor() }}
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast; 