import React, { useEffect, useState } from 'react';
import { getAdmins } from '../api/admins/requests';
import TopSection from '../components/admins/TopSection';
import Header from '../components/admins/Header';
import AdminsTable from '../components/admins/AdminsTable';
import AdminsModal from '../components/admins/AdminsModal';

const Admins = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAdmins();
      setAdminUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching Admin data:', error);
      setError('Failed to fetch admin data');
      setAdminUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='p-4'>
      <TopSection />
      <Header open={() => setShowModal(true)} />
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}
      <AdminsTable admins={adminUsers} loading={loading} />
      <AdminsModal 
        show={showModal} 
        onClose={handleCloseModal}
        onSuccess={() => {
          fetchData(); // Refetch data after successful creation
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default Admins;