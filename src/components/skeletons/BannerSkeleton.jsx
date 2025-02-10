const BannerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
          <div className="h-48 bg-gray-200 w-full"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="flex justify-end">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSkeleton;
