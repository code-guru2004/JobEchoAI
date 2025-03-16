'use client'

import { FileScan } from 'lucide-react'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewCharts from './_components/InterviewCharts'
import Heading from '@/components/shared/Heading'

function Dashboard() {
  return (
    <div className='p-10 '>
    <h2 className='font-bold text-3xl text-primary mb-2'>Dashboard</h2>
    <h2 className='text-gray-500 flex gap-2'><FileScan className='w-5'/>Scan your resume and give interview</h2>

    <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewInterview/>

    </div>

    <div className=''>
    {/* <h2 className='font-bold text-3xl text-primary mb-2'>Your Interview Stats</h2> */}
    <Heading text={"Your Interview Stats"}/> 
      <InterviewCharts/>
    </div>

  

  </div>
  )
}

export default Dashboard