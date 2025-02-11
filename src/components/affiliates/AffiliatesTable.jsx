import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import AffiliateTableSkeleton from '../skeletons/AffiliateTableSkeleton';

const AffiliatesTable = ({ affiliates, onEdit, onDelete, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleDropdownClick = (e, id) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleActionClick = (e, action, affiliate) => {
    e.stopPropagation();
    setOpenDropdownId(null);
    if (action === 'edit') {
      onEdit(affiliate);
    } else if (action === 'delete') {
      onDelete(affiliate);
    }
  };

  if (loading) {
    return <AffiliateTableSkeleton />;
  }

  return (
    <div className="w-full" onClick={() => setOpenDropdownId(null)}>
      <div className="bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Affiliates</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            View All
          </a>
        </div>

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate) => (
                <tr key={affiliate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {`${affiliate.first_name} ${affiliate.last_name}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.phone_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.affiliate_code}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.property_count}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{affiliate.value}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      affiliate.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {affiliate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleDropdownClick(e, affiliate.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500 cursor-pointer" />
                      </button>
                      
                      {openDropdownId === affiliate.id && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'edit', affiliate)}
                            >
                              <Edit2 className="h-4 w-4 cursor-pointer" />
                              <span>Edit</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'delete', affiliate)}
                            >
                              <Trash2 className="h-4 w-4 cursor-pointer" />
                              <span>Delete</span>
                            </button>
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

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to {Math.min(10, affiliates.length)} of {affiliates.length} rows
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((page) => (
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
    </div>
  );
};

export default AffiliatesTable;
