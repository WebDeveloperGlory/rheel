import React, { useState, useMemo } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import AffiliateTableSkeleton from '../skeletons/AffiliateTableSkeleton';
import { updateAffiliateStatus } from '../../api/affiliates/requests';

const AffiliatesTable = ({ affiliates, onEdit, onDelete, loading, onStatusUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 6;

  const getStatusColor = (status) => { 
    const statusColors = {
      'Activated': '#0E3B8D',
      'Terminated': '#FF0000',
      'Completed': '#3579F6',
      'Processing': '#008000'
    };
    return statusColors[status] || 'bg-gray-100';
  };

  // Sort affiliates by latest
  const sortedAffiliates = [...affiliates].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const paginatedData = useMemo(() => {
    if (showAll) {
      return sortedAffiliates;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAffiliates.slice(startIndex, endIndex);
  }, [sortedAffiliates, currentPage, showAll]);

  const totalPages = Math.ceil(sortedAffiliates.length / itemsPerPage);

  const handleDropdownClick = (e, id) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleActionClick = async (e, action, affiliate) => {
    e.stopPropagation();
    setOpenDropdownId(null);

    if (action === 'edit') {
      onEdit(affiliate);
    } else if (action === 'delete') {
      onDelete(affiliate);
    } else if (action === 'updateStatus') {
      const newStatus = prompt('Enter new status:', affiliate.status);
      if (newStatus) {
        const response = await updateAffiliateStatus(affiliate.affiliate_code, newStatus, affiliate.payment_status);
        if (response.status) {
          window.alert('Affiliate status updated successfully');
          onStatusUpdate(); // Trigger data refresh
        } else {
          window.alert(response.error || 'Failed to update affiliate status');
        }
      }
    } else if (action === 'updatePaymentStatus') {
      const newPaymentStatus = prompt('Enter new payment status:', affiliate.payment_status);
      if (newPaymentStatus) {
        const response = await updateAffiliateStatus(affiliate.affiliate_code, affiliate.status, newPaymentStatus);
        if (response.status) {
          window.alert('Affiliate payment status updated successfully');
          onStatusUpdate(); // Trigger data refresh
        } else {
          window.alert(response.error || 'Failed to update affiliate payment status');
        }
      }
    }
  };

  if (loading) {
    return <AffiliateTableSkeleton />;
  }

  if (!affiliates || affiliates.length === 0) {
    return (
      <div className="w-full flex justify-center items-center h-40 text-gray-500 text-lg">
        No affiliates available
      </div>
    );
  }

  return (
    <div className="w-full" onClick={() => setOpenDropdownId(null)}>
      <div className="bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[16px] font-semibold">Affiliate Activities</h2>
          
          <button
            onClick={() => {
              setShowAll(!showAll);
              setCurrentPage(1);
            }}
            className="text-[#0F60FF] text-sm cursor-pointer hover:text-blue-800"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
        <ul className='flex gap-3 items-center text-[12px] mb-4 font-light text-[#181818] cursor-pointer'>
            <li className='text-[#FF5B19] font-bold'>By Highest Referrals</li>
            <li>By Commisions</li>
            <li>Nearest</li>
          </ul>

        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 text-[14px]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {`${affiliate.first_name} ${affiliate.last_name}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.phone_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.affiliate_code}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.property_count}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.value}</td>
                  <td className="px-6 py-4 w-40">
                    <div className="flex justify-center">
                      <span className="px-3 py-2 text-xs text-white uppercase w-24 text-center" style={{ backgroundColor: getStatusColor(affiliate.status) }}>
                        {affiliate.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.payment_status}</td>
                  <td className="px-6 py-4">
                    <div className="relative" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleDropdownClick(e, affiliate.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
                      </button>
                      
                      {openDropdownId === affiliate.id && (
                        <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'updateStatus', affiliate)}
                            >
                              <Edit2 className="h-4 w-4 cursor-pointer" />
                              <span>Update Status</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'updatePaymentStatus', affiliate)}
                            >
                              <Edit2 className="h-4 w-4 cursor-pointer" />
                              <span>Update Payment Status</span>
                            </button>
                            {/*<button
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'delete', affiliate)}
                            >
                              <Trash2 className="h-4 w-4 cursor-pointer" />
                              <span>Delete</span>
                            </button>*/}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!showAll && sortedAffiliates.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedAffiliates.length)} of {sortedAffiliates.length} rows
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#A5C2F9] text-gray-600 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {showAll && (
        <div className="text-sm text-gray-700 mt-4">
          Showing all {sortedAffiliates.length} rows
        </div>
      )}
    </div>
  );
};

export default AffiliatesTable;
