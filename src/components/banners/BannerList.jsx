import { Trash2 } from 'lucide-react';
import BannerSkeleton from '../skeletons/BannerSkeleton';

const BannerList = ({ banners, onDelete, loading }) => {
  if (loading) {
    return <BannerSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <img
            src={banner.banner_link}
            alt="Banner"
            className="w-full h-44 object-cover"
          />
          <div className="p-4">
            <p className="font-medium mb-2">
              Redirect Link:{' '}
              <a 
                href={banner.redirect_link || '/'} 
                className='underline underline-offset-2 hover:underline-offset-4 text-blue-600 break-words'
              >
                {banner.redirect_link || 'None'}
              </a> 
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => onDelete(banner.id)}
                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerList;
