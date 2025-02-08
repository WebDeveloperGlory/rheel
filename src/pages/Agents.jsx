import React, { useState, useEffect } from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import { getAgents } from '../api/agents/requests'
import { getProperties } from '../api/properties/requests'
import TopSection from '../components/agents/TopSection'
import AgentMetrics from '../components/agents/AgentMetrics'
import AgentsList from '../components/agents/AgentsList' 

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsData, propertiesData] = await Promise.all([
          getAgents(),
          getProperties()
        ]);
        setAgents(agentsData.data);
        setProperties(propertiesData.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchData();
  }, [loading]);

  const agentMetrics = [
    { name: 'No. of Properties', value: properties.length, image: house },
    { name: 'Registered Agents', value: agents.length, image: agent },
  ];

  return (
    <div className='p-5'>
      <TopSection />
      <AgentMetrics metrics={agentMetrics} />
      <AgentsList agents={agents} loading={loading} />
    </div>
  );
}

export default Agents