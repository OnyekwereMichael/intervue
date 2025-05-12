'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import ai_avatar_logo from '../../../public/ai-avatar.png' 
import user_avatar from '../../../public/user-avatar.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AgentsProps {
  userName: string
  userId: string
  type: 'generate' | 'interview'
}

enum CallStatus {
 INACTIVE = 'INACTIVE',
 ACTIVE = 'ACTIVE',
 COMPLETED = 'COMPLETED',
 CONNECTING = 'CONNECTING',

}
const Agents = ({userName, userId, type}: AgentsProps) => {
  const isSpeaking = true
  const isListening = false
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)

  const Messages  = [
    'What is your name?',
    'My name is Vapi',
  ]

  const lastMessage = Messages[Messages.length - 1]

  return (
    <>    
    <div className='call-view'>
      <div className='card-interviewer'>
        <div className='avatar'>
          <Image src={ai_avatar_logo} alt='vapi' className='object-cover' width={65} height={54}/>
          {isSpeaking && <span className='animate-speak'></span>}
        </div>
        <h3>AI Interviewer</h3>
      </div>

      <div className='card-border'>
        <div className='card-content'>
          <Image src={user_avatar} alt='vapi' className='object-cover rounded-full size-[120px]' width={540} height={540}/>
          <h3>{userName}</h3>
        </div>
      </div>
    </div>

   <div className='transcript-border'>
       <div className='transcript'>
            <p className={cn('duration-500 transition-opacity  opacity-0 ', 'animate-fadeIn opacity-100')} key={lastMessage}>{lastMessage}</p>
       </div>
   </div>

    <div className='w-full flex justify-center'>
      {callStatus !== CallStatus.ACTIVE ? (
      <button className='relative btn-call'>
        <span className={cn('absolute animate-ping  rounded-full  opacity-75 ', callStatus !== CallStatus.CONNECTING && 'hidden')}/>

        <span>
        {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.COMPLETED ? 'Call' : '. . .'}
        </span>

        
      </button>
      ):(
       <button className='btn-disconnect'>
          End
       </button>
      )}
    </div>
    </>

  )
}
export default Agents
