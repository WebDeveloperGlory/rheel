import React, { useEffect, useState } from 'react';
import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from '../api/announcements/requests';
import TopSection from '../components/announcements/TopSection';
import AnnouncementMetrics from '../components/announcements/AnnouncementMetrics';
import AnnouncementsTable from '../components/announcements/AnnouncementsTable';
import EmptyState from '../components/announcements/EmptyState';
import AnnouncementModal from '../components/announcements/AnnouncementModal';
import megaphone from '../assets/images/megaphone.png';

const initialFormState = {
  announcement_text: '',
  redirect_link: ''
}

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) fetchData();
  }, [loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      announcement_text: announcement.announcement_text,
      redirect_link: announcement.redirect_link || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (announcement) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteAnnouncement(announcement.id);
        setLoading(true);
      } catch (error) {
        console.error('Error deleting announcement:', error);
      }
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (selectedAnnouncement) {
        await updateAnnouncement(selectedAnnouncement.id, formData);
      } else {
        await createAnnouncement(formData);
      }
      setLoading(true);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving announcement:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAnnouncement(null);
    setFormData(initialFormState);
  };

  const announcementMetrics = [
    { name: 'All Announcements', value: announcements.length, icon: megaphone },
    { name: 'Push Notifications', value: announcements.filter(a => a.redirect_link).length, icon: megaphone },
    { name: 'In-App Notifications', value: announcements.filter(a => !a.redirect_link).length, icon: megaphone }
  ];

  return (
    <div className="p-4">
      <TopSection />
      <AnnouncementMetrics metrics={announcementMetrics} />
      
      <button 
        onClick={() => setShowModal(true)} 
        className="bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer mb-8"
      >
        Create New Announcement
      </button>

      {announcements.length === 0 && !loading ? (
        <EmptyState onCreateClick={() => setShowModal(true)} />
      ) : (
        <AnnouncementsTable 
          announcements={announcements}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      )}

      <AnnouncementModal 
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
        selectedAnnouncement={selectedAnnouncement}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AnnouncementsPage;