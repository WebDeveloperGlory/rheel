import React, { useState, useEffect } from 'react'
import TopSection from '../components/affiliates/TopSection'
import { getAgents } from '../api/agents/requests'
import { getAffiliates, createAffliate } from '../api/affiliates/requests'
import AffiliateMetrics from '../components/affiliates/AffiliateMetrics'
import AffiliatesTable from '../components/affiliates/AffiliatesTable'
import AffiliatesModal from '../components/affiliates/AffiliatesModal'

const initialFormState = {
  first_name: '',
  last_name: '',
  phone_number: '',
  property_count: '',
  value: '',
  status: '',
  payment_status: '',
}

const Affiliates = () => {
  const [agents, setAgents] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const agentsData = await getAgents();
        const affiliatesData = await getAffiliates();
    
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createAffliate(formData);
      if (response && response.status) {
        window.alert('Affiliate created successfully');
        setLoading(true);
        handleCloseModal();
      } else {
        window.alert(response.error || 'Failed to create affiliate');
      }
    } catch (error) {
      console.error('Error creating affiliate:', error);
      window.alert('Error creating affiliate');
    } finally {
      setIsSubmitting(false);
    }
  };


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
      <button 
       className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer mb-8'
       onClick={() => setShowModal(true)}
      >
        Create New Affiliate
      </button>
      <AffiliatesTable 
        affiliates={affiliates}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AffiliatesModal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default Affiliates