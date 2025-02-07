import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { Bell, Menu, X, House, Users, Ticket, Star, Blend, Settings, Power, LayoutGrid, Columns2 } from 'lucide-react';

const menuItems = [
  { icon: House, name: 'Dashboard', path: '/' },
  { icon: Users, name: 'Agents', path: '/agents' },
  { icon: Blend, name: 'Properties', path: '/properties' },
  { icon: Ticket, name: 'Inquiries', path: '/inquiries' },
  { icon: Star, name: 'Affiliates', path: '/affiliates' },
  { icon: Columns2, name: 'Announcements', path: '/announcements' },
  { icon: LayoutGrid, name: 'App Banners', path: '/app-banners' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-20 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-white z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <img src={logo} alt="Rheel Estate Logo" className="mb-5" />

          <div className="menu">
            <label className="text-[11px] pl-5 uppercase text-[#8B909A]">Main Menu</label>
            <ul className="flex flex-col my-5">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`menu-item py-2 px-5 flex items-center gap-3 text-[14px]
                      ${location.pathname === item.path 
                        ? 'bg-[#F3F4F8] text-[#23272E] font-semibold' 
                        : 'text-[#8B909A] hover:bg-[#F3F4F8] hover:text-[#23272E]'}`}
                    onClick={toggleMenu}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="admin">
            <label className="text-[11px] uppercase text-[#8B909A] pl-5">Admin</label>
            <ul className="flex flex-col my-5">
              <li>
                <Link
                  to="/settings"
                  className={`menu-item flex py-2 px-5 items-center gap-3 text-[14px]
                    ${location.pathname === '/settings' 
                      ? 'bg-[#F3F4F8] text-[#23272E] font-semibold' 
                      : 'text-[#8B909A] hover:bg-[#F3F4F8] hover:text-[#23272E]'}`}
                  onClick={toggleMenu}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <button className="menu-item flex w-full text-[#8B909A] py-2 px-5 cursor-pointer hover:bg-[#F3F4F8] hover:text-[#23272E] items-center gap-3 text-[14px]">
                  <Power size={20} />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;