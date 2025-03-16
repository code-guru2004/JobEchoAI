import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
function InterviewCardLoader() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
         <Skeleton className="h-[30%] w-[90vw] rounded-xl bg-slate-200" />
         <Skeleton className="h-[125px] w-[90vw] rounded-xl bg-slate-200" />
         <Skeleton className="h-[125px] w-[90vw] rounded-xl bg-slate-200" />
         <Skeleton className="h-[125px] w-[90vw] rounded-xl bg-slate-200" />
         <Skeleton className="h-[125px] w-[90vw] rounded-xl bg-slate-200" />
         <Skeleton className="h-[125px] w-[90vw] rounded-xl bg-slate-200" />
    </div>
  )
}

export default InterviewCardLoader