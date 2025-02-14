import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { House, Users, Ticket, Star, Blend, Settings, Power, LayoutGrid, Columns2 } from 'lucide-react';
import { logout } from '../api/sign in/requests';

const menuItems = [
  { icon: House, name: 'Dashboard', path: '/' },
  { icon: Users, name: 'Agents', path: '/agents' },
  { icon: Blend, name: 'Properties', path: '/properties' },
  //{ icon: Ticket, name: 'Inquiries', path: '/inquiries' },
  { icon: Star, name: 'Affiliates', path: '/affiliates' },
  { icon: Columns2, name: 'Announcements', path: '/announcements' },
  { icon: LayoutGrid, name: 'App Banners', path: '/app-banners' }
];

const Sidebar = () => {
  const location = useLocation();
  const sidebarClass = location.pathname === '/login' ? 'md:hidden' : '';

  return (
    <div className={`sidebar  bg-white p-6 w-[250px] h-full hidden md:block fixed top-0 left-0 ${ sidebarClass }`}>
      <img src={logo} alt="Rheel Estate Logo" className="logo mb-5" />

      <div className="menu">
        <label className='text-[11px] pl-5 uppercase text-[#8B909A]'>Main Menu</label>
        <ul className='flex flex-col my-5'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className={`menu-item py-2 px-5 flex items-center gap-3 text-[14px] 
                  ${location.pathname === item.path ? 'bg-[#F3F4F8] text-[#23272E] font-semibold' : 'text-[#8B909A] hover:bg-[#F3F4F8] hover:text-[#23272E]'}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="admin">
        <label className='text-[11px] uppercase text-[#8B909A] pl-5'>Admin</label>
        <ul className='flex flex-col my-5'>
          {/*<li>
            <Link 
              to="/settings" 
              className={`menu-item flex py-2 px-5 items-center gap-3 text-[14px] 
                ${location.pathname === '/settings' ? 'bg-[#F3F4F8] text-[#23272E] font-semibold' : 'text-[#8B909A] hover:bg-[#F3F4F8] hover:text-[#23272E]'}`}
            >
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </li>*/}
          <li>
            <button 
             className="menu-item flex text-[#8B909A] py-2 px-5 cursor-pointer w-full hover:bg-[#F3F4F8] hover:text-[#23272E] items-center gap-3 text-[14px]"
             onClick={logout}
             >
              <Power size={20} />
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
