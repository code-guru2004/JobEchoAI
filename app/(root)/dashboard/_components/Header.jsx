'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const path = usePathname();

    
    
  return (
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
                <Image 
                src={'/logo1.svg'}
                alt='logo'
                width={150}
                height={150}
                />
            </Link>
          </div>
          <ul className='hidden md:flex md:items-center gap-6'>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>
                <Link href='/dashboard'>
                    Dashboard
                </Link>
            </li>
           
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard/interviewse' && 'text-primary font-bold'}`}>
                <Link href='/dashboard/interviews'>
                    All Interviews
                </Link>
            </li>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard/works' && 'text-primary font-bold'}`}>
                <Link href={'#'}>
                    How it works?
                </Link>
            </li>
            <li className={`hover:text-primary hover:font-bold p-2 rounded transition-all cursor-pointer ${path=='/dashboard/works' && 'text-primary font-bold'}`}>
                <UserButton/>
            </li>
        </ul>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/*
                Heroicon name: menu-alt-2

                Menu open: "hidden",
                Menu closed: "block"
              */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              Dashboard
            </Link>
            
            <Link href="/dashboard/interviews" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              All Interviews
            </Link>
            <div className='flex gap-2 items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900'>
                <UserButton />Profile
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  )
}

export default Header