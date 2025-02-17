import React, { useState } from 'react'
import { X } from 'lucide-react'
import { createAdmin } from '../../api/admins/requests'

const AdminsModal = ({ show, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pswd: '',
    confirmPswd: '',
    phone_number: '',
    status: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    if (formData.pswd !== formData.confirmPswd) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    try {
      await createAdmin(formData)
      alert('Admin created successfully!')
      setFormData({
        name: '',
        email: '',
        pswd: '',
        confirmPswd: '',
        phone_number: '',
        status: 0
      })
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      setError(error.message || 'Failed to create admin')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!show) return null
  
  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full md:w-[400px] max-w-lg max-h-[570px] overflow-y-auto">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#48505E]">
            New Admin
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mx-5 p-2 text-sm text-red-600 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter name"
            />
          </div>

          {/* Email */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
              placeholder="Input address"
            />
          </div>

          {/* Password */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Password</label>
            <input
              type="password"
              name="pswd"
              value={formData.pswd}
              onChange={handleChange}
              required
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Input Password"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Confirm Password</label>
            <input
              type="password"
              name="confirmPswd"
              value={formData.confirmPswd}
              onChange={handleChange}
              required
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Confirm Password"
            />
          </div>

          {/* Phone Number */}
          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-[60%] border rounded-lg p-2 placeholder:text-[14px] text-sm focus:outline-none border-[#D0D5DD]"
              placeholder="Enter phone number"
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
              disabled={isSubmitting || !formData.email || !formData.pswd || !formData.confirmPswd || !formData.name || !formData.phone_number}
              className="px-6 py-2 bg-[#4DA981] text-sm text-white rounded-lg cursor-pointer disabled:opacity-80 flex items-center gap-2"
            >
              {isSubmitting ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminsModal