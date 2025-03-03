import React, { useState, useEffect } from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import { getAgents, createAgent, deleteAgent } from '../api/agents/requests'
import { getProperties } from '../api/properties/requests'
import TopSection from '../components/agents/TopSection'
import AgentMetrics from '../components/agents/AgentMetrics'
import AgentsList from '../components/agents/AgentsList' 
import AgentsModal from '../components/agents/AgentsModal'

const initialFormState = {
  first_name: '',
  last_name: '',
  company_name: '',
  phone_number: '',
  email: '',
  logo: '',
  city: '',
  postcode: '',
}

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortMethod, setSortMethod] = useState('latest');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await createAgent(formData);
      if (response && response.status) {
        window.alert('Agent created successfully');
        setLoading(true);
        handleCloseModal();
      } else {
        window.alert(response.error || 'Failed to create agent');
      }
    } catch (error) {
      console.error('Error creating agent:', error);
      window.alert('Error creating agent');
    } finally {
      setIsSubmitting(false);
    }
  }; 

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
  };

  const agentMetrics = [
    { name: 'No. of Properties', value: properties.length, image: house },
    { name: 'Registered Agents', value: agents.length, image: agent },
  ];

  const handleDelete = async (agentId) => {
    const agentProperties = properties.filter(property => property.agent_id === agentId);
    if (agentProperties.length > 0) {
      window.alert('Cannot delete agents currently assigned to a property');
      return;
    }

    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        const data = await deleteAgent(agentId);
        if (data.status) {
          window.alert('Agent deleted successfully');
          setLoading(true);
        } else {
          window.alert('An Error Occurred');
        }
      } catch (error) {
        console.error('Error deleting agent:', error);
        window.alert('An Error Occurred');
      }
    }
  };

  // Count properties for each agent
  const agentsWithPropertyCount = agents.map(agent => ({
    ...agent,
    properties: properties.filter(property => property.agent_id === agent.id).length
  }));

  // Sort agents based on the selected sort method
  const sortedAgents = [...agentsWithPropertyCount].sort((a, b) => {
    if (sortMethod === 'latest') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortMethod === 'properties') {
      return b.properties - a.properties;
    }
    return 0;
  });

  return (
    <div className='p-5'>
      <TopSection />
      <AgentMetrics metrics={agentMetrics} />
      <AgentsList agents={sortedAgents} loading={loading} show={() => setShowModal(true)} onDelete={handleDelete} sortMethod={sortMethod} setSortMethod={setSortMethod}/>
      <AgentsModal
       show={showModal}
       onClose={handleCloseModal}
       onSubmit={handleSubmit}
       formData={formData}
       onChange={handleInputChange}
       isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Agents