'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAI';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Loader, Mic, MicOff } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

function AnswerSection({onAnswerUpload,loading}) {
    const {user} = useUser();
    const {
      error,
      interimResult,
      isRecording,
      results,
      startSpeechToText,
      stopSpeechToText,
      setResults,
    } = useSpeechToText({
      continuous: true,
      useLegacyResults: false
    });
    const [userAnswer , setUserAnswer] = useState("");
    //const [loading,setLoading] = useState(false);

      useEffect(()=>{
        results.map((result)=>setUserAnswer(userAnswer + result?.transcript))
      },[results]);

    //   useEffect(()=>{
    //     if(!isRecording && userAnswer?.length>3){
    //       updateUserAnswer();
    //     }
    //   },[userAnswer])
      const StartStopRecording=()=>{
        if(isRecording){
            stopSpeechToText()
        }
        else{
            startSpeechToText()
        }
      }
      const updateUserAnswer=()=>{
        //console.log("user ANswer=",userAnswer);
          //setLoading(true)
          onAnswerUpload(userAnswer);
    

          setResults([])
          setUserAnswer('')
          //setLoading(false)
          
          
      }

  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 my-10'>

        <Image src={"/webcamImg.png"} width={100} height={100} alt='webcam' className='absolute'/>
        <Webcam
            mirrored={true}
            style={{
                width:'100%',
                height:300,
                zIndex:10,
            }}
        />
        </div>

        <Button disabled={loading} className={`bg-[#D3E671] text-black hover:bg-[#A4B465] transition-all cursor-pointer  ${isRecording&&'bg-secondary text-red-700 hover:bg-slate-300 hover:text-purple-800'} mb-4`} onClick={StartStopRecording}>
            {
                isRecording ? 
                <h2 className='flex items-center gap-1'>
                    <MicOff /> Stop Recording
                </h2> : 
                <h2 className='flex items-center gap-1'>
                    <Mic />
                    Start Recording
                </h2>

            }
           
        </Button>
    <Textarea 
    type="text"
    value={userAnswer} // Controlled input
    onChange={(e) => setUserAnswer(e.target.value)}
    className="border p-2 mb-4 "
    placeholder="Type Your Answer Here..."/>

        <Button disabled={loading}  className={`px-4 py-2 rounded-md text-white ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={updateUserAnswer
        }>
          {
          loading?
          <>
            <Loader className="animate-spin"/>Submitting
          </>
          :"Submit Answer"
          }
        </Button>
    </div>
  )
}

export default AnswerSection