import PropertyCard from './PropertyCard'
import PropertySkeleton from '../skeletons/PropertySkeleton'

const PropertyList = ({ loading, properties, onArchive, onUnarchive, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {loading ? (
        Array(8).fill(0).map((_, index) => (
          <PropertySkeleton key={index} />
        ))
      ) : (
        properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
          />
        ))
      )}
    </div>
  )
}

export default PropertyList
