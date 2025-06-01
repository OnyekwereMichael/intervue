'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useAnimation } from 'framer-motion';

const CursorBlob = () => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  
  // Mouse position with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { 
    damping: 15,
    stiffness: 75,
    mass: 1,
    restDelta: 0.001
  };

  const blobX = useSpring(mouseX, springConfig);
  const blobY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mouseX, mouseY, isMobile]);

  const handleDragStart = () => {
    controls.start({
      scale: 1.2,
      transition: { duration: 0.2 }
    });
  };

  const handleDragEnd = () => {
    controls.start({
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    });
  };

  if (isMobile) {
    return (
      <motion.div
        className="fixed z-[9999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          right: '20px',
          top: '50%',
          touchAction: 'none'
        }}
      >
        <motion.div
          drag
          dragElastic={0.3}
          dragConstraints={{ left: -200, right: 200, top: -300, bottom: 300 }}
          whileDrag={{ scale: 1.2 }}
          animate={controls}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            touchAction: 'none'
          }}
        >
          {/* Main blob */}
          <motion.div
            className="absolute h-14 w-14 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.15) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)',
              transform: 'translate(-50%, -50%)',
              backdropFilter: 'blur(8px)',
            }}
          />
          {/* Inner blob */}
          <motion.div
            className="absolute h-8 w-8 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.25) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              transform: 'translate(-50%, -50%)',
              backdropFilter: 'blur(4px)',
            }}
          />
          {/* Center dot */}
          <motion.div
            className="absolute h-5 w-5 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 1) 0%, rgba(168, 85, 247, 0.8) 100%)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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