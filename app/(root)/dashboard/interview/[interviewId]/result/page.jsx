'use client'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { db } from '@/utils/db';
import { Rating, UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { ChevronsUpDown } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'

function Result({ params }) {
    const {user} = useUser();
    const actualParams = use(params);
    const interviewId = actualParams.interviewId;
    const [showPopup, setShowPopup] = useState(false);
    const [feedbackList, setFeedbackList] = useState([]);
    const [rating,setRating] = useState(0)

  useEffect(() => {
    setShowPopup(true)
    setRating(0)
    getFeedback();
  }, []);
    useEffect(() => {
        setShowPopup(true);
    }, [])
    
    const getFeedback = async () => {
    
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interviewId))
          .orderBy(UserAnswer.id);
        setFeedbackList(result);
        setRating(0)
        //console.log(result);
      };
      useEffect(()=>{
        feedbackList&&feedbackList?.map((feedback)=>setRating(prev=>prev+Number(feedback?.rating)));
        
      },[feedbackList]);

      
  return (
    <div className='p-5'>
              {/* Pop-up Modal */}
      <Dialog open={showPopup} onOpenChange={setShowPopup} className="">
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center mb-2">🎉 Congratulations! 🎉</DialogTitle>
            <DialogDescription className="w-full flex flex-col items-center justify-center">
                    <Image
                        src="/success.gif"
                        height={200}
                        width={280}
                        alt="success"
                        className='flex items-center  justify-center'
                    />
                   You have completed your interview
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowPopup(false)}>Close</Button>
        </DialogContent>
      </Dialog>

        <div>
            <h2 className='text-2xl font-bold text-green-500'>Congratulation, {user?.firstName} 🎉 </h2>
            <p>You have completed your test 👍</p>
            <h2>Your Score: {rating}/25</h2>
        </div>
        <div>
        <h2 className="text-sm text-slate-500 mt-3">📈Show your given answer and Which area you need to improve</h2>
            <div className='flex flex-col gap-2'>
        {feedbackList &&
          feedbackList.map((item,index) => (
            <Collapsible key={index} className="p-2  rounded-lg my-2 text-left bg-slate-100">
              <CollapsibleTrigger className="w-full flex text-left justify-between items-center  pl-2">
                {item?.question} <ChevronsUpDown className="sm:w-10 md:w-4"/>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2">
                <div className={`${(item?.rating < 3 || item?.rating===1/5)?'text-red-500':'text-green-600'} rounded-md border px-4 py-2 font-mono text-sm shadow-sm w-full`}>
                    <h2>Score: {item?.rating}</h2>
                </div>
                <div className="rounded-md  px-4 py-2 font-mono text-sm shadow-sm bg-blue-200 border-l-4 border-blue-500">
                    <h2 className="font-bold mb-1">📝Your Answer: </h2>
                    <p className='text-blue-900'>{item?.userAnswer}</p>
                </div>
                <div className="rounded-md  px-4 py-2 font-mono text-sm shadow-sm bg-green-200  border-l-4 border-green-500">
                    <h2 className="font-bold mb-1">✅Correct Answer: </h2>
                    <p className="text-green-800">{item?.correctAnswer}</p>
                </div>
                <div className="rounded-md px-4 py-2 font-mono text-sm shadow-sm bg-purple-200 border-l-4 border-purple-500">
                    <h2 className="font-bold mb-1">⚠️Feedback: </h2>
                    <p className="text-purple-800">{item?.feedback}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
            </div>
        </div>
    </div>
  )
}

export default Result