import React from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import users from '../assets/images/users.png'
import { Bell } from 'lucide-react'

const HomePage = () => {
  
  const userMetrics = [ 
    {
      name: 'Active Properties',
      value: 5460,
      image: house
    },
    {
      name: 'Registered Agents',
      value: 12,
      image: agent
    },
    {
      name: 'Registered Users',
      value: 210,
      image: users
    },
  ]

  return (
    <div className='p-4'>
      {/* Top Section */}
      <div className='md:flex justify-between p-5 bg-white items-center rounded-lg hidden mb-8'>
        <h2 className='font-bold text-2xl  '>Dashboard</h2>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" /></div>
      </div>

      {/* User Metrics */}
      <div className='md:flex hidden gap-5 flex-wrap mb-8 '>
            {userMetrics.map((data, index) => (
                <div
                 key={index}
                 className='bg-white flex  items-center rounded-xl w-[344px] justify-between p-5 text-[#23272E]'
                >
                    <article>
                        <h3 className='font-bold text-[13px] mb-2'>{data.name}</h3>
                        <h1 className='font-bold text-2xl'>{data.value}</h1>
                    </article>
                    <img src={data.image} alt="" className='w-[30px]' />
                </div>
            ))}
        </div>

    </div>
  )
}

export default HomePage