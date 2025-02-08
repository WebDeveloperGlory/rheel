import React, { useEffect, useState } from 'react'
import { createProperty, deleteProperty, getProperties, updateProperty } from '../api/properties/requests'
import Modal from '../components/general/Modal'
import TopSection from '../components/properties/TopSection'
import PropertyMetrics from '../components/properties/PropertyMetrics'
import PropertyHeader from '../components/properties/PropertyHeader'
import PropertyCategories from '../components/properties/PropertyCategories'
import PropertyList from '../components/properties/PropertyList'

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
    const [ isEditing, setIsEditing ] = useState( false );
    const [ editingId, setEditingId ] = useState( null );
    const [ properties, setProperties ] = useState([]);
    const [ formData, setFormData ] = useState({ ...initialFormData });

    const [ newAmenity, setNewAmenity ] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProperties();
            setProperties( data.data );
            console.log( data )
            setLoading( false );
        }

        if( loading ) fetchData();
    }, [ loading ])

    

    const handleEdit = ( property ) => {
        setIsEditing( true );
        setEditingId( property.id );
        setFormData({
          ...formData,
            ...property,
            property_images: [],
            floor_plan: null,
            video_upload: [],
            property_availability: property.property_availability.slice(0, 16)
        });
        setShowModal( true );
    };
    
    const handleDelete = async ( id ) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            const data = await deleteProperty( id );
            if( data.status ) {
                console.log('Property deleted successfully: ', data.message );
                window.alert('Property deleted successfully');
                setLoading( true );
            } else {
                window.alert('An Error Occurred');
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

        // Create a new FormData object
        const updatedFormData = new FormData();

        // Append all key-value pairs from the object
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

        // Handle amenities (Array of strings)
        updatedFormData.append("amenities", JSON.stringify(formData.amenities));

        // Handle property images (Array of files)
        formData.property_images.forEach((file, index) => {
            updatedFormData.append(`property_images`, file);
        });

        // Handle floor plans (Array of files)
        updatedFormData.append(`floor_plan`, formData.floor_plan);

        // Handle video uploads (Array of files)
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
            // Check if its an edit or create request
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
    };
    
    const closeModal = () => {
        setShowModal( false );
        setIsEditing( false );
        setEditingId( null );
        setFormData({ ...initialFormData });
    };

  return (
    <div className="p-4">
      <TopSection />
      <PropertyMetrics properties={properties} />
      <PropertyHeader onCreateProperty={() => setShowModal(true)} />
      <PropertyCategories />
      <PropertyList 
        loading={loading}
        properties={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal onClose={closeModal} isEditing={isEditing} show={showModal}>
        <form onSubmit={ handleSubmit } className="p-6 space-y-6">

        <div className="space-y-4">
                <label className="block text-[14px] font-medium text-[#383E49]">Property Image</label>
                <div className="flex justify-center items-start gap-5">
                <div
                    className="border border-dashed border-[#9D9D9D] w-[100px] h-[100px] rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative"
                    onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
                >
                    
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-[full] h-full opacity-0 cursor-pointer"
                        onChange={ handleFileChange }
                        multiple
                    />
                </div>
                <div className='w-[100px]'>
                <p className="text-[12px] text-[#858D9D]">Drop files here or click to upload</p>
                <p className="text-xs text-[#80D3A1] mt-1">Maximum file size: 10MB</p>
                </div>
                </div>

                {formData.property_images.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-[14px] font-medium text-[#383E49]">Uploaded Files</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                            {formData.property_images.map((file, index) => (
                                <li key={index}>
                                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
                <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        name="video_upload"
                        accept="video/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={ handleVideoAndFloorPlanChange }
                        multiple
                    />
                </div>
                <div className='w-[100px]'>
                <p className="text-[12px] text-[#858D9D]">Drop videos here or click to upload</p>
                <p className="text-xs text-[#80D3A1] mt-1">Supported formats: mp4, avi</p>
                </div>
                </div>
                {formData.video_upload.length > 0 && (
                    <ul className="space-y-1 mt-2 text-sm text-[#383E49]">
                        {formData.video_upload.map((video, index) => (
                            <li key={index}>{video.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2 bg-[#F1F1F1] p-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Floor Plan</label>
                <div className="flex justify-center items-start gap-5">
                <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        name="floor_plan"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={ handleVideoAndFloorPlanChange }
                    />
                </div>
                <div className='w-[100px]'>
                <p className="text-[12px] text-[#858D9D]">Drop an image here or click to upload</p>
                <p className="text-xs text-[#80D3A1] mt-1">Supported formats: jpg, png</p>
                </div>
                </div>
                {formData.floor_plan && (
                    <div className="mt-2 text-sm text-[#383E49]">
                        Uploaded Image: { formData.floor_plan.name }
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
                <button
                    type="button"
                    onClick={ closeModal }
                    className="px-5 py-2  cursor-pointer text-[14px] text-[#858D9D]"
                >
                    Discard
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 bg-[#4DA981] text-white rounded-lg  cursor-pointer disabled:opacity-60 text-[14px]"
                    disabled={ !formData.location || !formData.price || !formData.property_description || !formData.property_images.length || !formData.amenities.length || !formData.property_availability }
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