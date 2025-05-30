'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Logo_ from '../../../public/logo.svg'
import { signOut } from '@/lib/actions/Auth.action'
import { useRouter } from 'next/navigation'
import Loader from './Loader'
import { FiLogOut, FiMenu } from 'react-icons/fi'


const Navbar = () => {
    const [loading, setLoading] = useState(false)
     const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const handleSignOut = async () => {
    setLoading(true)
  await signOut()
}
  return (
    <nav className='flex items-center justify-between  py-4 shadow-md max-sm:px-0 max-sm:py-0'>
      {/* Logo + Heading */}
      <Link href='/' className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image src={Logo_} alt='Logo' width={40} height={40} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-4xl md:text-4xl max-sm:text-3xl font-extrabold tracking-tight'
          >
            Nex<span className='text-purple-600'>view</span>
          </motion.h1>
        </div>
      </Link>

      {/* Logout Button */}
      <form>
        <button
        onClick={() =>handleSignOut()}
          type='submit'
          className='bg-purple-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:shadow-lg transition-transform hover:scale-105 cursor-pointer max-sm:hidden'
        >
        {loading ? <Loader /> : 'Logout'}  
        </button>
      </form>

      {/* Mobile Menu */}
      <div className='sm:hidden relative'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='p-2 text-purple-600'
        >
          <FiMenu size={24} />
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className='absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-50'>
            <button
              onClick={handleSignOut}
              className='flex items-center gap-2 w-full px-4 py-2 text-sm text-purple-600 hover:bg-gray-100'
            >
              {loading ? <Loader /> : <><FiLogOut size={18} /> Logout</>}
            </button>
          </div>
        )}
      </div>

    </nav>
  )
}

export default Navbar
