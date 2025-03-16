import React from 'react'

function Heading({text}) {
  return (
    <div className="text-center mb-9">
    <span className="relative flex justify-center">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

      <span className="relative text-xl md:text-2xl z-10 bg-white px-6 text-purple-500 font-bold">
        {text}
      </span>
    </span>
  </div>
  )
}

export default Heading