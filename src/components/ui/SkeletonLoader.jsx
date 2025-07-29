import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ type = 'card', lines = 3, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <motion.div
            className={`bg-card rounded-xl p-4 ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="h-6 bg-muted rounded-lg mb-3"
              variants={itemVariants}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-muted to-muted/50 rounded-lg"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>
            <motion.div
              className="h-4 bg-muted rounded mb-2"
              variants={itemVariants}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-muted to-muted/50 rounded"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>
            <motion.div
              className="h-4 bg-muted rounded w-3/4"
              variants={itemVariants}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-muted to-muted/50 rounded"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>
          </motion.div>
        );

      case 'text':
        return (
          <motion.div
            className={`space-y-2 ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Array.from({ length: lines }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-4 bg-muted rounded ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
                variants={itemVariants}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-muted to-muted/50 rounded"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            ))}
          </motion.div>
        );

      case 'chart':
        return (
          <motion.div
            className={`bg-card rounded-xl p-4 ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="h-6 bg-muted rounded-lg mb-4"
              variants={itemVariants}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-muted to-muted/50 rounded-lg"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2"
                  variants={itemVariants}
                >
                  <motion.div
                    className="h-3 bg-muted rounded flex-1"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-muted to-muted/50 rounded"
                      style={{ width: `${Math.random() * 60 + 20}%` }}
                    />
                  </motion.div>
                  <motion.div
                    className="h-3 w-8 bg-muted rounded"
                    variants={pulseVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-muted to-muted/50 rounded"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return renderSkeleton();
};

export default SkeletonLoader; 