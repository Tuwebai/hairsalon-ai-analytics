import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedCard = ({ children, className = "", delay = 0, particleEffect = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate particles on hover
  useEffect(() => {
    if (isHovered && particleEffect) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered, particleEffect]);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const particleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      x: 0,
      y: 0
    },
    visible: (custom) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, (Math.random() - 0.5) * 100],
      y: [0, (Math.random() - 0.5) * 100],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Particle effects */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
            custom={particle}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        ))}
      </AnimatePresence>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />

      {children}
    </motion.div>
  );
};

export default AnimatedCard; 