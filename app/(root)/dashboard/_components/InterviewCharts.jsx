"use client"

import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from '@/utils/db';
import { Rating } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';





function InterviewCharts() {
  const {user} = useUser();
  const [data, setData] = useState([]);
  // const data = [
  //     { month: "Jan", revenue: 4000 },
  //     { month: "Feb", revenue: 3000 },
  //     { month: "Mar", revenue: 5000 },
  //     { month: "Apr", revenue: 7000 },
  //     { month: "May", revenue: 6000 },
  //     { month: "Jun", revenue: 8000 },
  //   ];
  useEffect(()=>{
    getratings();
  },[]);
  const getratings=async()=>{
    const resp = await db.select().from(Rating).where(eq(Rating.userEmail,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Rating.createdAt));
    if(resp){
      //console.log(resp);
      setData(resp)
      // for(let i=0;i<resp.length;i++){
      //   let d=data
      //   data.push({resp})
      // }
    }
  }
  return (
    <div>{
      data.length===0?<div>⚠️ No Interview Yet</div> :
      <Card className="w-full max-w-lg p-4 shadow-lg">
      <CardHeader>
        <CardTitle>All Interview Deatils</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="rating" stroke="#3b82f6" fill="#93c5fd" />
          </AreaChart>
        </ResponsiveContainer> */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rating" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      </Card>}
    </div>
  ) 
}

export default InterviewCharts