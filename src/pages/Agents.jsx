import React, { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import { getAgents } from '../api/agents/requests'
import { getProperties } from '../api/properties/requests'

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getAgents();
            setAgents(data.data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching agents: ', error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) fetchData();
  }, [loading])

  useEffect(() => {
    const fetchPropertyData = async () => {
        try {
            const data = await getProperties();
            setProperties(data.data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching properties: ', error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) fetchPropertyData();
  }, [loading])

  const agentMetrics = [
    { name: 'No. of Properties', value: properties.length, image: house },
    { name: 'Registered Agents', value: agents.length, image: agent },
  ]

  return (
    <div className='p-5'>
      {/* Top Section */}
      <div className='flex justify-between p-5 bg-white items-center rounded-lg mb-8'>
        <h2 className='font-bold text-2xl'>Agents</h2>
        <div className="relative hidden md:block">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* Agent Metrics */}
      <div className='flex gap-5 flex-wrap mb-8'>
        {agentMetrics.map((data, index) => (
          <div key={index} className='bg-white flex items-center rounded-xl w-full md:w-[49%] justify-between p-5 text-[#23272E]'>
            <article>
              <h3 className='font-bold text-[13px] mb-2'>{data.name}</h3>
              <h1 className='font-bold text-2xl'>{data.value}</h1>
            </article>
            <img src={data.image} alt="" className='w-[30px]' />
          </div>
        ))}
      </div>

      {/* Agents List */}
      <div>
        <h3 className='font-bold mb-2 text2xl'>Agents</h3>
        <ul className='flex text-[#181818] font-medium gap-5 items-center md:text-[14px] mb-8'>
            <li>By Latest</li>
            <li>By Properties</li>
        </ul>

        <div className="flex flex-wrap gap-[20px]">
        {agents.map((agent, index) => (
            <div
             key={index}
             className='bg-white p-5 rounded-lg w-full shadow-md'
            >
                <img src={agent.logo} alt="" className='w-full mx-auto h-44 object-cover mb-5  rounded-xl' />
                <h2 className='text-[#181A1B] text-xl font-medium mb-6'>{agent.company_name}</h2>
                <div className='h-2 rounded-lg w-17 bg-[#2D68A2] mb-5'></div>

            </div>
        ))}
        </div>
      </div>



    </div>
  )
}

export default Agents