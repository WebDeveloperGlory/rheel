import { Bath, Bed, Edit2, MapPin, MoreVertical, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    navigate(`/properties/${property.id}`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden pt-3 md:w-[230px] cursor-pointer border border-[#F4F4F4] relative">
      <div className="relative">
        <img
          src={property.property_images[0]}
          alt="Property"
          className="w-[90%] mx-auto h-44 object-cover rounded-xl hover:opacity-90 transition-opacity"
          onClick={handleImageClick}
        />
      </div>

      <div className="p-3 ">
        <h1 className='text-[#181818] font-bold text-xl mb-2'>Property Name</h1>
        <h3 className="text-[15px]  text-[#FF5B19] mb-2">₦ {formatPrice(property.price)}</h3>
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-[#7F7F7F]" />
          <span className="text-[#7F7F7F] text-[14px]">{ property.location }</span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard