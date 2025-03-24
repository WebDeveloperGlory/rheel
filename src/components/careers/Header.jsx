import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Modal from './Modal';

const Header = ({ onCareerAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      await addDoc(collection(db, "careers"), formData);
      setIsModalOpen(false);
      if (onCareerAdded) onCareerAdded(); // Trigger refresh
    } catch (error) {
      console.error("Error adding career:", error);
    }
  };

  return (
    <div>
      <h3 className='font-semibold mb-5'>Welcome Admin,</h3>
      <button
        onClick={() => setIsModalOpen(true)}
        className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer mb-5'
      >
        Create New Career
      </button>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Header;