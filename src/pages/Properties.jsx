import React, { useEffect, useState } from 'react'
import { createProperty, deleteProperty, getProperties, updateProperty, archiveProperty, unarchiveProperty, getArchivedProperties } from '../api/properties/requests'
import { getAgents } from '../api/agents/requests'
import Modal from '../components/general/Modal'
import TopSection from '../components/properties/TopSection'
import PropertyMetrics from '../components/properties/PropertyMetrics'
import PropertyHeader from '../components/properties/PropertyHeader'
import PropertyCategories from '../components/properties/PropertyCategories'
import PropertyList from '../components/properties/PropertyList'
import { Loader2, AlertCircle } from 'lucide-react';
import Select from 'react-select';

const initialFormData = {
    type: "Sell",
    location: "",
    agent_id: "",
    property_availability: "",
    price: "",
    living_room: "1",
    bedroom: "1",
    bathroom: "1",
    finance: false,
    property_description: "",
    amenities: [],
    property_images: [],
    floor_plan: [], // Changed to array
    video_upload: [],

    property_type_id: ""
}

const PropertiesPage = () => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [properties, setProperties] = useState([]);
    const [agents, setAgents] = useState([]);
    const [activeCategory, setActiveCategory] = useState('active');
    const [formData, setFormData] = useState({ ...initialFormData });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refreshData, setRefreshData] = useState(0);
    const [newAmenity, setNewAmenity] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [propertiesResponse, agentsResponse] = await Promise.all([
                    activeCategory === 'active' ? getProperties() : getArchivedProperties(),
                    getAgents()
                ]);

                if (isMounted) {
                    setProperties(propertiesResponse?.data || []);
                    setAgents(agentsResponse?.data || []);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data. Please try again later.');
                    setProperties([]);
                    setAgents([]);
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
    }, [activeCategory, refreshData]);

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
            existingImages: property.property_images || [],
            existingFloorPlans: Array.isArray(property.floor_plan) ? property.floor_plan : [property.floor_plan],
            existingVideo: property.video_upload,
            property_images: [],
            floor_plan: [],
            video_upload: [],
            property_availability: property.property_availability?.slice(0, 10) || '', // Ensure date is in YYYY-MM-DD format
            amenities: property.amenities || [] // Ensure amenities are set
        });
    
        setShowModal(true);
    };;

    const handleDelete = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                setLoading(true);
                const response = await deleteProperty(propertyId);
                if (response && response.status) {
                    // Update local state immediately after successful deletion
                    setProperties(currentProperties =>
                        currentProperties.filter(property => property.id !== propertyId)
                    );
                    window.alert('Property deleted successfully');
                } else {
                    window.alert('Failed to delete property');
                }
            } catch (error) {
                console.error('Error deleting property:', error);
                window.alert('Error deleting property');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleArchive = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to archive this property?')) {
            try {
                setLoading(true);
                const response = await archiveProperty(propertyId);
                if (response && response.status) {
                    window.alert('Property archived successfully');
                    // Trigger a refresh instead of just setting loading
                    setRefreshData(prev => prev + 1);
                } else {
                    window.alert('Failed to archive property');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error archiving property:', error);
                window.alert('Error archiving property');
                setLoading(false);
            }
        }
    };

    const handleUnarchive = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to unarchive this property?')) {
            try {
                setLoading(true);
                const response = await unarchiveProperty(propertyId);
                if (response && response.status) {
                    window.alert('Property unarchived successfully');
                    // Trigger a refresh instead of just setting loading
                    setRefreshData(prev => prev + 1);
                } else {
                    window.alert('Failed to unarchive property');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error unarchiving property:', error);
                window.alert('Error unarchiving property');
                setLoading(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
                [name]: Array.from(files)
            }
        ));
    };

    const validateForm = () => {
        const errors = {};
    
        // Basic field validation
        if (!formData.location) errors.location = 'Location is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.property_description) errors.property_description = 'Description is required';
        if (!formData.property_availability) errors.property_availability = 'Availability date is required';
        if (formData.amenities.length === 0) errors.amenities = 'At least one amenity is required';
    
        // Media validation
        if (!isEditing && formData.property_images.length === 0) {
            errors.property_images = 'At least one property image is required';
        }
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            window.alert('Please fix the form errors before submitting');
            return;
        }

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

            // Only append new files if they exist
            if (formData.property_images.length > 0) {
                formData.property_images.forEach(file => {
                    updatedFormData.append('property_images', file);
                });
            }

            if (formData.floor_plan.length > 0) {
                formData.floor_plan.forEach(file => {
                    updatedFormData.append('floor_plan', file);
                });
            }

            if (formData.video_upload.length > 0) {
                formData.video_upload.forEach(file => {
                    updatedFormData.append('video_upload', file);
                });
            }

            let response;
            if (isEditing) {
                response = await updateProperty(editingId, updatedFormData);
            } else {
                response = await createProperty(updatedFormData);
            }

            if (response?.status) {
                setRefreshData(prev => prev + 1);
                closeModal();
            } else {
                setSubmitError(response?.error || 'An error occurred while saving the property');
            }
        } catch (error) {
            console.error('Error saving property:', error);
            setSubmitError(error.response?.data?.message || 'An error occurred while saving the property');
        } finally {
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setEditingId(null);
        setFormData({ ...initialFormData });
        setFormErrors({});
        setSubmitError(null);
    };

    const renderMediaPreview = (item, type = 'image') => {
        if (!item) return null;

        // Handle both File objects and URLs
        const isFile = item instanceof File;
        const url = isFile ? URL.createObjectURL(item) : item;

        if (type === 'image') {
            return (
                <img
                    src={url}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                    onLoad={() => isFile && URL.revokeObjectURL(url)}
                />
            );
        } else {
            return (
                <video
                    src={url}
                    className="w-full h-full object-cover rounded"
                    onLoad={() => isFile && URL.revokeObjectURL(url)}
                />
            );
        }
    };

    const isFormValid = () => {
        if (isEditing) {
            // When editing, just ensure required fields have values
            // Include existing media in the validation
            return (
                formData.location &&
                formData.price &&
                formData.property_description &&
                formData.amenities.length > 0 &&
                formData.property_availability &&
                (formData.property_images.length > 0 || formData.existingImages?.length > 0)
            );
        } else {
            // For new properties, require all fields including new uploads
            return (
                formData.location &&
                formData.price &&
                formData.property_description &&
                formData.property_images.length > 0 &&
                formData.amenities.length > 0 &&
                formData.property_availability
            );
        }
    };

    const renderError = (fieldName) => {
        if (!formErrors[fieldName]) return null;
        return (
            <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{formErrors[fieldName]}</span>
            </div>
        );
    };

        // Define options for amenities
