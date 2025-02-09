import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Mail, MapPin, Phone, Building } from 'lucide-react'
import { getAgentById } from '../api/agents/requests'
import mail from '../assets/images/mail.png'
import phone from '../assets/images/phone.png'
import location from '../assets/images/location.png'
import type from '../assets/images/type.png'

const AgentsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) {
        setError('No agent ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await getAgentById(id);
        if (response?.data) {
          setAgent(response.data);
        } else {
          setError('Agent not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch agent');
      } finally {
        setLoading(false);
      }
    };
    fetchAgent();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse bg-white rounded-lg p-6">
          <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !agent) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-xl text-red-600 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error || 'Agent not found'}</p>
            <button
              onClick={() => navigate('/agents')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Back to Agents
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:py-[100px]">
      <div className="bg-white rounded-lg p-5 md:w-[75%] md:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={agent.logo} 
              alt={agent.company_name}
              className="w-full h-[300px] object-cover rounded-lg shadow-md"
            />
          </div>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{agent.first_name} {agent.last_name}</h1>
            <h1 className="text-2xl font-bold mb-4">{agent.company_name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#7F7F7F]" />
              <span className="text-[#7F7F7F]">{agent.city}</span>
            </div>
            <div className="h-0.5 w-12 mb-8 bg-[#EE7953]"></div>
            <h2 className=' text-[#181818] mb-2 font-medium '>Overview</h2>
            <div className="grid grid-cols-2 gap-4 mb-6 md:mb-0">
              <div className="flex items-center gap-3">
                <img src={mail} alt="" className='w-7 h-7' />
                <article>
                <h3 className='text-[#181818] md:text-sm'>Mail Address</h3>
                <span className='text-[#7F7F7F] w-full truncate'>{agent.email}</span>
                </article>
              </div>
              <div className="flex items-center gap-3">
                <img src={phone} alt="" className='w-7 h-7' />
                <article>
                <h3 className='text-[#181818] md:text-sm'>Phone Number</h3>
                <span className='text-[#7F7F7F]'>{agent.phone_number}</span>
                </article>
              </div>
              <div className="flex items-center gap-3">
                <img src={location} alt="" className='w-7 h-7' />
                <article>
                <h3 className='text-[#181818] md:text-sm'>Location</h3>
                <span className='text-[#7F7F7F]'>{agent.city}</span>
                </article>
              </div>
              <div className="flex items-center gap-3">
                <img src={type} alt="" className='w-7 h-7' />
                <article>
                <h3 className='text-[#181818] md:text-sm'>Postcode</h3>
                <span className='text-[#7F7F7F]'>{agent.postcode}</span>
                </article>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsDetail;