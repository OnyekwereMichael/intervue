import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/Auth.action'
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/Root.action'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import stars from '../../../../../../public/star.svg'
import calendar from '../../../../../../public/calendar.svg'

const page = async ({params}:RouteParams) => {
  const {id} = await params
  const user = await getCurrentUser()
  const interview = await getInterviewById(id)

  if (!user?.id) {
    redirect('/');
  }
  
  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id
  })

  console.log(feedback);
  

  if(!interview) redirect('/')
  return (
    <div>
         <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold max-sm:text-2xl">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5 max-sm:flex-wrap">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src={stars} width={22} height={22} alt="star" />
            <p>
              Overall Impression:{" "}
              <span className="text-primary-200 font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src={calendar} width={22} height={22} alt="calendar" />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr />

      <p>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4">
        <h2 className='max-sm:text-2xl'>Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p>{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h3>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons max-sm:w-full">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1 max-sm:w-full">
          <Link
            href={`/Interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="textsm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
    </div>
  )
}

export default page
