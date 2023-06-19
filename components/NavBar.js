
import Link from 'next/link';
import {useAuth } from "../context/AuthContext"

export default function NavBar() {
  const { currentUser, Logout } = useAuth();

    return (
      <div className="flex justify-between items-center py-4 w-full mt-0 pr-8">
        <img className="ml-0" src="your-image-url" alt="Your logo" />
        <div className="flex justify-center items-center">
          <div className="px-6">
            <div className="cursor-pointer h-6 w-24 text-base leading-6 text-gray-800 font-bold tracking-wide underline">Case Study</div>
          </div>
          <div className="px-6">
            <div className="cursor-pointer h-6 w-24 text-base leading-6 text-gray-800 font-bold tracking-wide underline">Pricing</div>
          </div>
          {currentUser && currentUser.emailVerified?
          <div onClick={() => Logout()} className="px-6">
            <div className="cursor-pointer h-6 w-24 text-base leading-6 text-gray-800 font-bold tracking-wide underline">Logout</div>
          </div>:
          <Link  href="/user/login" className="px-6">
            <div className="cursor-pointer h-6 w-24 text-base leading-6 text-gray-800 font-bold tracking-wide underline">Login</div>
          </Link>
          }
          <button className="px-4 py-2 border border-gray-300 rounded-lg box-border text-sm leading-5 text-gray-700 font-medium tracking-wide text-center"> Get Started</button>
        </div>
      </div>
    );
  }
  