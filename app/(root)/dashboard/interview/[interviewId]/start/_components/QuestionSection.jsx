import { Lightbulb } from 'lucide-react'
import React from 'react'

function QuestionSection({interviewQuestion,activeQuestionIndex}) {
  return (
    interviewQuestion && (
        <div className="p-5 border rounded-lg my-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {interviewQuestion &&
              interviewQuestion.map((question, index) => (
                <h2
                  className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${
                    activeQuestionIndex === index
                      ? "bg-[#3A7D44] text-white"
                      : "bg-secondary"
                  }`}
                  key={index}
                >
                  Question #{index + 1}
                </h2>
              ))}
          </div>
          <h2 className="my-5 text-md md:text-base">
            {interviewQuestion[activeQuestionIndex]?.question}
          </h2>
  
          
          <div className="border rounded-lg p-5 bg-blue-100 border-blue-700 text-blue-700 mt-20">
            <h2 className="flex gap-1 text-sm items-center justify-start">
              <Lightbulb className="w-4" />
              <strong>NOTE:</strong>
            </h2>
            <div>
              <h2 className="text-sm">1️⃣You only get one chance to get answer</h2>
              <h2 className="text-sm">2️⃣You can use voice or typing.</h2>
              <h2 className="text-sm">3️⃣We don't record your video. You can turn off it any time.</h2>
              {/* <h2 className="text-sm">2️⃣</h2> */}
            </div>
          </div>
        </div>
      )
  )
}

export default QuestionSection