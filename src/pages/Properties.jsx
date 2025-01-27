import React, { useEffect, useState } from 'react'
import { Plus, Upload } from 'lucide-react'
import PropertyCard from '../components/properties/PropertyCard';
import Modal from '../components/general/Modal';
import { getProperties } from '../api/properties/requests';

const initialProperties = [
    {
        id: 1,
        location: "Durumi",
        price: "40,000,000",
        bedroom: "1",
        bathroom: "1",
        type: "Apartments",
        property_description: "Luxury 1 Bedroom Apartment for Sale - Durumi, Abuja An exquisite and spacious luxury apartment",
        property_images: ["/api/placeholder/400/300"],
        status: "For Sale"
    },
    {
        id: 2,
        location: "Jabi Lake, Abuja",
        price: "65,000,000",
        bedroom: "2",
        bathroom: "2",
        type: "Villa",
        property_description: "Stunning lakefront villa with panoramic views",
        property_images: ["/api/placeholder/400/300"],
        status: "For Sale"
    }
];
const initialFormData = {
    type: "Sell",
    location: "",
    agent_id: 0,
    property_availability: "",
    price: "",
    living_room: "1",
    bedroom: "1",
    bathroom: "1",
    finance: false,
    property_description: "",
    amenities: [],
    property_images: [],
    floor_plan: [],
    video_upload: []
}

const PropertiesPage = () => {
    const [ loading, setLoading ] = useState( true );
    const [ showModal, setShowModal ] = useState( false );
    const [ isEditing, setIsEditing ] = useState( false );
    const [ editingId, setEditingId ] = useState( null );
    const [ properties, setProperties ] = useState([ ...initialProperties ]);
    const [ formData, setFormData ] = useState({ ...initialFormData });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProperties();
            console.log( data );
            setLoading( false );
        }

        if( loading ) fetchData();
    }, [ loading ])

    const handleEdit = ( property ) => {
        setIsEditing( true );
        setEditingId( property.id );
        setFormData({
          ...formData,
          ...property
        });
        setShowModal( true );
    };
    
    const handleDelete = ( id ) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            setProperties( properties.filter( p => p.id !== id ) );
        }
    };
    
    const handleInputChange = ( e ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [ name ]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log({ ...formData, id: Date.now() })
        if ( isEditing ) {
            setProperties( properties.map( p => 
                p.id === editingId ? { ...p, ...formData } : p
            ) );
        } else {
            setProperties([ ...properties, { ...formData, id: Date.now() } ]);
        }
        closeModal();
    };
    
    const closeModal = () => {
        setShowModal( false );
        setIsEditing( false );
        setEditingId( null );
        setFormData({ ...initialFormData });
    };
  return (
    <div className="p-4">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500">Manage your properties</p>
            </div>
            <button
                onClick={ () => setShowModal( true ) }
                className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
            >
                <Plus className="w-4 h-4" /> Add Property
            </button>
        </div>

        {/* Properties List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                properties && properties.map( property => (
                    <PropertyCard
                        key={ property.id }
                        property={ property }
                        onEdit={ handleEdit }
                        onDelete={ handleDelete }
                    />
                ))
            }
        </div>

        {/* Modal */}
        <Modal onClose={ closeModal } isEditing={ isEditing } show={ showModal }>
            <form onSubmit={ handleSubmit } className="p-6 space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={ formData.type }
                        onChange={ handleInputChange }
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                    >
                        <option value="Sell">Sell</option>
                        <option value="Lease">Lease</option>
                    </select>
                </div>

                <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    value={ formData.location }
                    onChange={ handleInputChange }
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter property location"
                />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={ formData.price }
                        onChange={ handleInputChange }
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter property price"
                        min="0"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {
                        ["living_room", "bedroom", "bathroom"].map( field => (
                            <div key={ field } className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    { field.split('_').map( word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
                                </label>
                                <select
                                    name={ field }
                                    value={ formData[ field ] }
                                    onChange={ handleInputChange }
                                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                                >
                                    {
                                        [ ...Array( field === 'living_room' ? 5 : 10 ) ].map( ( _, i ) => (
                                            <option key={i + 1} value={String(i + 1)} className='cursor-pointer'>{i + 1}</option>
                                        ))
                                    }
                                    <option value={ field === 'living_room' ? '5+' : '10+' }>{ field === 'living_room' ? '5+' : '10+' }</option>
                                </select>
                            </div>
                        ))
                    }
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="finance"
                        checked={ formData.finance }
                        onChange={ handleInputChange }
                        className="w-4 h-4 cursor-pointer"
                    />
                    <label>Financing Available</label>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="property_description"
                        value={ formData.property_description }
                        onChange={ handleInputChange }
                        className="w-full border rounded-lg p-3 h-32 focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter property description"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Images</label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={ closeModal }
                        className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        { isEditing ? 'Save Changes' : 'Add Property' }
                    </button>
                </div>
            </form>
        </Modal>
    </div>
  )
}

export default PropertiesPage