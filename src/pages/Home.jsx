import React, { useEffect, useState } from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import users from '../assets/images/users.png'
import vector from '../assets/images/Vector.png'
import { getProperties } from '../api/properties/requests'
import TopSection from '../components/home/TopSection'
import UserMetrics from '../components/home/UserMetrics'
import PropertyOutline from '../components/home/PropertyOutline'
import RecentSignups from '../components/home/RecentSignups'
import PropertiesSection from '../components/home/PropertiesSection'

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchData();
  }, [loading]);

  const userMetrics = [
    { name: 'Active Properties', value: properties.length, image: house },
    { name: 'Registered Agents', value: 12, image: agent },
    { name: 'Registered Users', value: 210, image: users },
  ];

  const propertyOutlineData = [
    { value: properties.length, name: 'Registered', icon: vector, backgroundColor: '#3579F6' },
    { value: properties.filter(property => property.type === 'Sell').length, name: 'For Sale', icon: vector, backgroundColor: '#719BA3' },
    { value: properties.filter(property => property.type === 'Lease').length, name: 'For Lease', icon: vector, backgroundColor: '#53A551' },
    { value: 278, name: 'Archived', icon: vector, backgroundColor: '#CB444A' }
  ];

  const signupData = [
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
  ];

  return (
    <div className='p-5'>
      <TopSection />
      <UserMetrics metrics={userMetrics} />
      
      <div className="md:flex gap-5">
        <PropertyOutline data={propertyOutlineData} />
        <RecentSignups data={signupData} />
      </div>

      <PropertiesSection loading={loading} properties={properties} />
    </div>
  );
}

export default HomePage;