const amenitiesOptions = [
    { value: 'Swimming Pool', label: 'Swimming Pool' },
    { value: 'Elevator', label: 'Elevator' },
    { value: 'Cinema', label: 'Cinema' },
    { value: 'Gym', label: 'Gym' },
    { value: 'Roof Top', label: 'Roof Top' },
    { value: 'Smart Home', label: 'Smart Home' },
    { value: 'Outdoor Lounge', label: 'Outdoor Lounge' },
    { value: 'Playground', label: 'Playground' },
    { value: 'Internet', label: 'Internet' },
];

const propertyTypes = [
    { id: 1, type: 'Duplex' },
    { id: 2, type: 'Terrace' },
    { id: 3, type: 'Bungalow' },
    { id: 4, type: 'Apartments' },
    { id: 5, type: 'Commercial' },
    { id: 6, type: 'Carcass' },
    { id: 7, type: 'Land' },
    { id: 8, type: 'JV Land'}
    // Add more property types as needed
];

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
                activeCategory={activeCategory}
            />

            {/* Modal */}
            <Modal onClose={closeModal} isEditing={isEditing} show={showModal}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            <p>{submitError}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <label className="block text-[14px] font-medium text-[#383E49]">
                            Property Images {isEditing ? '(Optional)' : '*'}
                        </label>
                        <div className="flex justify-center items-start gap-5 flex-wrap">
    <div className="border border-dashed border-[#9D9D9D] w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer">
        {/* Add a scrollable container for previews */}
        <div className="absolute inset-0 p-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-1">
                {/* Show existing images */}
                {formData.existingImages?.slice(0, 20).map((url, index) => (
                    <div key={`existing-${index}`} className="relative w-full aspect-square">
                        {renderMediaPreview(url, 'image')}
                    </div>
                ))}
                {/* Show new uploads */}
                {formData.property_images.slice(0, 20).map((file, index) => (
                    <div key={`new-${index}`} className="relative w-full aspect-square">
                        {renderMediaPreview(file, 'image')}
                    </div>
                ))}
            </div>
        </div>
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
    </div>
