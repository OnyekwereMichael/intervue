'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const NoInterviewFallback = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center text-center px-4 py-10 card-cta rounded-xl shadow-sm"
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
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>

    <h3 className="text-xl font-semibold text-white mb-2 ">
      No Interviews Yet
    </h3>

    <p className="text-white max-w-md ">
      You haven’t taken any interviews yet. 
    </p>
  </motion.div>
)

export default NoInterviewFallback
