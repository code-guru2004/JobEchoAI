"use client"
import React, { useEffect, useState } from 'react'
import InterviewCard from './_component/InterviewCard'
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewCardLoader from './_component/InterviewCardLoader';

function AllInterviews() {
    const {user} = useUser();

    const [allInterviewData, setAllInterviewData] = useState([]);

    useEffect(()=>{
       getInterviewData()
    },[])
    const getInterviewData=async()=>{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(MockInterview.id));
        //console.log(result);
        setAllInterviewData(result)
      }
  return (
    <div className='px-7'>
      
        {
                allInterviewData.length==0? <InterviewCardLoader/> : allInterviewData.map((interview,index)=>(
                    <div key={index}>
                        <InterviewCard
                            interviewInfo={interview}
                        />
                    </div>
                ))
            }
    </div>
  )
}

export default AllInterviews