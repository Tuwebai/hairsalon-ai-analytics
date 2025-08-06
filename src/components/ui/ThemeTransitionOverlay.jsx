import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeTransitionOverlay = ({ isTransitioning, theme }) => {
  // Remove local state and use isTransitioning directly
  const showOverlay = isTransitioning;

  const overlayVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.1,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.1,
        ease: "easeIn"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      opacity: 0,
      rotate: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      rotate: 90,
      scale: 0.8,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showOverlay && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"

        >
          {/* Radial gradient overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${
                theme === 'dark' 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(59, 130, 246, 0.05)'
              } 0%, transparent 70%)`,
              backdropFilter: 'blur(2px)'
            }}
          />
          
          {/* Theme icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-blue-400' 
                  : 'bg-white text-blue-600'
              }`}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {theme === 'dark' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeTransitionOverlay; 