import { Loader2, X } from 'lucide-react'

const AnnouncementModal = ({ show, onClose, onSubmit, formData, onChange, selectedAnnouncement, isSubmitting }) => {
  if (!show) return null

  return ( 
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full md:w-[400px] max-w-lg">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#48505E]">
            {selectedAnnouncement ? 'Edit Announcement' : 'New Announcement'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 pt-0 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#48505E]">
              Announcement Text
            </label>
            <textarea
              name="announcement_text"
              value={formData.announcement_text}
              onChange={onChange}
              className="w-full border rounded-lg p-3 placeholder:text-[14px] focus:outline-none  border-[#D0D5DD] min-h-[100px]"
              placeholder="Enter your announcement"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#48505E]">
              Redirect Link
            </label>
            <input
              type="text"
              name="redirect_link"
              value={formData.redirect_link}
              onChange={onChange}
              className="w-full border rounded-lg placeholder:text-sm p-3 focus:outline-none border-[#D0D5DD]"
              placeholder="Enter redirect link"
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
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
              disabled={isSubmitting || !formData.announcement_text || !formData.redirect_link}
              className="px-6 py-2 bg-[#4DA981] text-sm text-white rounded-lg cursor-pointer disabled:opacity-60 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {selectedAnnouncement ? 'Saving...' : 'Posting...'}
                </>
              ) : (
                selectedAnnouncement ? 'Save Changes' : 'Post Announcement'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AnnouncementModal
