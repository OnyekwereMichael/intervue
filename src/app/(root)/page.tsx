import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Robot_HeroSec from '../../../public/robot.png'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import { Inter } from 'next/font/google'
import InterviewCard from '../components/InterviewCard'

const page = () => {
  return (
   <>
     <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2 className='max-sm:leading-10'>Get Intervue-Ready with AI-Powered Pratice & Feedback</h2>
        <p className='text-gray-500'>Practice on real interview question & get instant feedbacks</p>
        <Button asChild className='btn-primary max-sm:w-full'>
          <Link href={'/interview'}>Start an Interview</Link>
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

            {dummyInterviews.map((interview) => (
             <InterviewCard  {...interview} key={interview.id}/>
            ))}
           </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2 >Take an Interview</h2>
        <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
             <InterviewCard  {...interview} key={interview.id}/>
            ))}
           {/* <p>There are no Interviews available</p> */}
        </div>
      </section>
   </>
  )
}

export default page
