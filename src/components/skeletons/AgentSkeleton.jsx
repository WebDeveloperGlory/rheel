import React from 'react'

const AgentSkeleton = () => {
  return (
    <div className='bg-white p-5 rounded-lg w-full md:w-[300px] shadow-md border border-[#9EA3A9] animate-pulse'>
      <div className='w-full h-44 bg-gray-200 rounded-xl mb-5'></div>
      <div className='h-6 bg-gray-200 rounded w-3/4 mb-6'></div>
      <div className='h-2 rounded-lg w-17 bg-gray-200 mb-5'></div>
      <div className='flex items-center gap-2'>
        <div className='w-5 h-5 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded w-32'></div>
      </div>
    </div>
  )
}

export default AgentSkeleton