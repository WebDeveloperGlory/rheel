import { Bath, Bed, Edit2, MapPin, MoreVertical, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

const PropertyCard = ({ property, onEdit, onDelete }) => {
    const [ showActions, setShowActions ] = useState( false );

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow relative">
        <div className="relative">
            <img
                src={ property.property_images[ 0 ] }
                alt="Property"
                className="w-full h-64 object-cover"
            />

            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                For { property.type }
            </div>

            <div className="absolute top-4 right-4">
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
            </div>
        </div>

        <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600 font-medium">{ property.location }</span>
            </div>

            <h3 className="text-2xl font-bold mb-4">N{ property.price }</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{ property.bedroom } Beds</span>
                </div>

                <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{ property.bathroom } Bath</span>
                </div>
    
                <div className="font-medium text-gray-600">{ property.type }</div>
            </div>
            <p className="text-gray-600 line-clamp-2">{ property.property_description }</p>
        </div>
    </div>
  )
}

export default PropertyCard