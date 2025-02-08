import { MessageSquarePlus, Plus } from 'lucide-react'

const EmptyState = ({ onCreateClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <MessageSquarePlus className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Announcements Yet</h3>
      <p className="text-gray-600 mb-4">Create your first announcement to get started</p>
      <button
        onClick={onCreateClick}
        className="cursor-pointer bg-black text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-gray-800 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Create Announcement
      </button>
    </div>
  )
}

export default EmptyState
