import React, { useEffect, useState } from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import users from '../assets/images/users.png'
import vector from '../assets/images/Vector.png'
import { getProperties, getArchivedProperties } from '../api/properties/requests'
import { getAgents } from '../api/agents/requests'
import { getUsers } from '../api/users/requests'
import TopSection from '../components/home/TopSection'
import UserMetrics from '../components/home/UserMetrics'
import PropertyOutline from '../components/home/PropertyOutline'
import RecentSignups from '../components/home/RecentSignups'
import PropertiesSection from '../components/home/PropertiesSection'
import { getSignups } from '../api/signups/requests'

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [archivedProperties, setArchivedProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [signups, setSignups] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsData, propertiesData, archivedPropertiesData, signupsData, usersData] = await Promise.all([
          getAgents(),
          getProperties(),
          getArchivedProperties(),
          getSignups(),
          getUsers()
        ]);

        setAgents(agentsData?.data || []);
        setProperties(propertiesData?.data || []);
        setArchivedProperties(archivedPropertiesData?.data || []);
        setSignups(signupsData?.data || []);
        setUsers(usersData?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAgents([]);
        setProperties([]);
        setArchivedProperties([]);
        setSignups([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchData();
  }, [loading]);

  const userMetrics = [
    { name: 'Active Properties', value: properties.length, image: house },
    { name: 'Registered Agents', value: agents.length, image: agent },
    { name: 'Registered Users', value: users.length, image: users },
  ];

  const propertyOutlineData = [
    { value: properties.length, name: 'Registered', icon: vector, backgroundColor: '#3579F6' },
    { value: properties.filter(property => property.type === 'Sell').length, name: 'For Sale', icon: vector, backgroundColor: '#719BA3' },
    { value: properties.filter(property => property.type === 'Lease').length, name: 'For Lease', icon: vector, backgroundColor: '#53A551' },
    { value: archivedProperties.length, name: 'Archived', icon: vector, backgroundColor: '#CB444A' }
  ];

  {/*const signupData = [
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
  ]; */}

  return (
    <div className='p-4'>
      <TopSection />
      <UserMetrics metrics={userMetrics} />
      
      <div className="md:flex gap-4">
        <PropertyOutline data={propertyOutlineData} />
        <RecentSignups data={signups} loading={loading} />
      </div>

      <PropertiesSection loading={loading} properties={properties} archivedProperties={archivedProperties} />
    </div>
  );
};

export default HomePage;
