import React, { useState, useEffect } from 'react'
import TopSection from '../components/affiliates/TopSection'
import { getAgents } from '../api/agents/requests'
import { getAffiliates } from '../api/affiliates/requests'
import AffiliateMetrics from '../components/affiliates/AffiliateMetrics'
import AffiliatesTable from '../components/affiliates/AffiliatesTable'

const Affiliates = () => {
  const [agents, setAgents] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching agents...");
        const agentsData = await getAgents();
        console.log("Agents Data:", agentsData);
    
        console.log("Fetching affiliates...");
        const affiliatesData = await getAffiliates();
        console.log("Affiliates Data:", affiliatesData);
    
        setAgents(agentsData?.data || []);
        setAffiliates(Array.isArray(affiliatesData) ? affiliatesData : []);

      } catch (error) {
        console.error('Error fetching data: ', error);
        setAgents([]);
        setAffiliates([]);
      } finally {
        setLoading(false);
      }
    };
    
  
    if (loading) fetchData();
  }, [loading]);
  

  const affilateMetrics = [
    { name: 'Registered Agents', value: agents?.length ?? 0 },
    { name: 'Registered Affiliates', value: affiliates?.length ?? 0 },
  ];
  
  const handleEdit = (affiliate) => {
    // TODO: Implement edit functionality
    console.log('Edit affiliate:', affiliate);
  };

  const handleDelete = (affiliate) => {
    // TODO: Implement delete functionality
    console.log('Delete affiliate:', affiliate);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
  };

  return (
    <div className='p-4'> 
      <TopSection />
      <AffiliateMetrics metrics={affilateMetrics} />
      <button className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer mb-8'>
        Create New Affiliate
      </button>
      <AffiliatesTable 
        affiliates={affiliates}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Affiliates