</div>
                        {renderError('property_images')}
                    </div>

                    <div className="flex justify-between items-center gap-5">
                        <label className="block text-[14px] font-medium text-[#383E49]">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                        >
                            <option value="Sell" className=''>Sell</option>
                            <option value="Lease">Lease</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-center gap-5">
                        <label className="block text-[14px] font-medium text-[#383E49]">
                            Location
                        </label>
                        <div className="w-[60%]">
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className={`w-full border ${formErrors.location ? 'border-red-500' : 'border-[#858D9D]'} text-[#858D9D] text-[14px] rounded-lg p-2 outline-none`}
                                placeholder="Enter property location"
                            />
                            {renderError('location')}
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-5">
                        <label className="block text-[14px] font-medium text-[#383E49]">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                            placeholder="Enter property price"
                            min="0"
                        />
                        {renderError('price')}
                    </div>

                    <div className="flex justify-between items-center gap-5">
                        <label className="block text-[14px] font-medium text-[#383E49]">Agent</label>
                        <select
                            name="agent_id"
                            value={formData.agent_id}
                            onChange={handleInputChange}
                            className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                        >
                            <option value="">Select Agent</option>
                            {agents.map(agent => (
                                <option key={agent.id} value={agent.id}>
                                    {agent.first_name} {agent.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between items-center gap-5">
    <label className="block text-[14px] font-medium text-[#383E49]">Property Type</label>
    <select
        name="property_type_id"
        value={formData.property_type_id}
        onChange={handleInputChange}
        className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
    >
        <option value="">Select Property Type</option>
        {propertyTypes.map(propertyType => (
            <option key={propertyType.id} value={propertyType.id}>
                {propertyType.type}
            </option>
        ))}
    </select>
</div>

                    <div className="flex justify-between items-center gap-5">
    <label className="block text-[14px] font-medium text-[#383E49]">Available From</label>
    <input
        type="date"
        className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
        name="property_availability"
        value={formData.property_availability}
        onChange={handleInputChange}
    />
    {renderError('property_availability')}
</div>

                    <div className="grid grid-cols-3 gap-4">
                        {
                            ["living_room", "bedroom", "bathroom"].map(field => (
                                <div key={field} className="flex justify-between items-center gap-1">
                                    <label className="block text-[12px] font-medium text-[#383E49]">
                                        {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </label>
                                    <select
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                                    >
                                        {
                                            [...Array(field === 'living_room' ? 5 : 10)].map((_, i) => (
                                                <option key={i + 1} value={String(i + 1)} className='cursor-pointer'>{i + 1}</option>
                                            ))
                                        }
                                        <option value={field === 'living_room' ? '5+' : '10+'}>{field === 'living_room' ? '5+' : '10+'}</option>
                                    </select>
                                </div>
                            ))
                        }
                    </div>

                    <div className="flex justify-between items-center gap-5">
                     <label className="block text-[14px] font-medium text-[#383E49]">Finance</label>
                     <select
                       name="finance"
                       value={formData.finance ? "YES" : "NO"}
                       onChange={(e) => setFormData({ ...formData, finance: e.target.value === "YES" })}
                       className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                     >
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                     </select>
                    </div>

                    {/* Amenities Input */}
                    <div className="space-y-2">
                      <label className="block text-[14px] font-medium text-[#383E49]">Amenities</label>
                      <Select
                       isMulti
                       name="amenities"
                       options={amenitiesOptions}
                       className="w-full border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                       classNamePrefix="select"
                       value={amenitiesOptions.filter(option => formData.amenities.includes(option.value))}
                       onChange={(selectedOptions) => setFormData({ ...formData, amenities: selectedOptions.map(option => option.value) })}
                      />
                    </div>

                    <div className="flex justify-between items-start">
                        <label className="block text-[12px] font-medium text-[#383E49]">Property Description</label>
                        <textarea
                            name="property_description"
                            value={formData.property_description}
                            onChange={handleInputChange}
                            className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 h-32 outline-none"
                            placeholder="Enter property description"
                        />
                        {renderError('property_description')}
                    </div>

                    {/* Video Upload */}
                    <div className="space-y-2 bg-[#F1F1F1] p-2">
                        <label className="block text-[14px] font-medium text-[#383E49]">Virtual Tour</label>
                        <div className="flex justify-center items-start gap-5">
                            <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer">
                                {/* Show existing video */}
                                {formData.existingVideo && (
                                    <div className="absolute inset-0">
                                        {renderMediaPreview(formData.existingVideo, 'video')}
                                    </div>
                                )}
                                {/* Show new video upload */}
                                {formData.video_upload.length > 0 && (
                                    <div className="absolute inset-0">
                                        {renderMediaPreview(formData.video_upload[0], 'video')}
                                    </div>
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
                        {renderError('video_upload')}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2 bg-[#F1F1F1] p-2">
                        <label className="block text-[14px] font-medium text-[#383E49]">Floor Plan</label>
                        <div className="flex justify-center items-start gap-5">
                            <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="grid grid-cols-2 gap-1 absolute inset-0 p-2">
                                    {/* Show existing floor plans */}
                                    {formData.existingFloorPlans?.slice(0, 4).map((url, index) => (
                                        <div key={`existing-${index}`} className="relative w-full h-full">
                                            {renderMediaPreview(url, 'image')}
                                        </div>
                                    ))}
                                    {/* Show new floor plan uploads */}
                                    {formData.floor_plan.slice(0, 4).map((file, index) => (
                                        <div key={`new-${index}`} className="relative w-full h-full">
                                            {renderMediaPreview(file, 'image')}
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="file"
                                    name="floor_plan"
                                    accept="image/*"
                                    multiple
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleVideoAndFloorPlanChange}
                                />
                            </div>
                            <div className='w-[100px]'>
                                <p className="text-[12px] text-[#858D9D]">Drop images here or click to upload</p>
                                <p className="text-xs text-[#80D3A1] mt-1">Supported formats: jpg, png</p>
                            </div>
                        </div>
                        {renderError('floor_plan')}
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={isSubmitting}
                            className="px-5 py-2  cursor-pointer text-[14px] text-[#858D9D] disabled:opacity-50"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 bg-[#4DA981] text-white rounded-lg  cursor-pointer disabled:opacity-60 text-[14px] flex items-center gap-2"
                            disabled={isSubmitting || !isFormValid()}
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