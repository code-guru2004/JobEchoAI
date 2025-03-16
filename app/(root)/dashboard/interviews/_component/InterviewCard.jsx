import Image from "next/image";
import Link from "next/link";
import React from "react";

function InterviewCard({interviewInfo}) {
  return (
    <div>
      <article className="rounded-xl border-2 border-gray-100 bg-white">
        <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <Link href={`/dashboard/interview/"+interviewInfo?.mockId+"/result`} className="block shrink-0">
            <Image
                src={"/card-interview.png"}
                alt="interview"
                width={100}
                height={100}
            />
          </Link>

          <div>
            <h3 className="font-medium sm:text-md mb-2">
              <Link href={"/dashboard/interview/"+interviewInfo?.mockId+"/result"} className="hover:underline">
                {" "}
                {interviewInfo?.jobDescription}
              </Link>
            </h3>

            <p className="line-clamp-2 text-sm text-gray-700">
              🚀 Year of Expreience- {interviewInfo?.jobExperience}
            </p>

            <div className="mt-2 sm:flex sm:items-center sm:gap-2">
              <div className="flex items-center gap-1 text-gray-500">
              <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-6 h-6 text-gray-700 dark:text-white"
>
  <path d="M8 2v4" />
  <path d="M16 2v4" />
  <rect width="18" height="18" x="3" y="4" rx="2" />
  <path d="M3 10h18" />
  <path d="M8 14h.01" />
  <path d="M12 14h.01" />
  <path d="M16 14h.01" />
  <path d="M8 18h.01" />
  <path d="M12 18h.01" />
  <path d="M16 18h.01" />
</svg>

                <p className="text-sm">{interviewInfo?.createdAt}</p>
              </div>

              <span className="hidden sm:block" aria-hidden="true">
                &middot;
              </span>

              <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                Posted by
                <a
                  href="#"
                  className="font-medium underline hover:text-gray-700"
                >
                  {" "}
                  {interviewInfo?.createdBy}{" "}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <strong className="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-green-600 px-3 py-1.5 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span className="text-[10px] font-medium sm:text-xs">Solved!</span>
          </strong>
        </div>
      </article>
    </div>
  );
}

export default InterviewCard;
