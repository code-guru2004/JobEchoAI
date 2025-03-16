"use client"
import { db } from '@/utils/db';
import { MockInterview, Rating, UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import AnswerSection from './_components/AnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { chatSession } from '@/utils/GeminiAI';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function StartInterview({params}) {
    const {user}=useUser();
    const actualParams = use(params);
    const interviewId = actualParams.interviewId;
    const [interviewData , setInterviewData] = useState();
    const [interviewQuestion, setInterviewQuestion] = useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    const [rating,setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const route = useRouter();

    useEffect(()=>{
        getInterviewDetails()
    },[]);
    const getInterviewDetails=async()=>{
        const resp = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId));
        if(resp){
            const jsonMockRes = JSON.parse(resp[0]?.jsonMockResp)
            // console.log(jsonMockRes);
            // console.log(resp[0]);
            setInterviewQuestion(jsonMockRes)
            setInterviewData(resp[0]);
        }
    }
    const handleSubmitAnswer=async(text)=>{
        //console.log(text);
        setLoading(true)
        const feedbackPrompt="Question: "+interviewQuestion[activeQuestionIndex]?.question+", User Answer: "+text+". Depends on question and user answer for the given interview question very strictly and "+" please  give us rating( from 0 to 5) for answer and feedback area of improvement if any "+"in just 3 to 5 lines to improve it in JSON Format with rating field and feedback field";

        const result = await chatSession.sendMessage(feedbackPrompt);

        const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
        const JsonFeedbackResp = JSON.parse(mockJsonResp)
        //console.log("mockJsonResp",mockJsonResp);
        //console.log(feedbackPrompt);
        
        // if(JsonFeedbackResp){

          const respDB =await db.insert(UserAnswer).values({
            mockIdRef:interviewData?.mockId,
            question:interviewQuestion[activeQuestionIndex]?.question,
            correctAnswer:interviewQuestion[activeQuestionIndex]?.answer,
            userAnswer:text,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),
          });
          if(respDB){
            //console.log(respDB);
            setRating(rating+Number(JsonFeedbackResp?.rating));
            //console.log(JsonFeedbackResp?.rating);
            
            setLoading(false)
            toast("Your Answer is saved.", {
                description: "Try out the next one👍",
                
              });
              if(activeQuestionIndex===4){
                await saveRating();
                //console.log("rating");
                
                route.push(`/dashboard/interview/${interviewId}/result`)
              }else{
                setActiveQuestionIndex(activeQuestionIndex+1)
              }
          }
    }

    // Help to show the stats
    const saveRating=async()=>{
      ///console.log(rating);
      
        const resp=await db.insert(Rating).values({
          interviewID:interviewId,
          rating:rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format("DD-MM-YYYY")
        });
      
    }
  return (
    <div className='px-5'>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {/* Questions */}
            <QuestionSection
                interviewQuestion={interviewQuestion} 
                activeQuestionIndex={activeQuestionIndex}
            />

            {/* Video and Mic */}
            <AnswerSection
                loading={loading}
                onAnswerUpload={handleSubmitAnswer}
            />
        </div>
        <div className='flex justify-center  md:justify-end gap-5 my-5'>
            {/* { activeQuestionIndex>0 &&
                <Button onClick={()=>setActiveQuestionIndex(prev=>prev-1)} className="bg-sky-600 text-white">Previous Question</Button>
            } */}
            { activeQuestionIndex<(process.env.NEXT_PUBLIC_QUESTION_COUNT-1)&&
                <Button onClick={()=>setActiveQuestionIndex(prev=>prev+1)} className="cursor-pointer bg-green-600 text-white hover:bg-green-700 shadow hover:shadow-lg">Next Question</Button>
            }
            {
                activeQuestionIndex===(process.env.NEXT_PUBLIC_QUESTION_COUNT-1)&&
                <Link href={`/dashboard/interview/${interviewId}/result`} onClick={saveRating}>
                    <Button className="bg-red-600 hover:bg-red-700 cursor-pointer text-white hover:text-slate-100">End Interview</Button>
                </Link>
            }
        </div>
    </div>
  )
}

export default StartInterview