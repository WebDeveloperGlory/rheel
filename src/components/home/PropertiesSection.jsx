import { useState } from 'react';
import PropertyCard from '../properties/PropertyCard';
import PropertySkeleton from '../skeletons/PropertySkeleton';

const PropertiesSection = ({ loading, properties, archivedProperties }) => {
  const [selectedTab, setSelectedTab] = useState('Active');

  const displayedProperties = selectedTab === 'Active' ? properties : archivedProperties;

  return (
    <div className='bg-white rounded-lg p-5'>
      <h1 className='font-bold mb-2'>Properties</h1>
      <ul className='flex text-[#181818] md:text-[13px] font-light items-center gap-3 mb-5 cursor-pointer'>
        <li 
          className={`cursor-pointer ${selectedTab === 'Active' ? 'text-[#FF5B19] font-bold' : ''}`}
          onClick={() => setSelectedTab('Active')}
        >
          Active
        </li>
        <li 
          className={`cursor-pointer ${selectedTab === 'Archived' ? 'text-[#FF5B19] font-bold' : ''}`}
          onClick={() => setSelectedTab('Archived')}
        >
          Archived
        </li>
      </ul>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {loading ? (
          Array(8).fill(0).map((_, index) => (
            <PropertySkeleton key={index} />
          ))
        ) : displayedProperties.length > 0 ? (
          displayedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No properties available</p>
        )}
      </div>
    </div>
  );
};

export default PropertiesSection;
