import React from 'react'
import { X } from 'lucide-react'

const AgentsModal = ({ show, onClose, onSubmit, formData, onChange }) => {
    if (!show) return null

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onChange({
            target: {
                name: 'logo',
                value: file
            }
        });
    };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full md:w-[400px] max-w-lg max-h-[570px] overflow-y-auto">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#48505E]">
            New Agent
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
            {/* Image Upload */}
            <div className="space-y-2 p-2 px-5">
                <label className="block text-[14px] font-medium text-[#383E49]">Logo</label>
                <div className="flex justify-center items-start gap-5">
                <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <div className='w-[100px]'>
                <p className="text-[12px] text-[#858D9D]">Drop an image here or click to upload</p>
                <p className="text-xs text-[#80D3A1] mt-1">Supported formats: jpg, png</p>
                </div>
                </div>
                {formData.logo && (
                    <div className="mt-2 text-sm text-[#383E49]">
                        Uploaded Image: { formData.logo.name }
                    </div>
                )}
            </div>

            {/* First Name */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter first name"
                />
            </div>

            {/* Last Name */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter last name"
                />
            </div>

            {/* Company Name */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Company Name</label>
                <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter company name"
                />
            </div>

            {/* Email */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter email"
                />
            </div>

            {/* Phone Number */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Phone Number</label>
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter phone number"
                />
            </div>

            {/* City */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">City</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter city"
                />
            </div>

            {/* Postcode */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
                <label className="block text-[14px] font-medium text-[#383E49]">Postcode</label>
                <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={onChange}
                    className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                    placeholder="Enter postcode"
                />
            </div>

            <div className="flex justify-end gap-4 py-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={!formData.first_name || !formData.last_name || !formData.company_name || !formData.email || !formData.phone_number || !formData.city || !formData.postcode}
              className="px-6 py-2 bg-[#4DA981] text-sm text-white rounded-lg cursor-pointer disabled:opacity-80"
            >
              Create Agent
            </button>
          </div>
        </form>

        </div>

    </div>
  )
}

export default AgentsModal