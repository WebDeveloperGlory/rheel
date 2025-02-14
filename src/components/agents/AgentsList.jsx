import { Mail, Warehouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AgentSkeleton from '../skeletons/AgentSkeleton';

const AgentsList = ({ agents, loading, show }) => {
  const navigate = useNavigate();

  const handleAgentClick = (id) => {
    navigate(`/agents/${id}`);
  };

  if (loading) {
    return <AgentSkeleton />;
  }

  return (
    <div className="bg-white rounded-lg p-5">
      <h3 className="font-bold text-2xl mb-4">Agents</h3>
      <div className="flex gap-5 text-sm mb-8">
        <button className="text-[#FF5B19] font-medium">By Latest</button>
        <button className="text-gray-600 font-medium">By Properties</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white rounded-xl shadow-md"
          >
            <div className="p-3">
              <img
                src={agent.logo}
                alt={agent.company_name}
                onClick={() => handleAgentClick(agent.id)}
                className="w-full h-48 object-cover rounded-xl mb-4 cursor-pointer"
              />

              <h2 className="text-[#181A1B] font-medium">{agent.company_name}</h2>
              <div className="h-1 w-10 bg-[#2D68A2] my-3 rounded-full"></div>

              <div className="flex flex-col items-start md:items-start justify-between w-full">
                <div className="flex items-center gap-2 text-gray-500 mb-2">
                  <Warehouse className="w-4 h-4" />
                  <span className="text-xs">{agent.properties} Properties</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 max-w-full">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs truncate max-w-[150px]" title={agent.email}>
                    {agent.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={show}
        className="bg-[#348875] text-white py-3 px-6 cursor-pointer text-sm hover:bg-[#2d7362] transition-colors duration-300"
      >
        Create New Agent
      </button>
    </div>
  );
};

export default AgentsList;