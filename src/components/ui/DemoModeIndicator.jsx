import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../AppIcon';

const DemoModeIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg backdrop-blur-sm border border-white/20">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">Demo Mode</span>
        <Icon name="Sparkles" size={16} />
      </div>
    </motion.div>
  );
};

export default DemoModeIndicator; 