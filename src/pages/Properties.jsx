import React, { useEffect, useState } from 'react'
import { createProperty, deleteProperty, getProperties, updateProperty, archiveProperty, unarchiveProperty, getArchivedProperties } from '../api/properties/requests'
import Modal from '../components/general/Modal'
import TopSection from '../components/properties/TopSection'
import PropertyMetrics from '../components/properties/PropertyMetrics'
import PropertyHeader from '../components/properties/PropertyHeader'
import PropertyCategories from '../components/properties/PropertyCategories'
import PropertyList from '../components/properties/PropertyList'
import { Loader2 } from 'lucide-react';
 
const initialFormData = {
    type: "Sell",
    location: "",
    agent_id: 3,
    property_availability: "",
    price: "",
    living_room: "1",
    bedroom: "1",
    bathroom: "1",
    finance: false,
    property_description: "",
    amenities: [],
    property_images: [],
    floor_plan: null,
    video_upload: [],

    property_type_id: 4
}

const PropertiesPage = () => {
    const [ loading, setLoading ] = useState( true );
    const [ showModal, setShowModal ] = useState( false );
    const [error, setError] = useState(null);
    const [ isEditing, setIsEditing ] = useState( false );
    const [ editingId, setEditingId ] = useState( null );
    const [ properties, setProperties ] = useState([]);
    const [activeCategory, setActiveCategory] = useState('active');
    const [ formData, setFormData ] = useState({ ...initialFormData });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [ newAmenity, setNewAmenity ] = useState("");

    useEffect(() => {
        let isMounted = true;
    
        const fetchData = async () => {
          try {
            setLoading(true);
            setError(null);
            
            const response = activeCategory === 'active' 
              ? await getProperties()
              : await getArchivedProperties();
    
            if (isMounted && response?.data) {
              setProperties(response.data);
            } else if (isMounted) {
              setProperties([]);
              setError('No properties found');
            }
          } catch (error) {
            if (isMounted) {
              console.error('Error fetching properties:', error);
              setError('Failed to fetch properties. Please try again later.');
              setProperties([]);
            }
          } finally {
            if (isMounted) {
              setLoading(false);
            }
          }
        };
    
        fetchData();
    
        return () => {
          isMounted = false;
        };
      }, [activeCategory]);

      const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setLoading(true);
        setError(null);
      };
    

    const handleEdit = (property) => {
        if (!property) return;
        
        setIsEditing(true);
        setEditingId(property.id);
        setFormData({
            ...formData,
            ...property,
            property_images: [], // Reset images since we can't edit them
            floor_plan: null,
            video_upload: [],
            property_availability: property.property_availability?.slice(0, 16) || ''
        });
        setShowModal(true);
    };
    
    const handleDelete = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                const response = await deleteProperty(propertyId);
                if (response && response.status) {
                    window.alert('Property deleted successfully');
                    setLoading(true); // Refresh the list
                } else {
                    window.alert('Failed to delete property');
                }
            } catch (error) {
                console.error('Error deleting property:', error);
                window.alert('Error deleting property');
            }
        }
    };

    const handleArchive = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to archive this property?')) {
            try {
                const response = await archiveProperty(propertyId);
                if (response && response.status) {
                    window.alert('Property archived successfully');
                    setLoading(true); // Refresh the list
                } else {
                    window.alert('Failed to archive property');
                }
            } catch (error) {
                console.error('Error archiving property:', error);
                window.alert('Error archiving property');
            }
        }
    };

    const handleUnarchive = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to unarchive this property?')) {
            try {
                const response = await unarchiveProperty(propertyId);
                if (response && response.status) {
                    window.alert('Property unarchived successfully');
                    setLoading(true); // Refresh the list
                } else {
                    window.alert('Failed to unarchive property');
                }
            } catch (error) {
                console.error('Error unarchiving property:', error);
                window.alert('Error unarchiving property');
            }
        }
    };
    
    const handleInputChange = ( e ) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [ name ]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, property_images: [...formData.property_images, ...files] });
    };

    const handleVideoAndFloorPlanChange = (e) => {
        const { name, files } = e.target;

        setFormData(prev => (
            { 
                ...prev, 
                [name]: name === "video_upload" 
                    ? Array.from( files ) 
                    : files[ 0 ] 
            }
        ));
    };
    

    const handleAddAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity)) {
            setFormData({
                ...formData,
                amenities: [...formData.amenities, newAmenity],
            });
            setNewAmenity(""); // Clear input
        }
    };

    const handleRemoveAmenity = (amenity) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.filter((a) => a !== amenity),
        });
    };
    
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updatedFormData = new FormData();

            updatedFormData.append("type", formData.type);
            updatedFormData.append("location", formData.location);
            updatedFormData.append("agent_id", formData.agent_id);
            updatedFormData.append("property_availability", formData.property_availability);
            updatedFormData.append("price", formData.price);
            updatedFormData.append("living_room", formData.living_room);
            updatedFormData.append("bedroom", formData.bedroom);
            updatedFormData.append("bathroom", formData.bathroom);
            updatedFormData.append("finance", formData.finance);
            updatedFormData.append("property_description", formData.property_description);
            updatedFormData.append("property_type_id", formData.property_type_id);

            updatedFormData.append("amenities", JSON.stringify(formData.amenities));

            formData.property_images.forEach((file, index) => {
                updatedFormData.append(`property_images`, file);
            });

            updatedFormData.append(`floor_plan`, formData.floor_plan);

            formData.video_upload.forEach((file, index) => {
                updatedFormData.append(`video_upload`, file);
            });

            if ( isEditing ) {
                const data = await updateProperty( editingId, updatedFormData );
                if( data.status ) {
                    console.log('Property edited successfully: ', data );
                    window.alert('Property edited successfully');
                    setLoading( true );
                } else {
                    window.alert('An Error Occurred');
                }  
            } else { 
                setProperties([ ...properties, { ...formData, id: Date.now() } ]);
                const data = await createProperty( updatedFormData );
                if( data.status ) {
                    console.log('Property created successfully: ', data );
                    window.alert('Property created successfully');
                    setLoading( true );
                } else {
                    window.alert('An Error Occurred');
                }    
            }
            closeModal();
        } catch (error) {
            console.error('Error:', error);
            window.alert('An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const closeModal = () => {
        setShowModal( false );
        setIsEditing( false );
        setEditingId( null );
        setFormData({ ...initialFormData });
    };

    const renderPreview = (file, type) => {
        if (!file) return null;
        
        if (type === 'image') {
            return (
                <img 
                    src={URL.createObjectURL(file)} 
                    alt="Preview" 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
            );
        }
        
        if (type === 'video') {
            return (
                <video 
                    src={URL.createObjectURL(file)} 
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
            );
        }
    };

  return (
    <div className="p-4">
      <TopSection />
      <PropertyMetrics properties={properties} />
      <PropertyHeader onCreateProperty={() => setShowModal(true)} />
      <PropertyCategories
       activeCategory={activeCategory}
       onCategoryChange={handleCategoryChange}
      />
      <PropertyList 
        loading={loading}
        properties={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onUnarchive={handleUnarchive}
        error={error}
      />

      {/* Modal */}
      <Modal onClose={closeModal} isEditing={isEditing} show={showModal}>
        <form onSubmit={ handleSubmit } className="p-6 space-y-6">

        <div className="space-y-4">
                <label className="block text-[14px] font-medium text-[#383E49]">Property Images</label>
                <div className="flex justify-center items-start gap-5 flex-wrap">
                    <div className="border border-dashed border-[#9D9D9D] w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer">
                        {formData.property_images.length > 0 && (
                            <div className="grid grid-cols-2 gap-1 absolute inset-0 p-2">
                                {formData.property_images.slice(0, 4).map((file, index) => (
                                    <div key={index} className="relative w-full h-full">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover rounded"
                                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                            multiple
                        />
                    </div>
                    <div className='w-[100px]'>
                        <p className="text-[12px] text-[#858D9D]">Drop files here or click to upload</p>
                        <p className="text-xs text-[#80D3A1] mt-1">Maximum file size: 10MB</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-5">
                <label className="block text-[14px] font-medium text-[#383E49]">Property Type</label>
                <select
                    name="type"
                    value={ formData.type }
                    onChange={ handleInputChange }
                    className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                >
                    <option value="Sell" className=''>Sell</option>
                    <option value="Lease">Lease</option>
                </select>
            </div>

            <div className="flex justify-between items-center gap-5">
                <label className="block text-[14px] font-medium text-[#383E49]">Location</label>
                <input
                    type="text"
                    name="location"
                    value={ formData.location }
                    onChange={ handleInputChange }
                    className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                    placeholder="Enter property location"
                />
            </div>

            <div className="flex justify-between items-center gap-5">
                <label className="block text-[14px] font-medium text-[#383E49]">Price</label>
                <input
                    type="number"
                    name="price"
                    value={ formData.price }
                    onChange={ handleInputChange }
                    className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                    placeholder="Enter property price"
                    min="0"
                />
            </div>

            <div className="flex justify-between items-center gap-5">
                <label className="block text-[14px] font-medium text-[#383E49]">Available From</label>
                {/* <input
                    type="number"
                    name="price"
                    value={ formData.price }
                    onChange={ handleInputChange }
                    className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                    placeholder="Enter property price"
                    min="0"
                /> */}
                <input 
                    type="datetime-local" 
                    className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                    name="property_availability"
                    value={ formData.property_availability }
                    onChange={ handleInputChange}
                />
            </div>

            <div className="grid grid-cols-3 gap-4">
                {
                    ["living_room", "bedroom", "bathroom"].map( field => (
                        <div key={ field } className="flex justify-between items-center gap-1">
                            <label className="block text-[12px] font-medium text-[#383E49]">
                                { field.split('_').map( word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }
                            </label>
                            <select
                                name={ field }
                                value={ formData[ field ] }
                                onChange={ handleInputChange }
                                className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
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
                <label className="block text-[14px] font-medium text-[#383E49]">Financing Available</label>
            </div>

                {/* Amenities Input */}
                <div className="space-y-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Amenities</label>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        className="flex-1 border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                        placeholder="Add an amenity"
                    />
                    <button
                        onClick={handleAddAmenity}
                        type="button"
                        className="px-4 py-2 bg-[#4DA981] text-white rounded-lg cursor-pointer  transition"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-1 mt-2 text-sm text-[#383E49]">
                    {formData.amenities.map((amenity, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between border rounded-lg px-3 py-2"
                        >
                            <span>{amenity}</span>
                            <button
                                onClick={() => handleRemoveAmenity( amenity ) }
                                type="button"
                                className="text-red-500 hover:underline text-xs"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex justify-between items-start">
                <label className="block text-[12px] font-medium text-[#383E49]">Property Description</label>
                <textarea
                    name="property_description"
                    value={ formData.property_description }
                    onChange={ handleInputChange }
                    className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 h-32 outline-none"
                    placeholder="Enter property description"
                />
            </div>

            

            {/* Video Upload */}
            <div className="space-y-2 bg-[#F1F1F1] p-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Virtual Tour</label>
                <div className="flex justify-center items-start gap-5">
                    <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer">
                        {formData.video_upload.length > 0 && (
                            <video
                                src={URL.createObjectURL(formData.video_upload[0])}
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                        )}
                        <input
                            type="file"
                            name="video_upload"
                            accept="video/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleVideoAndFloorPlanChange}
                        />
                    </div>
                    <div className='w-[100px]'>
                        <p className="text-[12px] text-[#858D9D]">Drop videos here or click to upload</p>
                        <p className="text-xs text-[#80D3A1] mt-1">Supported formats: mp4, avi</p>
                    </div>
                </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2 bg-[#F1F1F1] p-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Floor Plan</label>
                <div className="flex justify-center items-start gap-5">
                    <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer">
                        {formData.floor_plan && (
                            <img
                                src={URL.createObjectURL(formData.floor_plan)}
                                alt="Floor Plan Preview"
                                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                        )}
                        <input
                            type="file"
                            name="floor_plan"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleVideoAndFloorPlanChange}
                        />
                    </div>
                    <div className='w-[100px]'>
                        <p className="text-[12px] text-[#858D9D]">Drop an image here or click to upload</p>
                        <p className="text-xs text-[#80D3A1] mt-1">Supported formats: jpg, png</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={ closeModal }
                    disabled={isSubmitting}
                    className="px-5 py-2  cursor-pointer text-[14px] text-[#858D9D] disabled:opacity-50"
                >
                    Discard
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 bg-[#4DA981] text-white rounded-lg  cursor-pointer disabled:opacity-60 text-[14px] flex items-center gap-2"
                    disabled={isSubmitting || !formData.location || !formData.price || !formData.property_description || !formData.property_images.length || !formData.amenities.length || !formData.property_availability }
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {isEditing ? 'Saving...' : 'Creating...'}
                        </>
                    ) : (
                        isEditing ? 'Save Changes' : 'Add Property'
                    )}
                </button>
            </div>
        </form>
      </Modal>
    </div>
  )
}

export default PropertiesPage