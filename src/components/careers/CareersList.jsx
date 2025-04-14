import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Modal from './Modal';
import Header from './Header';

const CareersList = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCareer, setEditingCareer] = useState(null);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "careers"));
      const careersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCareers(careersData);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this career posting?");
    if (!isConfirmed) return;

    try {
      await deleteDoc(doc(db, "careers", id));
      await fetchCareers(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting career:", error);
    }
  };

  const handleEdit = async (formData) => {
    try {
      await updateDoc(doc(db, "careers", editingCareer.id), formData);
      setEditingCareer(null);
      fetchCareers();
    } catch (error) {
      console.error("Error updating career:", error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="">
      <Header onCareerAdded={fetchCareers} />
      {careers.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No careers posted yet. Create your first career posting.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div key={career.id} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-[#4DA981]/10 text-[#4DA981] text-xs font-medium rounded-full mb-3">
                    {career.type}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{career.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{career.location}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setEditingCareer(career)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit career"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(career.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete career"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{career.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Position</span>
                  <span className="text-sm font-semibold text-gray-900">{career.position}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Salary</span>
                  <span className="text-sm font-semibold text-[#4DA981]">
                    ₦{Number(career.salary).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-500">Link</span>
                  <a 
                    href={career.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-500 hover:text-blue-700 underline break-words"
                  >
                    View Job
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingCareer && (
        <Modal
          isOpen={true}
          onClose={() => setEditingCareer(null)}
          onSubmit={handleEdit}
          initialData={editingCareer}
        />
      )}
    </div>
  );
};

export default CareersList;