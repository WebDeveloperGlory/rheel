import React from 'react'
import { Bell, Home, Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="text-yellow-500 font-bold text-2xl flex items-center">
                    <Home className="w-8 h-8 mr-2" />
                    Rheel
                </div>
                <Menu className="w-6 h-6 text-gray-600" />
            </div>
            <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </div>
        </div>
    </nav>
  )
}

export default Navbar