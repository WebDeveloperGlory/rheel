const AffiliateTableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="w-full bg-white rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left w-32"><div className="h-3 bg-gray-200 rounded"></div></th>
              <th className="px-6 py-3 text-left w-32"><div className="h-3 bg-gray-200 rounded"></div></th>
              <th className="px-6 py-3 text-left w-32"><div className="h-3 bg-gray-200 rounded"></div></th>
              <th className="px-6 py-3 text-left w-24"><div className="h-3 bg-gray-200 rounded"></div></th>
              <th className="px-6 py-3 text-left w-24"><div className="h-3 bg-gray-200 rounded"></div></th>
              <th className="px-6 py-3 text-left w-24"><div className="h-3 bg-gray-200 rounded"></div></th>
              <th className="px-6 py-3 text-left w-20"><div className="h-3 bg-gray-200 rounded"></div></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4"><div className="h-3 bg-gray-200 rounded w-20"></div></td>
                <td className="px-6 py-4"><div className="h-3 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-3 bg-gray-200 rounded w-24"></div></td>
                <td className="px-6 py-4"><div className="h-3 bg-gray-200 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-3 bg-gray-200 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                <td className="px-6 py-4"><div className="h-8 bg-gray-200 rounded-full w-8"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AffiliateTableSkeleton;
