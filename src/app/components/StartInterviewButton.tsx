'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Loader from './Loader'

const StartInterviewButton = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setLoading(true)
    // Navigate to /Interview after setting loading
    router.push('/Interview')
  }

  return (
    <Button onClick={handleClick} disabled={loading} className='btn-primary max-sm:w-full'>
      {loading ? <Loader /> : 'Start an Interview'}
    </Button>
  )
}

export default StartInterviewButton
