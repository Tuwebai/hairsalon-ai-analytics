import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Icon from '../AppIcon';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation state immediately for faster response
    setTimeout(() => {
      setIsAnimating(false);
    }, 80);
  };

  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const iconVariants = {
    initial: { 
      opacity: 0, 
      rotate: isDark ? 30 : -30, 
      scale: 0.85 
    },
    animate: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: {
        duration: 0.12,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      rotate: isDark ? -30 : 30, 
      scale: 0.85,
      transition: {
        duration: 0.08,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseDown={createRipple}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileHover={{ 
        scale: 1.08,
        rotate: 5,
        transition: { duration: 0.15 }
      }}
      whileTap={{ 
        scale: 0.92,
        transition: { duration: 0.1 }
      }}
      transition={{ duration: 0.15 }}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {!isDark ? (
            <motion.div
              key="sun"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Icon name="Sun" size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Icon name="Moon" size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default ThemeToggle; 