import { useState, useMemo } from 'react';
import SignupTableSkeleton from '../skeletons/SignupTableSkeleton';

const RecentSignups = ({ data = [], loading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 6;

  const paginatedData = useMemo(() => {
    if (showAll) {
      return data;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, showAll]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const toggleView = () => {
    setShowAll(!showAll);
    setCurrentPage(1);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-[14px] font-semibold">Recent Sign Up</h2>
        <button 
          onClick={toggleView} 
          className="text-blue-500 md:text-[14px] hover:text-blue-700 cursor-pointer"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        {loading ? (
          <SignupTableSkeleton />
        ) : (
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-[14px]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((signup) => (
                  <tr key={signup.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {signup.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {signup.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {signup.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No signups found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {!loading && data.length > itemsPerPage && !showAll && (
        <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} rows
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded cursor-pointer ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-[#A5C2F9] text-gray-700 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && showAll && (
        <div className="text-sm text-gray-700 mt-4">
          Showing all {data.length} rows
        </div>
      )}
    </div>
  );
};

export default RecentSignups;
