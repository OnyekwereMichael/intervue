import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Robot_HeroSec from '../../../public/robot.png'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import { Inter } from 'next/font/google'
import InterviewCard from '../components/InterviewCard'
import { getLatestInterviews, getUserInterviewById } from '@/lib/actions/Root.action'
import { getCurrentUser } from '@/lib/actions/Auth.action'

const page = async () => {
  const user = await getCurrentUser()
  if (!user) {
  console.error('User is not authenticated');
  return;
}

  console.log('the user', user.id);
  
  const [userInterviews, latestInterviews] = await Promise.all([
     await getUserInterviewById(user?.id),
     await getLatestInterviews({userId: user?.id})
  ])
  // const userInterviews = await getUserInterviewById(user?.id)
  const hasPastInterviews = userInterviews && userInterviews.length > 0
  const hasUpcomingInterviews= latestInterviews && latestInterviews.length > 0
  return (
   <>
     <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2 className='max-sm:leading-10'>Get Intervue-Ready with AI-Powered Pratice & Feedback</h2>
        <p className='text-gray-500'>Practice on real interview question & get instant feedbacks</p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href={'/Interview'}>Start an Interview</Link>
        </Button>
      </div>

      <Image
        src={Robot_HeroSec}
        alt="robot"
        className='hidden lg:block'
        width={400}
        height={400}
      />
     </section>

     <section className='flex flex-col gap-6 mt-8'>
           <h2>Your Interviews</h2>

           <div className='interviews-section'>
            {/* <p>You haven't taken any inerviews yet</p> */}

            {hasPastInterviews ? (
              userInterviews.map((interview) => (
                <InterviewCard {...interview} key={interview.id}/>
              ))
            ) : (
               <div>
                 <p>You haven't taken any inerviews yet</p>
               </div>
            )}
           </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
         {hasUpcomingInterviews ? (
              latestInterviews.map((interview) => (
                <InterviewCard {...interview} key={interview.id}/>
              ))
            ) : (
               <div>
                 <p>There are no new interviews available 😪</p>
               </div>
            )}
           {/* <p>There are no Interviews available</p> */}
        </div>
      </section>
   </>
  )
}

export default page
