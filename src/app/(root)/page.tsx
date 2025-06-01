import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Robot_HeroSec from '../../../public/robot.png'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import { Inter } from 'next/font/google'
import InterviewCard from '../components/InterviewCard'
import { getLatestInterviews, getUserInterviewById } from '@/lib/actions/Root.action'
import { getCurrentUser, isAuthenticated } from '@/lib/actions/Auth.action'
import StartInterviewButton from '../components/StartInterviewButton'
import { motion } from 'framer-motion'
import { MdEventBusy } from 'react-icons/md'
import NoInterviewFallback from '../components/NoInterviewFallback'
import ProtectedAction from '../components/ProtectedAction'
import LoginMessage from '../components/LoginMessage'
import AnimatedCard from '../components/AnimatedCard'

const page = async () => {
  const { isAuthenticated: auth, user } = await isAuthenticated();
  
  // Get public interviews - if authenticated, exclude user's own interviews
  const latestInterviews = await getLatestInterviews({ 
    userId: auth && user?.id ? user.id : 'guest',
  });
  
  // Only get user interviews if authenticated
  const userInterviews = auth && user?.id ? await getUserInterviewById(user.id) : [];

  const hasPastInterviews = userInterviews && userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews && latestInterviews.length > 0;

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2 className='max-sm:leading-10 max-sm:text-2xl'>Get Intervue-Ready with AI-Powered Practice & Feedback</h2>
          <p className='text-gray-500 max-sm:leading-6'>Practice on real interview questions & get instant feedback</p>
          <ProtectedAction isAuthenticated={auth}>
            <StartInterviewButton />
          </ProtectedAction>
        </div>

        <Image
          src={Robot_HeroSec}
          alt="robot"
          className='hidden lg:block'
          width={400}
          height={400}
        />
      </section>

      {/* Your Interviews section - shown to all but with different content */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='max-sm:text-2xl'>Your Interviews</h2>
        <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
          {auth ? (
            hasPastInterviews ? (
              userInterviews.map((interview, index) => (
                <AnimatedCard key={interview.id} index={index}>
                  <ProtectedAction isAuthenticated={auth}>
                    <InterviewCard {...interview} />
                  </ProtectedAction>
                </AnimatedCard>
              ))
            ) : (
              <NoInterviewFallback />
            )
          ) : (
            <LoginMessage />
          )}
        </div>
      </section>

      {/* Show Take an Interview section to everyone */}
      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='max-sm:text-2xl'>Available Interviews</h2>
        <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
          {hasUpcomingInterviews ? (
            latestInterviews.map((interview, index) => (
              <AnimatedCard key={interview.id} index={index}>
                <ProtectedAction isAuthenticated={auth}>
                  <InterviewCard {...interview} />
                </ProtectedAction>
              </AnimatedCard>
            ))
          ) : (
            <NoInterviewFallback />
          )}
        </div>
      </section>
    </>
  )
}

export default page
