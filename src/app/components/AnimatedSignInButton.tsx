'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const bounceAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatDelay: 0.2,
      ease: [0.25, 0.5, 0.35, 1], 
    }
  },
  whileHover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
};

interface AnimatedSignInButtonProps {
  className?: string;
  text?: string;
}

const AnimatedSignInButton = ({ 
  className = "bg-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-colors",
  text = "Sign In Now"
}: AnimatedSignInButtonProps) => {
  return (
    <motion.div
      variants={bounceAnimation}
      initial="initial"
      animate="animate"
      whileHover="whileHover"
      className="inline-block" // Ensure proper bouncing containment
    >
      <Link 
        href="/sign-in" 
        className={className}
      >
        {text}
      </Link>
    </motion.div>
  );
};

export default AnimatedSignInButton; 