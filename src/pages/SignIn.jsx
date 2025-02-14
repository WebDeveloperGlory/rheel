import React from 'react';
import { Eye } from 'lucide-react';
import horizon from '../assets/images/horizon.png'
import bg from '../assets/images/bg.png'

const SignInPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-green-900 mb-1">Sign In</h1>
          <p className="text-gray-600 mb-1 text-sm">Enter your email and password to sign in!</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-green-900 mb-1.5">
                Email*
              </label>
              <input
                type="email"
                placeholder="mail@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-xs placeholder:text-gray-500 outline-none"
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-green-900 mb-1.5">
                Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-xs placeholder:text-gray-500 outline-none"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <span className="ml-2 text-xs text-green-900 font-semibold">Keep me logged in</span>
              </label>
              <a href="#" className="text-xs text-green-700 font-semibold">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-700 text-xs text-white py-4 px-4 rounded-lg mt-3"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-4 text-xs text-green-700 font-light">
            Not registered yet?{' '}
            <a href="#" className="font-bold">
              Create an Account
            </a>
          </p>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 relative overflow-hidden hidden md:block">
        {/* Background with placeholder image */}
        <div className="absolute inset-0">
          <img
            src={bg}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="bg-white rounded-full p-8 mb-8">
            <img
              src={horizon}
              alt="Rheel Logo"
              className="w-30 h-30"
            />
          </div>
          <div className="text-center border border-gray-500 rounded-[15px] px-12 py-5">
            <p className="text-sm mb-1">WELCOME ADMIN</p>
            <h2 className="text-2xl font-bold">RHELL ESTATE CONSOLE</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;