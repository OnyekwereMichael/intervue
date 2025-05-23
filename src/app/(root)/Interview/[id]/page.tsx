import Agents from '@/app/components/Agents'
import DisplayTechIcon from '@/app/components/DisplayTechIcon'
import { getCurrentUser } from '@/lib/actions/Auth.action'
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/Root.action'
import { getRandomInterviewCover } from '@/lib/utils'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const  InterviewDetails = async ({params}: RouteParams) => {
    const {id} = await params
    const Interview = await getInterviewById(id)
    const user = await getCurrentUser()
    if(!Interview) redirect('/')

    const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className='flex flex-row gap-4 justify-between'>
        <div className='flex flex-row items-center gap-4 max-sm:flex-col'>
            <div className='flex flex-row gap-4 items-center'>
                 <Image src={getRandomInterviewCover()} alt='random_Img' width={40} height={40} className='rounded-full size-[40px] object-cover'/> 
                 <h3 className='capittalize '>{Interview.role} Interview</h3>
            </div>
             <DisplayTechIcon techStack={Interview.techstack}/>
        </div>
        <p className='bg-dark-200 px-4 py-2  rounded-lg h-fit capitalize'>{Interview.type}</p>
      </div>

     <Agents userName={user?.username || ''}  userId={user?.id} interviewId={id} type='interview' questions={Interview.questions} feedbackId={feedback?.id}/>
    </>
  )
}

export default  InterviewDetails
