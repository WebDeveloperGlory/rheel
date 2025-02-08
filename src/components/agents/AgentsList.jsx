import { Mail } from 'lucide-react'
import AgentSkeleton from '../skeletons/AgentSkeleton'

const AgentsList = ({ agents, loading }) => {
  return (
    <div className='bg-white rounded-lg p-5'>
      <h3 className='font-bold mb-2 text-2xl'>Agents</h3>
      <ul className='flex text-[#181818] font-medium gap-5 items-center md:text-[14px] mb-8'>
        <li>By Latest</li>
        <li>By Properties</li>
      </ul>

      <div className="flex flex-wrap mb-8 gap-[20px] md:gap-8">
        {loading ? (
          Array(6).fill(0).map((_, index) => (
            <AgentSkeleton key={index} />
          ))
        ) : (
          agents.map((agent, index) => (
            <div
              key={index}
              className='bg-white p-5 rounded-lg w-full md:w-[300px] shadow-md cursor-pointer'
            >
              <img src={agent.logo} alt="" className='w-full mx-auto h-44 object-cover mb-5 rounded-xl' />
              <h2 className='text-[#181A1B] text-xl font-medium mb-6'>{agent.company_name}</h2>
              <div className='h-2 rounded-lg w-17 bg-[#2D68A2] mb-5'></div>
              <div className='flex items-center text-[#9EA3A9]'>
                <div className='flex gap-2 items-center'>
                  <Mail className='w-5 h-5' />
                  <span className='text-[18px] md:text-[14px]'>{agent.email}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer'>
        Create New Agent
      </button>
    </div>
  )
}

export default AgentsList
