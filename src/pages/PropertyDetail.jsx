import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bath, Bed, MapPin } from 'lucide-react'
import { getPropertyById } from '../api/properties/requests'

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     const fetchProperty = async () => {
       const data = await getPropertyById(id);
       setProperty(data);
       setLoading(false);
     };
     fetchProperty();
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={property?.property_images[0]} 
              alt="Property" 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Property Details</h1>
            <p className="text-2xl text-[#FF5B19] mb-4">₦ {property?.price}</p>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#7F7F7F]" />
              <span className="text-[#7F7F7F]">{property?.location}</span>
            </div>
            <p className="text-gray-600 mb-6">{property?.property_description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-gray-600" />
                <span>{property?.bedroom} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-gray-600" />
                <span>{property?.bathroom} Bathrooms</span>
              </div>
            </div>

            {property?.amenities?.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FF5B19] rounded-full"></span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
