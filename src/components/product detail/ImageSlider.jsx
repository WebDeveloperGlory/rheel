import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  const handleNavigate = (direction) => {
    if (isTransitioning) return;
    
    const container = sliderRef.current;
    if (!container) return;
    
    setIsTransitioning(true);
    const cardWidth = container.offsetWidth;
    let nextIndex = activeIndex;
    
    if (direction === 'next' && activeIndex < images.length - 1) {
      nextIndex += 1;
    } else if (direction === 'prev' && activeIndex > 0) {
      nextIndex -= 1;
    }
    
    container.scrollTo({ left: cardWidth * nextIndex, behavior: 'smooth' });
    setActiveIndex(nextIndex);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleThumbnailClick = (index) => {
    if (isTransitioning) return;
    
    const container = sliderRef.current;
    if (!container) return;
    
    setIsTransitioning(true);
    const cardWidth = container.offsetWidth;
    container.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    setActiveIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = sliderRef.current;
      if (!container) return;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const currentIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(currentIndex);
    };

    const container = sliderRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Image Container */}
      <div className="relative rounded-lg overflow-hidden shadow-lg mb-4">
        {activeIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#FF5B19]"
            onClick={() => handleNavigate('prev')}
            disabled={isTransitioning}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div
          className="flex overflow-x-scroll snap-x snap-mandatory touch-pan-x"
          ref={sliderRef}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-center"
            >
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-[400px] object-cover"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {activeIndex < images.length - 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-[#FF5B19]"
            onClick={() => handleNavigate('next')}
            disabled={isTransitioning}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div className="px-4 mb-5">
        <div className="flex gap-2 justify-center flex-wrap max-w-2xl mx-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              disabled={isTransitioning}
              className={`relative group p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5B19] ${
                activeIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-md transition-all duration-200 ${
                  activeIndex === index 
                    ? 'ring-2 ring-[#FF5B19]' 
                    : 'ring-1 ring-gray-200 group-hover:ring-blue-300'
                }`}
                draggable="false"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;