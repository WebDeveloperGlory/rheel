const RecentSignups = ({ data }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-[14px] font-semibold">Recent Sign Up</h2>
        <button className="text-blue-500 md:text-[14px] hover:text-blue-700">View All</button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 text-[14px]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mail Address</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
        <div className="text-sm text-gray-700">Showing 1 to 10 of 37 rows</div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                page === 1 ? 'bg-blue-500 text-white' : 'bg-[#A5C2F9] text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentSignups
