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
import AnimatedSignInButton from './AnimatedSignInButton'

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const [loading, setLoading] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double clicks
    
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      router.push('/sign-in');
    }
  }

  return (
    <nav className='flex items-center justify-between py-4 shadow-md max-sm:px-0 max-sm:py-0'>
      {/* Logo + Heading */}
      <Link href='/' className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image src={Logo_} alt='Logo' className='w-[40px] h-[40px] max-sm:w-[35px] max-sm:h-[35px]' />
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

      {/* Only show these elements if authenticated */}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          {/* Logout Button - Hidden on mobile */}
          <button
            onClick={handleSignOut}
            disabled={loading}
            className='max-sm:hidden bg-purple-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:shadow-lg transition-transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? <Loader /> : 'Logout'}
          </button>

          {/* Mobile Menu - Only visible on mobile */}
          <div className="relative sm:hidden">
            <button
              onClick={() => !loading && setMenuOpen(!menuOpen)}
              className='p-2 text-purple-600'
              disabled={loading}
            >
              <FiMenu size={24} />
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className='absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-50'>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className='flex items-center gap-2 w-full px-4 py-2 text-sm text-purple-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {loading ? <Loader /> : <><FiLogOut size={18} /> Logout</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show Sign In button if not authenticated */}
      {!isAuthenticated && (
        <AnimatedSignInButton 
          className="bg-purple-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:shadow-lg transition-transform hover:scale-105"
          text="Sign In"
        />
      )}
    </nav>
  )
}

export default Navbar
