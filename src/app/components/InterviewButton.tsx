'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface InterviewButtonProps {
  feedback: any
  id: string
}

export default function InterviewButton({ feedback, id }: InterviewButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
  }

  return (
    <Button
      className='btn-primary'
      onClick={handleClick}
      disabled={isLoading}
    >
      <Link
        href={feedback ? `/Interview/${id}/feedback` : `/Interview/${id}`}
        className='w-full'
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-1">
            <span className="w-[6px] h-[6px] bg-white rounded-full animate-bounce delay-150"></span>
            <span className="w-[6px] h-[6px] bg-white rounded-full animate-bounce delay-300"></span>
            <span className="w-[6px] h-[6px] bg-white rounded-full animate-bounce delay-450"></span>
          </span>
        ) : (
          feedback ? 'Check Feedback' : 'View Interview'
        )}
      </Link>
    </Button>
  )
}
