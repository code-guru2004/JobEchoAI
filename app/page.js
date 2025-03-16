"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useContext, useEffect } from "react";

import Image from "next/image";


import { UserDeatilsContext } from "./_context/UserDetailsContext";

import Link from "next/link";
import Typewriter from "typewriter-effect";
import CoolBtn from "@/components/shared/CoolBtn";
import Card from "@/components/shared/Card";
import Heading from "@/components/shared/Heading";
import Hero from "@/components/shared/Hero";
import Testimonial from "@/components/shared/Testimonial";
import FeaturesPage from "@/components/shared/FeaturePage";
import GithubBtn from "@/components/shared/CoolBtn2";

export default function Home() {
  const { user } = useUser();
  const { userDetails } = useContext(UserDeatilsContext);

  //console.log(userDetails);

  return (
    <div className="">
      <header className="flex  flex-wrap sm:justify-start  sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm md:p-2 sm:py-1 shadow-gray-300 shadow-sm mt-3">
        <nav
          className="relative  p- max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            {/* <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a> */}
            <div>
              {/* <button type="button" className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> */}
              <div className="flex items-center gap-2">
                <Image src={"/logo.svg"} alt="logo" width={140} height={140} />
              </div>
            </div>
          </div>
          <div
            id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
              {!user?.primaryEmailAddress?.emailAddress ? (
                <div>
                  <Link href={"/sign-in"} className="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500">
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                    Sign Up
                  </Link>
                </div>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        </nav>
      </header>
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="flex justify-center">
            <GithubBtn />
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <div className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              <h2 className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                <Typewriter
                  options={{
                    strings: ["Upload Resume", "Attend Interview"],
                    autoStart: true,
                    loop: true,
                  }}
                  className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent"
                />
              </h2>
              <span className="bg-clip-text bg-gradient-to-tl from-slate-300 to-black text-transparent">
                {" "}
                By JobEchoAI
              </span>
            </div>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">
            AI-Powered Mock Interviews to Land Your Dream Job! <br/>
            Get real-time feedback, personalized insights, and boost your confidence—practice smarter, ace faster!
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Link href={"/dashboard"}>
              <CoolBtn />
            </Link>
          </div>
        </div>
      </div>

      <div>
      <Hero/>
      </div>

      <FeaturesPage/>

      {/*  */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
        <Heading text={"How to use?"}/>
        <div className="flex flex-col md:flex-row items-center  justify-center gap-10">
          <Card
            cardNo={"1"}
            img={"/pdf.png"}
            title={"Upload Resume"}
            description={"Upload or drag and drop your CV or Resume in PDF."}
          />
          <Card
            cardNo={"2"}
            img={"/interview.png"}
            title={"Start Interview"}
            description={
              "Just click start button and get start your interview."
            }
          />
          <Card
            cardNo={"3"}
            img={"/result.png"}
            title={"Get Result"}
            description={"Get your interview result and overall performance."}
          />
        </div>
      </div>
      {/*  */}
      <Testimonial/>
    </div>
  );
}
