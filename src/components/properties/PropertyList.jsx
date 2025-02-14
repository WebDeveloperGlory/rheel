import PropertyCard from './PropertyCard'
import PropertySkeleton from '../skeletons/PropertySkeleton'

const PropertyList = ({ loading, error, properties, onArchive, onUnarchive, onEdit, onDelete, activeCategory }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, index) => (
          <PropertySkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        <p>{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        <p>No {activeCategory} properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          onEdit={onEdit}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      ))}
    </div>
  );
};

export default PropertyList
