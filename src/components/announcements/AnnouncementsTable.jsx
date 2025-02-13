import React, { useState, useMemo } from 'react';
import { MoreVertical, Edit2, Trash2, ExternalLink } from 'lucide-react';
import AnnouncementTableSkeleton from '../skeletons/AnnouncementTableSkeleton';

const AnnouncementsTable = ({ announcements, onEdit, onDelete, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const itemsPerPage = 6;

  const enrichedAnnouncements = announcements.map(announcement => ({
    ...announcement,
    date: announcement.created_at ? new Date(announcement.created_at).toLocaleDateString() : '15-08-2024',
    admin: 'RHEEL',
    type: announcement.redirect_link ? 'PUSH' : 'IN-APP',
    status: 'ACTIVE'
  }));

  const paginatedData = useMemo(() => {
    if (showAll) {
      return enrichedAnnouncements;
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return enrichedAnnouncements.slice(startIndex, endIndex);
  }, [enrichedAnnouncements, currentPage, showAll]);

  const totalPages = Math.ceil(enrichedAnnouncements.length / itemsPerPage);

  const handleDropdownClick = (e, id) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleActionClick = (e, action, announcement) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setOpenDropdownId(null); // Close dropdown
    if (action === 'edit') {
      onEdit(announcement);
    } else if (action === 'delete') {
      onDelete(announcement);
    }
  };

  if (loading) return <AnnouncementTableSkeleton />;

  return (
    <div className="w-full" onClick={() => setOpenDropdownId(null)}>
      <div className="bg-white md:p-8 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#23272E]">Announcements</h2>
          <button 
            onClick={() => {
              setShowAll(!showAll);
              setCurrentPage(1);
            }}
            className="text-[#0F60FF] text-[14px]"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#DBDADE] text-[14px]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ADMIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONTENT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TYPE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="">
              {paginatedData.map((announcement) => (
                <tr key={announcement.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">{announcement.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{announcement.admin}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center uppercase gap-2">
                      {announcement.announcement_text}
                      {announcement.redirect_link && (
                        <a
                          href={announcement.redirect_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{announcement.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-8 py-5  text-xs text-white ${
                      announcement.status === 'ACTIVE' 
                        ? 'bg-[#0E3B8D] ' 
                        : 'bg-[#008000] '
                    }`}>
                      {announcement.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleDropdownClick(e, announcement.id)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                      
                      {openDropdownId === announcement.id && (
                        <div className="absolute right-0 bottom-4 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-1000">
                          <div className="py-1">
                            <button
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'edit', announcement)}
                            >
                              <Edit2 className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                              onClick={(e) => handleActionClick(e, 'delete', announcement)}
                            >
                              <Trash2 className="h-4 w-4" />
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

      {!showAll && enrichedAnnouncements.length > itemsPerPage && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, enrichedAnnouncements.length)} of {enrichedAnnouncements.length} rows
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
          Showing all {enrichedAnnouncements.length} rows
        </div>
      )}
    </div>
  );
};

export default AnnouncementsTable;