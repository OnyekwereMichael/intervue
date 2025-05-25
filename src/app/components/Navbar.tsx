'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { motion } from "framer-motion";
import Logo_ from '../../../public/logo.svg';

const Navbar = () => {
  return (
 <nav>
     <Link href='/' className='flex items-center gap-2'>
     <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={Logo_} alt="Logo" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-400 tracking-tight"
        >
          Ask<span className="text-purple-600">bot</span>
        </motion.h1>
      </div>
     </Link>
 </nav>
  )
}

export default Navbar
