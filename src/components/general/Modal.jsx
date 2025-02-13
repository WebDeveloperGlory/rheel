import { X } from 'lucide-react';
import React from 'react'

const Modal = ({ show, onClose, isEditing, children }) => {
    if ( !show ) return null;
  
    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full md:w-[450px] max-w-2xl h-[90vh] flex flex-col">
                <div className="p-5 pb-0 flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                        {
                            isEditing 
                                ? 'Edit Property' 
                                : 'New Property'
                        }
                    </h2>
                    <button 
                        onClick={ onClose }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Modal