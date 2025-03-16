import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-center items-center md:gap-8 w-full">
     
    <div className='lg:w-[50%]'>
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-5xl font-bold text-center  text-purple-700 drop-shadow-lg" >
            Hey! Attend Your First Interview🚀
          </h2>

          <p className="mt-4 text-gray-700 w-[100%]">
          Struggling with job interviews? We provide real-life mock interview experiences to help students sharpen their skills, boost confidence, and land their dream jobs. Get expert feedback, and a stress-free environment to practice. Your success starts here—prepare, perform, and get hired! ✅
          </p>
        </div>
      </div>

      <div>
        <Image
          src="/Hero.jpg"
          className="rounded"
          width={400}
          height={400}
          alt="image"
        />
      </div>
      
    </div>
  </div>
</section>
  )
}

export default Hero