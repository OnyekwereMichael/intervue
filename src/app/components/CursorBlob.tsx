'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CursorBlob = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [touchPoints, setTouchPoints] = useState<{ id: number; x: number; y: number; }[]>([]);
  
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
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Mouse events for desktop
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const newTouchPoints = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      }));
      setTouchPoints(newTouchPoints);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const newTouchPoints = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      }));
      setTouchPoints(newTouchPoints);
    };

    const handleTouchEnd = () => {
      setTouchPoints([]);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
    } else {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) {
    return (
      <AnimatePresence>
        {touchPoints.map((point) => (
          <motion.div
            key={point.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ 
              scale: [1, 2],
              opacity: [0.5, 0],
            }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              left: point.x,
              top: point.y,
              pointerEvents: 'none',
              zIndex: 9999,
              width: 100,
              height: 100,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.1)',
            }}
          />
        ))}
      </AnimatePresence>
    );
  }

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