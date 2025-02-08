import PropertyCard from '../properties/PropertyCard'
import PropertySkeleton from '../skeletons/PropertySkeleton'

const PropertiesSection = ({ loading, properties }) => {
  return (
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
  )
}

export default PropertiesSection
