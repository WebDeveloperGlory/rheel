import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

const Modal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    location: '',
    position: '',
    salary: '',
    type: '',
    link: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full md:w-[500px] max-w-lg max-h-[570px] overflow-y-auto">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#48505E]">
            {initialData ? 'Edit Career' : 'New Career'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter job title"
            />
          </div>

          {/* Description */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter job description"
              rows={4}
            />
          </div>

          {/* Location */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter location"
            />
          </div>

          {/* Position */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter position type"
            />
          </div>

          {/* Salary */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Salary</label>
            <input
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter salary"
            />
          </div>

          {/* Type */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
            >
              <option value="">Select Type</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Link */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Link</label>
            <input
              type="text"
              value={formData.link}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter job link"
            />
          </div>

          <div className="flex justify-end gap-4 py-8 px-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.description || !formData.location || !formData.position || !formData.salary || !formData.type}
              className="px-6 py-2 bg-[#4DA981] text-sm text-white rounded-lg cursor-pointer disabled:opacity-80 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {initialData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                initialData ? 'Update Career' : 'Create Career'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
