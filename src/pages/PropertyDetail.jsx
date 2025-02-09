import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bath, Bed, MapPin } from 'lucide-react'
import { getPropertyById } from '../api/properties/requests'
import PropertySkeleton from '../components/skeletons/PropertySkeleton'
import ImageSlider from '../components/product detail/ImageSlider'
import bed from '../assets/images/bed.png'
import bath from '../assets/images/bath.png'
import type from '../assets/images/type.png'

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        if (response?.data) {
          setProperty(response.data);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg p-6">
          <PropertySkeleton />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Property not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
           <ImageSlider images={property.property_images} />
          </div>
          <div>
            <p className="text-2xl text-[#181818] font-bold mb-2">
              ₦ {formatPrice(property.price)}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#7F7F7F]" />
              <span className="text-[#7F7F7F]">{property.location}</span>
            </div>
            <div className="h-0.5 w-12 mb-8 bg-[#EE7953]"></div>
            <h2 className='text-xl text-[#181818] mb-2 font-medium '>Overview</h2>
            <p className="text-gray-600 mb-6">{property.property_description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-5">
                <img src={bed} alt="" />
                <article>
                <h3 className='text-[#181818]'>Bedrooms</h3>
                <span className='text-[#7F7F7F]'>{property.bedroom}</span>
                </article>
              </div>
              <div className="flex items-center gap-5">
                <img src={bath} alt="" />
                 <article>
                 <h3 className='text-[#181818]'>Bathrooms</h3>
                 <span className='text-[#7F7F7F]'>{property.bathroom}</span>
                 </article>
              </div>
              <div className="flex items-center gap-5">
                <img src={type} alt="" />
                 <article>
                 <h3 className='text-[#181818]'>Type</h3>
                 <span className='text-[#7F7F7F]'>{property.type}</span>
                 </article>
              </div>
              <div className="flex items-center gap-5">
                <img src={type} alt="" />
                 <article>
                 <h3 className='text-[#181818]'>Living Room</h3>
                 <span className='text-[#7F7F7F]'>{property.living_room}</span>
                 </article>
              </div>
              
            </div>

            {property.amenities?.length > 0 && (
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
