import { Mail, Warehouse } from 'lucide-react' 
import { useNavigate } from 'react-router-dom';
import AgentSkeleton from '../skeletons/AgentSkeleton'

const AgentsList = ({ agents, loading, show }) => {
  const navigate = useNavigate();

  const handleAgentClick = (id) => {
    navigate(`/agents/${id}`);
  };

  if (loading) {
    return <AgentSkeleton />;
  }

  return (
    <div className='bg-white rounded-lg p-5'>
      <h3 className='font-bold mb-2 text-2xl'>Agents</h3>
      <ul className='flex text-[#181818] font-medium gap-5 items-center md:text-[14px] mb-8'>
        <li className='text-[#FF5B19]'>By Latest</li>
        <li>By Properties</li>
      </ul>

      <div className="grid md:grid-cols-4 mb-8 gap-[20px] md:gap-5">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => handleAgentClick(agent.id)}
            className='bg-white p-3  rounded-lg w-full md:w-[230px] shadow-md   hover:shadow-lg transition-shadow'
          >
            <img 
              src={agent.logo} 
              alt={agent.company_name} 
              className='w-full mx-auto pt-1 h-44 object-cover mb-5 rounded-xl cursor-pointer'
            />
            <h2 className='text-[#181A1B]  font-medium mb-4'>{agent.company_name}</h2>
            <div className='h-1 rounded-lg w-10 bg-[#2D68A2] mb-5'></div>
            <div className='flex items-center text-[#9EA3A9]'>
              <div className='flex gap-2 items-center'>
                <Mail className='w-4 h-4' />
                <span className='text-[18px] md:text-[12px] break-words'>{agent.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={show}
        className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer'
      >
        Create New Agent
      </button>
    </div>
  )
}

export default AgentsList
