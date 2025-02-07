import React, { useEffect, useState } from 'react';
import { Plus, X, ExternalLink, MessageSquarePlus, Edit2, AlertCircle } from 'lucide-react';
import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from '../api/announcements/requests';

const initialAnnouncementsState = [
    {
        id: 1,
        announcement_text: "All properties are going on a discount",
        redirect_link: "https://example.com/some-page"
    },
    {
        id: 2,
        announcement_text: "New feature: Virtual property tours now available",
        redirect_link: "https://example.com/virtual-tours"
    }
]

const initialFormState = {
    announcement_text: '',
    redirect_link: ''
}

const AnnouncementsPage = () => {
  const [ announcements, setAnnouncements ] = useState([ ...initialAnnouncementsState ]);

  const [ loading, setLoading ] = useState( true );
  const [ showModal, setShowModal ] = useState( false );
  const [ showDeleteModal, setShowDeleteModal ] = useState( false );
  const [ selectedAnnouncement, setSelectedAnnouncement ] = useState( null );
  const [ formData, setFormData ] = useState({ ...initialFormState });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAnnouncements();
            setAnnouncements( data.data );
            console.log( data )
            setLoading( false );
        }

        if( loading ) fetchData();
    }, [ loading ])

  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData( prev => ({
            ...prev,
            [ name ]: value
        }));
  };

  const handleEdit = ( announcement ) => {
        setSelectedAnnouncement( announcement );
        setFormData({
            announcement_text: announcement.announcement_text,
            redirect_link: announcement.redirect_link || ''
        });
        setShowModal( true );
  };

  const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.announcement_text?.trim()) {
            alert('Announcement text is required');
            return;
        }

        if ( selectedAnnouncement ) {
            // Edit existing announcement
            const data = await updateAnnouncement( selectedAnnouncement.id, formData );
            if( data.status ) {
                console.log('Announcement edited successfully: ', data );
                window.alert('Announcement edited successfully');
                setLoading( true );
            } else {
                window.alert('An Error Occurred');
            }
        } else {
            // Add new announcement
            const data = await createAnnouncement( formData );
            if( data.status ) {
                console.log('Announcement created successfully: ', data );
                window.alert('Announcement created successfully');
                setLoading( true );
            } else {
                window.alert('An Error Occurred');
            }
        }
        
        handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal( false );
    setSelectedAnnouncement( null );
    setFormData({ ...initialFormState });
  };

  const handleDeleteClick = async ( announcement ) => {
    setSelectedAnnouncement(announcement);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    const data = await deleteAnnouncement( selectedAnnouncement.id );
    if( data.status ) {
        console.log('Banner deleted successfully: ', data.message );
        window.alert('Banner deleted successfully');
        setShowDeleteModal( false );
        setSelectedAnnouncement( null );
        setLoading( true );
    } else {
        window.alert('An Error Occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto">
        <div className="md:flex space-y-2 md:space-y-0 justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <button
                onClick={() => setShowModal(true)}
                className="cursor-pointer bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
                <MessageSquarePlus className="w-5 h-5" />
                New Announcement
            </button>
        </div>

        {announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <MessageSquarePlus className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Announcements Yet</h3>
            <p className="text-gray-600 mb-4">Create your first announcement to get started</p>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer bg-black text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
                <Plus className="w-5 h-5" />
                Create Announcement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-lg shadow-sm p-4 flex items-start justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <p className="text-lg text-gray-900 mb-2">{ announcement.announcement_text || 'No Announcement Text' }</p>
                  {announcement.redirect_link && (
                    <a
                      href={announcement.redirect_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(announcement)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <Edit2 className="w-5 h-5 text-gray-500 hover:text-blue-500" />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(announcement)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
            <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg w-full max-w-lg">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                        {selectedAnnouncement ? 'Edit Announcement' : 'New Announcement'}
                        </h2>
                        <button
                        onClick={handleCloseModal}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Announcement Text <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="announcement_text"
                            value={formData.announcement_text}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black min-h-[100px]"
                            placeholder="Enter your announcement"
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Redirect Link <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="redirect_link"
                            value={formData.redirect_link}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Enter redirect link"
                        />
                        </div>
                        <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 cursor-pointer"
                            disabled={ formData.announcement_text === '' || formData.redirect_link === '' }
                        >
                            {selectedAnnouncement ? 'Save Changes' : 'Post Announcement'}
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-bold">Delete Announcement</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this announcement? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="cursor-pointer px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;