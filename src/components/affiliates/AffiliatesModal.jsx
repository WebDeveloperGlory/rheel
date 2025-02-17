import React from 'react'
import { X, Loader2 } from 'lucide-react'

const AffiliatesModal = ({ show, onClose, onSubmit, formData, onChange, isSubmitting }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4"> 
        <div className='bg-white rounded-lg w-full md:w-[400px] max-w-lg max-h-[570px] overflow-y-auto'>
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#48505E]">
              New Affiliate
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={onSubmit}>
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

            {/* Property Count */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
             <label className="block text-[14px] font-medium text-[#383E49]">Property Count</label>
              <input
                type="number"
                name="property_count"
                value={formData.property_count}
                onChange={onChange}
                className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                placeholder="Enter property Count"
              />
            </div>

            {/* Value */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
             <label className="block text-[14px] font-medium text-[#383E49]">Value</label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={onChange}
                className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
                placeholder="Enter Value"
              />
            </div>

            {/* Status */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
             <label className="block text-[14px] font-medium text-[#383E49]">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
              >
                <option value="">Select Status</option>
                <option value="Activated">Activated</option>
                <option value="Terminated">Terminated</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Payment Status */}
            <div className="flex justify-between items-center p-2 px-5 mt-2">
             <label className="block text-[14px] font-medium text-[#383E49]">Payment Status</label>
              <select
                name="payment_status"
                value={formData.payment_status}
                onChange={onChange}
                className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
              >
                <option value="">Select Payment Status</option>
                <option value="Processing">Processing</option>
                <option value="Pending">Pending</option>
                <option value="Disbursed">Disbursed</option>
              </select>
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
                disabled={isSubmitting || !formData.first_name || !formData.last_name || !formData.phone_number || !formData.property_count || !formData.value || !formData.status || !formData.payment_status}
                className="px-6 py-2 bg-[#4DA981] text-sm text-white rounded-lg cursor-pointer disabled:opacity-80 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                     Creating...
                  </>
                  ) : (
                    'Create Affiliate'
                  )}
              </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default AffiliatesModal