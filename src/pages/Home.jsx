import React, { useEffect, useState } from 'react'
import house from '../assets/images/house.png'
import agent from '../assets/images/agent.png'
import users from '../assets/images/users.png'
import vector from '../assets/images/Vector.png'
import { Bell, EllipsisVertical } from 'lucide-react'
import { getProperties } from '../api/properties/requests'
import PropertyCard from '../components/properties/PropertyCard'
import PropertySkeleton from '../components/skeletons/PropertySkeleton';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Declare loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data.data);
        console.log(data);
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

  const data = [
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
    { date: '15-08-2024', name: 'KANIKA', phone: '123456789', email: '22@GMAIL.COM' },
  ];

  return (
    <div className='p-5'>
      {/* Top Section */}
      <div className='flex justify-between p-5 bg-white items-center rounded-lg  mb-8'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <div className="relative hidden md:block">
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
      </div>

      {/* User Metrics */}
      <div className='flex gap-5 flex-wrap mb-8'>
        {userMetrics.map((data, index) => (
          <div key={index} className='bg-white flex items-center rounded-xl w-full md:w-[338px] justify-between p-5 text-[#23272E]'>
            <article>
              <h3 className='font-bold text-[13px] mb-2'>{data.name}</h3>
              <h1 className='font-bold text-2xl'>{data.value}</h1>
            </article>
            <img src={data.image} alt="" className='w-[30px]' />
          </div>
        ))}
      </div>

      <div className="md:flex gap-5">
        {/* Property Outline */}
      <div className='bg-white p-5 rounded-lg mb-8 md:w-[480px]'>
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-xl md:text-[14px] font-semibold text-[#23272E]'>Properties Outline</h2>
          <EllipsisVertical className='w-6 h-6 text-[#4B465C]' />
        </div>
        <div className="flex flex-col gap-5">
          {propertyOutlineData.map((data, index) => (
            <div key={index} className='flex items-center justify-between rounded-lg p-5 md:p-3 text-white' style={{ backgroundColor: data.backgroundColor }}>
              <article>
                <h2 className='text-2xl font-bold mb-2'>{data.value}</h2>
                <p>{data.name}</p>
              </article>
              <img src={data.icon} alt="" className='md:w-[30px]' />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sign Up */}
      <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-[14px] font-semibold">Recent Sign Up</h2>
        <button className="text-blue-500 md:text-[14px] hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-[14px]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mail Address
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500">
                  {row.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="text-sm text-gray-700">
          Showing 1 to 10 of 37 rows
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                page === 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#A5C2F9] text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
      </div>

      {/* Properties Section */}
      <div className='bg-white rounded-lg p-5'>
        <h1 className='font-bold mb-5'>Properties</h1>
        <ul className='flex text-[#181818] md:text-[14px] items-center gap-5 mb-7 cursor-pointer'>
          <li>Recommended</li>
          <li>Popular</li>
          <li>Nearest</li>
        </ul>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {loading ? (
            Array(8).fill(0).map((_, index) => (
              <PropertySkeleton key={index} />
            ))
          ) : (
            properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
