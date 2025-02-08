import React, { useState, useEffect } from 'react'
import TopSection from '../components/affiliates/TopSection'
import { getAgents } from '../api/agents/requests'
import { getAffiliates } from '../api/affiliates/requests'
import AffiliateMetrics from '../components/affiliates/AffiliateMetrics'

const Affiliates = () => {
  const [agents, setAgents] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
    
  return (
    <div className='p-4'> 
        <TopSection />
        <AffiliateMetrics metrics={affilateMetrics} />

    </div>
  )
}

export default Affiliates