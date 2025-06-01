'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  index: number;
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      scale: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }),
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const AnimatedCard = ({ children, index }: AnimatedCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "0px 0px -100px 0px" // Triggers animation slightly before the card comes into view
  });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 