const SignupTableSkeleton = () => {
  return (
    <table className="w-full table-auto">
      <thead className="bg-gray-50 text-[14px]">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail Address</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(6)].map((_, index) => (
          <tr key={index} className="animate-pulse">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SignupTableSkeleton;
