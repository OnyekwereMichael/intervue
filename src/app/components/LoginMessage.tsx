'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import AnimatedSignInButton from './AnimatedSignInButton';

const LoginMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center px-4  card-border dark-gradient pb-10 min-h-full border-1 border-primary-200/50 rounded-xl shadow-sm max-sm:w-full"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className=""
      >
        <DotLottieReact
          src="https://lottie.host/a13f2a6f-c5b1-4b0d-b346-d68d1a88fb99/0ahRU2qZKR.lottie"
          loop
          autoplay
          style={{ width: '200px', height: '200px' }}
        />
      </motion.div>

      <h3 className="text-lg font-semibold text-white mb-2 max-sm:text-[16px]">
        Sign In to Access Your Interviews
      </h3>

      <p className="text-white mb-6 max-sm:text-sm">
      Sign in to track interviews
      </p>

      <AnimatedSignInButton />
    </motion.div>
  );
};

export default LoginMessage; 