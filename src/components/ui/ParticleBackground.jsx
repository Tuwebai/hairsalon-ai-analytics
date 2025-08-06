import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({ particleCount = 20, className = '' }) => {
  const containerRef = useRef(null);

  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10
  }));

  const particleVariants = {
    animate: (custom) => ({
      x: [custom.x, custom.x + (Math.random() - 0.5) * 30],
      y: [custom.y, custom.y + (Math.random() - 0.5) * 30],
      opacity: [0.1, 0.4, 0.1],
      scale: [0.6, 1.1, 0.6],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))',
            filter: 'blur(0.5px)'
          }}
          custom={particle}
          variants={particleVariants}
          animate="animate"
        />
      ))}
    </div>
  );
};

export default ParticleBackground; 