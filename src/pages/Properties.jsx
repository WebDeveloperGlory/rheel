import React, { useEffect, useState, useRef } from 'react';
import { createProperty, deleteProperty, getProperties, updateProperty, archiveProperty, unarchiveProperty, getArchivedProperties } from '../api/properties/requests';
import { getAgents } from '../api/agents/requests';
import Modal from '../components/general/Modal';
import TopSection from '../components/properties/TopSection';
import PropertyMetrics from '../components/properties/PropertyMetrics';
import PropertyHeader from '../components/properties/PropertyHeader';
import PropertyCategories from '../components/properties/PropertyCategories';
import PropertyList from '../components/properties/PropertyList';
import { Loader2, AlertCircle, Upload, X, Plus, MapPin, DollarSign, Calendar, Home, User, FileText, Video, Image as ImageIcon } from 'lucide-react';

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
    floor_plan: [],
    video_upload: [],
    property_type_id: ""
};

// Custom Amenities Input Component
const AmenitiesInput = ({ value, onChange, suggestions = [] }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputValue) {
            const filtered = suggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
                !value.includes(suggestion)
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [inputValue, suggestions, value]);

    const handleAddAmenity = (amenity) => {
        if (amenity && !value.includes(amenity)) {
            onChange([...value, amenity]);
            setInputValue('');
            setShowSuggestions(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmedValue = inputValue.trim();
            if (trimmedValue) {
                handleAddAmenity(trimmedValue);
            }
        }
    };

    const removeAmenity = (indexToRemove) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="relative">
            <div className="min-h-[42px] border border-gray-300 rounded-lg p-2 focus-within:border-[#4DA981] focus-within:ring-1 focus-within:ring-[#4DA981] transition-colors">
                <div className="flex flex-wrap gap-1 mb-1">
                    {value.map((amenity, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-[#4DA981]/10 text-[#4DA981] rounded-md text-sm"
                        >
                            {amenity}
                            <button
                                type="button"
                                onClick={() => removeAmenity(index)}
                                className="hover:bg-[#4DA981]/20 rounded-full p-0.5"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => inputValue && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={value.length === 0 ? "Type amenities and press Enter" : "Add more..."}
                    className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
                />
            </div>
            
            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleAddAmenity(suggestion)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm text-gray-700"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

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
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({
        images: {},
        video: 0,
        floorPlans: {}
    });

    // Predefined amenities suggestions
    const amenitiesSuggestions = [
        'Swimming Pool', 'Elevator', 'Cinema', 'Gym', 'Roof Top', 
        'Smart Home', 'Outdoor Lounge', 'Playground', 'Internet',
        'Parking', 'Security', 'Garden', 'Balcony', 'Air Conditioning',
        'Laundry', 'Storage', 'Pet Friendly', 'Furnished'
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
    ];

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
            existingFloorPlans: Array.isArray(property.floor_plan) ? property.floor_plan : [property.floor_plan].filter(Boolean),
            existingVideo: property.video_upload,
            property_images: [],
            floor_plan: [],
            video_upload: [],
            property_availability: property.property_availability?.slice(0, 10) || '',
            amenities: property.amenities || []
        });
    
        setShowModal(true);
    };

    const handleDelete = async (propertyId) => {
        if (!propertyId) return;

        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                setLoading(true);
                const response = await deleteProperty(propertyId);
                if (response && response.status) {
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
        
        const newProgress = { ...uploadProgress.images };
        files.forEach(file => {
            newProgress[file.name] = 0;
        });
        setUploadProgress(prev => ({
            ...prev,
            images: newProgress
        }));
    };

    const handleVideoAndFloorPlanChange = (e) => {
        const { name, files } = e.target;
        const fileArray = Array.from(files);

        setFormData(prev => ({
            ...prev,
            [name]: fileArray
        }));

        if (name === 'video_upload') {
            setUploadProgress(prev => ({
                ...prev,
                video: 0
            }));
        } else if (name === 'floor_plan') {
            const newProgress = { ...uploadProgress.floorPlans };
            fileArray.forEach(file => {
                newProgress[file.name] = 0;
            });
            setUploadProgress(prev => ({
                ...prev,
                floorPlans: newProgress
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
    
        if (!formData.location) errors.location = 'Location is required';
        if (!formData.price) errors.price = 'Price is required';
        if (!formData.property_description) errors.property_description = 'Description is required';
        if (!formData.property_availability) errors.property_availability = 'Availability date is required';
    
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

            const updateProgress = (type, _, progress) => {
                setUploadProgress(prev => {
                    switch (type) {
                        case 'property_images':
                            return {
                                ...prev,
                                images: Object.fromEntries(
                                    formData.property_images.map(file => [file.name, progress])
                                )
                            };
                        case 'video_upload':
                            return {
                                ...prev,
                                video: progress
                            };
                        case 'floor_plan':
                            return {
                                ...prev,
                                floorPlans: Object.fromEntries(
                                    formData.floor_plan.map(file => [file.name, progress])
                                )
                            };
                        default:
                            return prev;
                    }
                });
            };

            let response;
            if (isEditing) {
                response = await updateProperty(editingId, updatedFormData, updateProgress);
            } else {
                response = await createProperty(updatedFormData, updateProgress);
            }

            if (response?.status) {
                setRefreshData(prev => prev + 1);
                setUploadProgress({
                    images: {},
                    video: 0,
                    floorPlans: {}
                });
                closeModal();
            } else {
                throw new Error('Failed to save property');
            }
        } catch (error) {
            console.error('Error saving property:', error);
            setSubmitError(error.message);
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
        setUploadProgress({
            images: {},
            video: 0,
            floorPlans: {}
        });
    };

    const renderMediaPreview = (item, type = 'image') => {
        if (!item) return null;

        const isFile = item instanceof File;
        const url = isFile ? URL.createObjectURL(item) : item;

        return type === 'image' ? (
            <img
                src={url}
                alt="Preview"
                className="w-full h-full object-cover rounded"
                onLoad={() => isFile && URL.revokeObjectURL(url)}
            />
        ) : (
            <video
                src={url}
                controls
                className="w-full h-full object-cover rounded"
                onLoad={() => isFile && URL.revokeObjectURL(url)}
            />
        );
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

    const FileUploadBox = ({ name, onChange, accept, multiple = false, children, hasFiles = false }) => (
        <div className={`relative border-2 border-dashed rounded-xl p-6 text-center hover:border-[#4DA981] hover:bg-[#4DA981]/5 transition-all cursor-pointer ${hasFiles ? 'border-[#4DA981] bg-[#4DA981]/5' : 'border-gray-300'}`}>
            <input
                type="file"
                name={name}
                accept={accept}
                multiple={multiple}
                onChange={onChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {children}
        </div>
    );

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

            {/* Enhanced Modal */}
            <Modal onClose={closeModal} isEditing={isEditing} show={showModal}>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            <p className="text-sm">{submitError}</p>
                        </div>
                    )}

                    {/* Property Images Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-gray-600" />
                            <label className="text-sm font-medium text-gray-700">
                                Property Images {isEditing ? '(Optional)' : '*'}
                            </label>
                        </div>
                        
                        <FileUploadBox 
                            name="property_images"
                            accept="image/*" 
                            multiple 
                            onChange={handleFileChange}
                            hasFiles={formData.property_images.length > 0 || formData.existingImages?.length > 0}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-1">Drop images here or click to upload</p>
                            <p className="text-xs text-gray-400">Supports: JPG, PNG (Max 10MB each)</p>
                        </FileUploadBox>

                        {/* Image Previews */}
                        {(formData.existingImages?.length > 0 || formData.property_images.length > 0) && (
                            <div className="grid grid-cols-4 gap-2 mt-3">
                                {formData.existingImages?.slice(0, 8).map((url, index) => (
                                    <div key={`existing-${index}`} className="aspect-square rounded-lg overflow-hidden border">
                                        {renderMediaPreview(url, 'image')}
                                    </div>
                                ))}
                                {formData.property_images.slice(0, 8).map((file, index) => (
                                    <div key={`new-${index}`} className="aspect-square rounded-lg overflow-hidden border">
                                        {renderMediaPreview(file, 'image')}
                                    </div>
                                ))}
                            </div>
                        )}

                        {Object.keys(uploadProgress.images).length > 0 && (
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-[#4DA981] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.max(...Object.values(uploadProgress.images))}%` }}
                                />
                            </div>
                        )}
                        {renderError('property_images')}
                    </div>

                    {/* Form Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm"
                            >
                                <option value="Sell">Sell</option>
                                <option value="Lease">Lease</option>
                            </select>
                        </div>

                        {/* Property Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Property Type</label>
                            <select
                                name="property_type_id"
                                value={formData.property_type_id}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm"
                            >
                                <option value="">Select Property Type</option>
                                {propertyTypes.map(propertyType => (
                                    <option key={propertyType.id} value={propertyType.id}>
                                        {propertyType.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={`w-full border ${formErrors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm`}
                            placeholder="Enter property location"
                        />
                        {renderError('location')}
                    </div>

                    {/* Price and Agent */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Price *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className={`w-full border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm`}
                                placeholder="Enter price"
                                min="0"
                            />
                            {renderError('price')}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Agent
                            </label>
                            <select
                                name="agent_id"
                                value={formData.agent_id}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm"
                            >
                                <option value="">Select Agent</option>
                                {agents.map(agent => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.first_name} {agent.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Available From */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Available From *
                        </label>
                        <input
                            type="date"
                            name="property_availability"
                            value={formData.property_availability}
                            onChange={handleInputChange}
                            className={`w-full border ${formErrors.property_availability ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm`}
                        />
                        {renderError('property_availability')}
                    </div>

                    {/* Room Details */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700">Room Details</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {["living_room", "bedroom", "bathroom"].map(field => (
                                <div key={field} className="space-y-2">
                                    <label className="text-xs font-medium text-gray-600">
                                        {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </label>
                                    <select
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm"
                                    >
                                        {[...Array(field === 'living_room' ? 5 : 10)].map((_, i) => (
                                            <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
                                        ))}
                                        <option value={field === 'living_room' ? '5+' : '10+'}>
                                            {field === 'living_room' ? '5+' : '10+'}
                                        </option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Finance Option */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Finance Available</label>
                        <select
                            name="finance"
                            value={formData.finance ? "YES" : "NO"}
                            onChange={(e) => setFormData({ ...formData, finance: e.target.value === "YES" })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm"
                        >
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>

                    {/* Enhanced Amenities Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Amenities *
                        </label>
                        <AmenitiesInput
                            value={formData.amenities}
                            onChange={(amenities) => setFormData({ ...formData, amenities })}
                            suggestions={amenitiesSuggestions}
                        />
                        {renderError('amenities')}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Property Description *
                        </label>
                        <textarea
                            name="property_description"
                            value={formData.property_description}
                            onChange={handleInputChange}
                            className={`w-full border ${formErrors.property_description ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 h-24 focus:border-[#4DA981] focus:ring-1 focus:ring-[#4DA981] outline-none text-sm resize-none`}
                            placeholder="Describe the property features, location benefits, etc."
                        />
                        {renderError('property_description')}
                    </div>

                    {/* Media Uploads Section */}
                    <div className="space-y-6 bg-gray-50 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Additional Media</h3>
                        
                        {/* Virtual Tour */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <Video className="w-4 h-4" />
                                Virtual Tour (Optional)
                            </label>
                            <FileUploadBox 
                                name="video_upload"
                                accept="video/*" 
                                onChange={handleVideoAndFloorPlanChange}
                                hasFiles={formData.video_upload.length > 0 || formData.existingVideo}
                            >
                                <Video className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 mb-1">Drop video here or click to upload</p>
                                <p className="text-xs text-gray-400">Supports: MP4, AVI (Max 50MB)</p>
                            </FileUploadBox>

                            {/* Video Preview */}
                            {(formData.existingVideo || formData.video_upload.length > 0) && (
                                <div className="mt-3">
                                    <div className="w-32 h-20 rounded-lg overflow-hidden border bg-gray-100">
                                        {formData.video_upload.length > 0 
                                            ? renderMediaPreview(formData.video_upload[0], 'video')
                                            : renderMediaPreview(formData.existingVideo, 'video')
                                        }
                                    </div>
                                </div>
                            )}

                            {/* Video Progress */}
                            {uploadProgress.video > 0 && (
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-[#4DA981] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress.video}%` }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Floor Plans */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                Floor Plans (Optional)
                            </label>
                            <FileUploadBox 
                                name="floor_plan"
                                accept="image/*" 
                                multiple 
                                onChange={handleVideoAndFloorPlanChange}
                                hasFiles={formData.floor_plan.length > 0 || formData.existingFloorPlans?.length > 0}
                            >
                                <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 mb-1">Drop floor plans here or click to upload</p>
                                <p className="text-xs text-gray-400">Supports: JPG, PNG (Max 10MB each)</p>
                            </FileUploadBox>

                            {/* Floor Plan Previews */}
                            {(formData.existingFloorPlans?.length > 0 || formData.floor_plan.length > 0) && (
                                <div className="grid grid-cols-4 gap-2 mt-3">
                                    {formData.existingFloorPlans?.slice(0, 4).map((url, index) => (
                                        <div key={`existing-floor-${index}`} className="aspect-square rounded-lg overflow-hidden border">
                                            {renderMediaPreview(url, 'image')}
                                        </div>
                                    ))}
                                    {formData.floor_plan.slice(0, 4).map((file, index) => (
                                        <div key={`new-floor-${index}`} className="aspect-square rounded-lg overflow-hidden border">
                                            {renderMediaPreview(file, 'image')}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Floor Plan Progress */}
                            {Object.keys(uploadProgress.floorPlans).length > 0 && (
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-[#4DA981] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${Math.max(...Object.values(uploadProgress.floorPlans), 0)}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={closeModal}
                            disabled={isSubmitting}
                            className="px-6 py-2 text-gray-600 text-sm cursor-pointer hover:text-gray-800 font-medium disabled:opacity-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-[#4DA981] hover:bg-[#4DA981]/90 text-sm cursor-pointer text-white rounded-lg font-medium disabled:opacity-60 flex items-center gap-2 transition-colors"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {isEditing ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                <>
                                    {isEditing ? 'Update Property' : 'Create Property'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PropertiesPage;