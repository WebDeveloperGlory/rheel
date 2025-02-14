import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bath, Bed, Sofa, MapPin, MoreVertical, Edit2, Trash2, Archive, ArchiveRestore } from 'lucide-react';

const PropertyCard = ({ property, onEdit, onDelete, onArchive, onUnarchive }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(price).replace('NGN', '₦');
  };
 
  const handleImageClick = (e) => {
    e.stopPropagation();
    navigate(`/properties/${property.id}`);
  };

  const isArchived = property.archived || false;
  const isDashboard = location.pathname === '/';

  return ( 
    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm border border-gray-100 shadow-sm">
      <div className="relative">
        <img
          src={property.property_images[0]}
          alt="Property"
          className="w-full h-44 object-cover cursor-pointer"
          onClick={handleImageClick}
        />
        <div className="absolute bottom-4 left-2 flex gap-2">
          <div className="flex items-center gap-2 bg-white md:px-1 px-3 py-2  md:py-1 rounded-full">
            <Sofa className="w-4 h-4" />
            <span className="text-[11px]">{property.living_room} Living</span>
          </div>
          <div className="flex items-center gap-1 bg-white md:px-1 py-2 px-4 md:py-1 rounded-full">
            <Bath className="w-4 h-4" />
            <span className="text-[11px]">{property.bathroom} Baths</span>
          </div>
          <div className="flex items-center gap-1 bg-white md:px-1 py-2 px-3 md:py-1 rounded-full">
            <Bed className="w-4 h-4" />
            <span className="text-[11px]">{property.bedroom} Beds</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start text-sm">
          <div>
            <div className="flex items-center gap-2  font-medium mb-2">
              <span className="inline-block w-2 h-2 bg-emerald-700 rounded-full"></span>
              {property.type}
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <MapPin className="w-5 h-5" />
              <span>{property.location}</span>
            </div>
            <div className=" text-[#FF5B19]">
              {formatPrice(property.price)}
            </div>
          </div>
          
          {/* Custom Dropdown Menu - Only show if not on dashboard */}
          {!isDashboard && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 bottom-16 mt-2 w-48 bg-white rounded-lg shadow-lg border cursor-pointer border-gray-100 md:py-1 z-10">
                  <button
                    onClick={() => {
                      onEdit(property);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  {isArchived ? (
                    <button
                      onClick={() => {
                        onUnarchive(property.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors text-blue-600"
                    >
                      <ArchiveRestore className="w-4 h-4" />
                      <span>Unarchive</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onArchive(property.id);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors text-yellow-600"
                    >
                      <Archive className="w-4 h-4" />
                      <span>Archive</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDelete(property.id);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50 transition-colors text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;