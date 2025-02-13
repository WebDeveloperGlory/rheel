import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { getPropertyById } from '../api/properties/requests'
import ImageSlider from '../components/product detail/ImageSlider'
import bed from '../assets/images/bed.png'
import bath from '../assets/images/bath.png'
import type from '../assets/images/type.png'
import year from '../assets/images/year.png'

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
      <div className="loader-container">
        <div className="flex items-center justify-center w-full h-[700px]">
          <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full text-[#EE7953]"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

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
    <div className="p-4 md:py-[80px]">
      <div className="bg-white rounded-lg p-3 md:mx-auto md:w-[800px] border border-[#F4F4F4]">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8">
          <div>
           <ImageSlider images={property.property_images} />
          </div>
          <div className='pt-3'>
            <p className="text-2xl text-[#181818] font-bold mb-2">
              ₦ {formatPrice(property.price)}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#7F7F7F]" />
              <span className="text-[#7F7F7F] md:text-[13px]">{property.location}</span>
            </div>
            <div className="h-0.5 w-10 mb-5 bg-[#EE7953]"></div>
            <h2 className='text-[16px] text-[#181818] mb-2 font-light'>Overview</h2>
            {/*<p className="text-gray-600 mb-6">{property.property_description}</p> */}
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-5">
                <img src={bed} alt="" className='w-8 h-8' />
                <article>
                <h3 className='text-[#181818] text-[14px] font-light'>Bedrooms</h3>
                <span className='text-[#7F7F7F] text-[14px] '>{property.bedroom}</span>
                </article>
              </div>
              <div className="flex items-center gap-5">
                <img src={type} alt="" className='w-8 h-8'  />
                 <article>
                 <h3 className='text-[#181818] text-[14px] font-light'>Type</h3>
                 <span className='text-[#7F7F7F] text-[14px] '>{property.type}</span>
                 </article>
              </div>
              <div className="flex items-center gap-5 ">
                <img src={bath} alt="" className='w-8 h-8'  />
                 <article className='text-[#FF5B19]' >
                 <h3 className='text-[#181818] text-[14px] font-light'>Bathrooms</h3>
                 <span className='text-[#7F7F7F] text-[14px] '>{property.bathroom}</span>
                 </article>
              </div>
              <div className="flex items-center gap-5">
                <img src={type} alt="" className='w-8 h-8'  />
                 <article>
                 <h3 className='text-[#181818] text-[14px] font-light'>Living Room</h3>
                 <span className='text-[#7F7F7F] text-[14px] '>{property.living_room}</span>
                 </article>
              </div>
              <div className="flex items-center gap-5">
                <img src={year} alt="" className='w-8 h-8'  />
                 <article>
                 <h3 className='text-[#181818] text-[14px] font-light'>Available From</h3>
                 <span className='text-[#7F7F7F] text-[14px] '>{formatDate(property.property_availability)}</span>
                 </article>
              </div> 
              
            </div>

            {/*{property.amenities?.length > 0 && (
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
            )}*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
