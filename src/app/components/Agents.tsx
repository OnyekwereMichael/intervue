'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ai_avatar_logo from '../../../public/ai-avatar.png' 
import user_avatar from '../../../public/user-avatar.jpg'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { vapi } from '@/lib/vapi.sdk'
import { interviewer } from '@/constants'
import { createFeedback } from '@/lib/actions/Root.action'
import CallingIndicator from './CallingIndicator'


 interface AgentProps {
    userName: string;
    userId?: string;
    interviewId?: string;
    feedbackId?: string;
    type: "generate" | "interview";
    questions?: string[];
  }

enum CallStatus {
 INACTIVE = 'INACTIVE',
 ACTIVE = 'ACTIVE',
 COMPLETED = 'COMPLETED',
 CONNECTING = 'CONNECTING',

}
interface SavedMessage {
 role: 'user' | 'assistant' | 'system'
 content: string
}
const Agents = ({userName, userId, type, interviewId, feedbackId, questions}: AgentProps) => {
  const router = useRouter()
  // const isSpeaking = true
  const isListening = false
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [Messages, setMessages] = useState<SavedMessage[]>([])
    const [lastMessage, setLastMessage] = useState<string>("");

  // const Messages  = [
  //   'What is your name?',
  //   'My name is Vapi',
  // ]


  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.COMPLETED);
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);
  

  useEffect(() => {
    // if (messages.length > 0) {
    //   setLastMessage(messages[messages.length - 1].content);
    // }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId
      });

      if (success && id) {
        router.push(`/Interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.COMPLETED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(Messages);
      }
    }
  }, [Messages, callStatus, type, userId]);

  const handleCall = async () => {
  setCallStatus(CallStatus.CONNECTING);

  const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

  if (!workflowId) {
    console.error("VAPI workflow ID is not defined in environment variables.");
    return;
  }

  console.log("Using workflowId:", workflowId);

  if(type === 'generate') {
      await vapi.start(workflowId!, {
    clientMessages: [],
    serverMessages: [],
    variableValues: {
      username: userName,
      userid: userId,
    },
  });
  }else{
     let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
        clientMessages: [],
        serverMessages: []
      });
    }
}



const handleDisconnect = async () => {
  setCallStatus(CallStatus.COMPLETED)
   vapi.stop()
}

  const latestMessage = Messages[Messages.length - 1]?.content
  const isCallInactiveorFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.COMPLETED
  // const lastMessage = Messages[Messages.length - 1]

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
<div className='flex items-center justify-center rounded-full size-[120px] bg-gray-300 text-white text-3xl font-semibold'>
  {(() => {
    if (!userName) return 'NA';

    const nameParts = userName.trim().split(' ').filter(Boolean);

    if (nameParts.length === 0) {
      return 'NA';
    }

    if (nameParts.length === 1) {
      return nameParts[0].slice(0, 2).toUpperCase();
    }

    return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
  })()}
</div>

  <h3 className='mt-2 text-lg font-medium text-center'>{userName}</h3>
</div>

      </div>
    </div>
   {Messages.length > 0 && (
       <div className='transcript-border'>
       <div className='transcript'>
            <p className={cn('duration-500 transition-opacity  opacity-0 ', 'animate-fadeIn opacity-100')} key={latestMessage}>{latestMessage}</p>
       </div>
   </div>
   )}
   

    <div className='w-full flex justify-center'>
      {callStatus !== CallStatus.ACTIVE ? (
      <button className='relative btn-call' onClick={() => handleCall()}>
        <span className={cn('absolute animate-ping  rounded-full  opacity-75 ', callStatus !== CallStatus.CONNECTING && 'hidden')}/>

        <span>
        {isCallInactiveorFinished ? 'Call' : <CallingIndicator />}
        </span>

        
      </button>
      ):(
       <button className='btn-disconnect' onClick={() => handleDisconnect()}>
          End
       </button>
      )}
    </div>
    </>

  )
}
export default Agents
