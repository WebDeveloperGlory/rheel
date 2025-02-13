import React from 'react';
import { Eye } from 'lucide-react';

const SignInPage = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h1>
          <p className="text-gray-600 mb-6">Enter your email and password to sign in!</p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                placeholder="mail@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button 
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={20} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <span className="ml-2 text-sm text-gray-600">Keep me logged in</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700">
                Forgot password?
              </a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-600">
            Not registered yet?{' '}
            <a href="#" className="text-green-600 hover:text-green-700">
              Create an Account
            </a>
          </p>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 bg-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/800/600')] opacity-10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="bg-white rounded-full p-8 mb-8">
            <img
              src="/api/placeholder/120/120"
              alt="Rheel Logo"
              className="w-30 h-30"
            />
          </div>
          <div className="text-center">
            <p className="text-sm mb-2">WELCOME ADMIN</p>
            <h2 className="text-2xl font-bold">RHELL ESTATE CONSOLE</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;