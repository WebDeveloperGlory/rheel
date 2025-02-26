import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import Modal from '../general/Modal';

const PropertyFormModal = ({
    show,
    onClose,
    onSubmit,
    formData = {},
    onChange,
    handleFileChange,
    handleVideoAndFloorPlanChange,
    handleAddAmenity,
    handleRemoveAmenity,
    isSubmitting,
    isEditing,
    formErrors,
    submitError,
    renderMediaPreview,
    renderError,
    newAmenity,
    setNewAmenity,
    isFormValid
}) => {
    return (
        <Modal onClose={onClose} isEditing={isEditing} show={show}>
            <form onSubmit={onSubmit} className="p-6 space-y-6">
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
                            <div className="grid grid-cols-2 gap-1 absolute inset-0 p-2">
                                {/* Show existing images */}
                                {formData.existingImages?.slice(0, 4).map((url, index) => (
                                    <div key={`existing-${index}`} className="relative w-full h-full">
                                        {renderMediaPreview(url, 'image')}
                                    </div>
                                ))}
                                {/* Show new uploads */}
                                {formData.property_images?.slice(0, 4).map((file, index) => (
                                    <div key={`new-${index}`} className="relative w-full h-full">
                                        {renderMediaPreview(file, 'image')}
                                    </div>
                                ))}
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
                            <p className="text-xs text-[#80D3A1] mt-1">Maximum file size: 10MB</p>
                        </div>
                    </div>
                    {renderError('property_images')}
                </div>

                <div className="flex justify-between items-center gap-5">
                    <label className="block text-[14px] font-medium text-[#383E49]">Property Type</label>
                    <select
                        name="type"
                        value={formData.type || ''}
                        onChange={onChange}
                        className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none cursor-pointer"
                    >
                        <option value="Sell" className=''>Sell</option>
                        <option value="Lease">Lease</option>
                    </select>
                </div>

                <div className="flex justify-between items-center gap-5">
                    <label className="block text-[14px] font-medium text-[#383E49]">
                        Location*
                    </label>
                    <div className="w-[60%]">
                        <input
                            type="text"
                            name="location"
                            value={formData.location || ''}
                            onChange={onChange}
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
                        value={formData.price || ''}
                        onChange={onChange}
                        className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                        placeholder="Enter property price"
                        min="0"
                    />
                    {renderError('price')}
                </div>

                <div className="flex justify-between items-center gap-5">
                    <label className="block text-[14px] font-medium text-[#383E49]">Available From</label>
                    <input
                        type="datetime-local"
                        className="w-[60%] border border-[#858D9D] text-[#858D9D] text-[14px] rounded-lg p-2 outline-none"
                        name="property_availability"
                        value={formData.property_availability || ''}
                        onChange={onChange}
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
                                    value={formData[field] || ''}
                                    onChange={onChange}
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

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="finance"
                        checked={formData.finance || false}
                        onChange={onChange}
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
                        {formData.amenities?.map((amenity, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between border rounded-lg px-3 py-2"
                            >
                                <span>{amenity}</span>
                                <button
                                    onClick={() => handleRemoveAmenity(amenity)}
                                    type="button"
                                    className="text-red-500 hover:underline text-xs"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    {renderError('amenities')}
                </div>

                <div className="flex justify-between items-start">
                    <label className="block text-[12px] font-medium text-[#383E49]">Property Description</label>
                    <textarea
                        name="property_description"
                        value={formData.property_description || ''}
                        onChange={onChange}
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
                            {formData.video_upload?.length > 0 && (
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
                                {formData.floor_plan?.slice(0, 4).map((file, index) => (
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
                        onClick={onClose}
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
    );
};

export default PropertyFormModal;
