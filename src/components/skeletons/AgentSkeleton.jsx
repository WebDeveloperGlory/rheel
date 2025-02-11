import React from 'react'

const AgentSkeleton = () => {
  return (
    <div className='bg-white rounded-lg p-5'>
      <h3 className='font-bold mb-2 text-2xl'>Agents</h3>
      <ul className='flex text-[#181818] font-medium gap-5 items-center md:text-[14px] mb-8'>
        <li className='text-[#FF5B19]'>By Latest</li>
        <li>By Properties</li>
      </ul>

      <div className="grid md:grid-cols-4 mb-8 gap-[20px] md:gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <div key={index} className="bg-white p-3 rounded-lg w-full md:w-[230px] shadow-md animate-pulse">
            <div className="w-full h-44 bg-gray-200 rounded-xl mb-5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-1 bg-gray-200 rounded w-10 mb-5"></div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentSkeleton;