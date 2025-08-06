import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';

const DemoModeIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-4 right-4 z-[9999] pointer-events-none"
    >
      <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-full shadow-xl backdrop-blur-md border border-white/30">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold tracking-wide">DEMO MODE</span>
        <Icon name="Zap" size={18} className="text-yellow-300" />
      </div>
    </motion.div>
  );
};

export default DemoModeIndicator; 