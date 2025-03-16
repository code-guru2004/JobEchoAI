'use client'
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Camera, GlobeLock, Lightbulb, WebcamIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {
    const route = useRouter()
    const actualParams = use(params);
    const interviewId = actualParams.interviewId;

    const [interviewData , setInterviewData] = useState();
    const [loading,setLoading] = useState(false)
    const [webcamEnable , setWebcamEnable] = useState(false);
    const path = usePathname();

    useEffect(()=>{
        getInterviewData();
    },[]);

    const getInterviewData= async()=>{
        const resp = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId));
        if(resp){
            setInterviewData(resp[0])
            
        }
    }
    function capitalizeFirstLetter(str) {
        if (!str) return str; // Handle empty strings
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      const gotoStart =()=>{
        setLoading(true)
        route.push(path+"/start")
        setLoading(false)
      }
  return (
    <div className='my-10 flex justify-center flex-col items-center w-full gap-8'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 item-center justify-center w-[80%]'>
            <div className='flex flex-col my-5 items-center gap-2 '>
                <div className='flex flex-col  p-5 rounded-lg gap-2 w-full bg-purple-100  border-l-6 border-purple-500'>
                    
                    <h2><strong>Job Description: </strong>{capitalizeFirstLetter(interviewData?.jobDescription)}</h2>
                    <h2><strong>Years of Experience: </strong>{capitalizeFirstLetter(interviewData?.jobExperience)}</h2>
                </div>
                <div className='w-full p-5 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-600'>
                    <h2 className='flex gap-1 mb-1'>
                        <Lightbulb className='w-5'/> <strong>Information: </strong>
                    </h2>
                    <h2 className='text-xs mb-2'>📹 We respect your privacy and want to assure you that we do not save, record, or store your video in any way. All video processing happens in real-time, and once you close the session, no data is retained.
                   </h2> 
                   <h2 className='text-xs flex gap-1'>🔏 We are committed to providing a real-life interview experience, which is why we enable the camera for a more interactive session. However, we do not save, record, or store your video in any way. All video processing happens in real-time, and once you close the session, no data is retained. If you prefer, you can choose to turn off camera permissions at any time.</h2>
                </div>
            </div>

            <div className='flex flex-col items-center w-[100%]'>
            {
                webcamEnable ? 
                <Webcam
                onUserMedia={()=>setWebcamEnable(true)}
                onUserMediaError={()=>setWebcamEnable(false)}
                mirrored={true}
                style={{
                    height:300,
                    width:800
                    
                }}/> : 
                <WebcamIcon className='h-72 w-full my-7 p-10 bg-secondary rounded-lg border'/>
            }
            <Button className="bg-secondary text-purple-700 w-full hover:text-purple-700 hover:bg-slate-200 mt-3" onClick={()=>setWebcamEnable(!webcamEnable)}>
                {
                    webcamEnable?"Stop Webcam" : "Start Webcam"
                }
            </Button>
            </div>
        </div>
        
        <div className='flex justify-center flex-col items-center mt-5'>
            {/* <Link href={path+"/start"}> */}
                <Button className={`bg-primary text-white hover:text-gray-200 ${loading&&'disabled:true'}`} onClick={gotoStart}>Start Interview</Button>
            {/* </Link> */}
            <p className='text-xs text-gray-600 mt-1'>Best of Luck🌠</p>
        </div>
    </div>
  )
}

export default Interview