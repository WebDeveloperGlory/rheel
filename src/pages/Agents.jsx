import React, { useState, useEffect } from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import { getAgents, createAgent } from '../api/agents/requests'
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

  return (
    <div className='p-5'>
      <TopSection />
      <AgentMetrics metrics={agentMetrics} />
      <AgentsList agents={agents} loading={loading} show={() => setShowModal(true)} />
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