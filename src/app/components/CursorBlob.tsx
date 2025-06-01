'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorBlob = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Mouse position with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
 // Spring configuration for the trailing effect
  const springConfig = { 
    damping: 15,      // Lower damping for more oscillation
    stiffness: 75,    // Lower stiffness for more drag
    mass: 1,          // Higher mass for more inertia
    restDelta: 0.001  
  };

    // Create spring-animated values that follow mouseX and mouseY
  // These create the smooth, physics-based movement
  const blobX = useSpring(mouseX, springConfig);
  const blobY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main trailing blob */}
      <motion.div
        className="absolute h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600/25 via-primary-200/25 to-purple-600/25"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
        }}
      />
      
      {/* Secondary blob with different timing */}
      <motion.div
        className="absolute h-10 w-10 rounded-full"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 80%)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
        }}
      />
    </motion.div>
  );
};

export default CursorBlob; 