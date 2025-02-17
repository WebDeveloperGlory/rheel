import React, { useState, useMemo } from 'react';
import AffiliateTableSkeleton from '../skeletons/AffiliateTableSkeleton';

const AdminsTable = ({ admins = [], loading = false }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const itemsPerPage = 5;

    const paginatedData = useMemo(() => {
        if (!Array.isArray(admins)) return [];
        if (showAll) return admins;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return admins.slice(startIndex, endIndex);
    }, [admins, currentPage, showAll]);

    // Calculate total pages only if admins is an array
    const totalPages = Math.max(1, Math.ceil(admins.length / itemsPerPage));

    if (loading) {
        return <AffiliateTableSkeleton />;
    }

    if (!Array.isArray(admins) || admins.length === 0) {
        return (
            <div className="w-full flex justify-center items-center h-40 text-gray-500 text-lg">
                No admins available
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="bg-white p-5 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-[16px] font-semibold">Admins</h2>
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

                <div className="overflow-x-auto bg-white rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gray-50 text-[14px]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B909A] uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B909A] uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B909A] uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B909A] uppercase tracking-wider">Mail Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#8B909A] uppercase tracking-wider">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((admin) => (
                                <tr key={admin.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        Admin
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8B909A] uppercase">
                                        {admin.created_at}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8B909A] uppercase">
                                        {admin.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8B909A] uppercase">
                                        {admin.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#8B909A] uppercase">
                                        {admin.phone_number}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showAll && (
    <div className="text-sm text-gray-700 mt-4">
        Showing all {admins.length} rows
    </div>
)}
            </div>
            {!showAll && admins.length > itemsPerPage && (
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-700">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, admins.length)} of {admins.length} rows
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
            

        </div>
    );
};

export default AdminsTable;