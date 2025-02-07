import { Bath, Bed, Edit2, MapPin, MoreVertical, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

const PropertyCard = ({ property, onEdit, onDelete }) => {
    const [ showActions, setShowActions ] = useState( false );

  return (
    <div className="bg-white rounded-2xl overflow-hidden pt-3 md:w-[230px] cursor-pointer border border-[#F4F4F4] relative">
        <div className="relative">
            <img
                src={ property.property_images[ 0 ] }
                alt="Property"
                className="w-[90%] mx-auto h-44 object-cover  rounded-xl"
            />


            {/*<div className="absolute top-4 right-4">
                <button 
                    onClick={ () => setShowActions( !showActions ) }
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {
                    showActions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 border">
                            <button
                                onClick={() => {
                                    onEdit( property );
                                    setShowActions( false );
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Property
                            </button>
                            <button
                                onClick={() => {
                                    onDelete( property.id );
                                    setShowActions( false );
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" /> Delete Property
                            </button>
                        </div>
                    )
                }
            </div> */}
        </div>

        <div className="p-3 ">
            <h1 className='text-[#181818] font-bold text-xl mb-2'>Property Name</h1>
            <h3 className="text-[15px]  text-[#FF5B19] mb-2">₦ { property.price }</h3>
            <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-[#7F7F7F]" />
                <span className="text-[#7F7F7F] text-[14px]">{ property.location }</span>
            </div>
        </div>
    </div>
  )
}

export default PropertyCard