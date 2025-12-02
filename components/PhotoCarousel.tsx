import React, { useState, useEffect } from 'react';

// Real photos from public/photos
const PHOTO_COUNT = 29;
const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `/Mega-Evento-Familiar/photos/foto${i + 1}.jpeg`
);

const PhotoCarousel: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Shuffle photos on mount to ensure random order
  const shuffledPhotos = React.useMemo(() => {
    const shuffled = [...PHOTOS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Duplicate photos to create seamless infinite scroll effect
  const displayPhotos = [...shuffledPhotos, ...shuffledPhotos];

  return (
    <>
      {/* Carousel Container */}
      <div className="absolute inset-0 z-1 flex items-end pb-48 sm:items-center sm:pb-0 sm:translate-y-32 justify-center overflow-hidden pointer-events-auto">
        {/* Gradient Masks for "Fade" effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-indigo-500 via-indigo-500/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-pink-500 via-pink-500/50 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex gap-8 animate-scroll-left hover:pause-animation">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transition-all duration-500 hover:scale-110 hover:z-20"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Photo Frame / Evocation Style */}
              <div className="
                w-64 h-48 sm:w-80 sm:h-60 
                rounded-lg overflow-hidden 
                border-4 border-white/20 shadow-2xl 
                transform rotate-2 hover:rotate-0 transition-transform duration-500
              ">
                <img
                  src={photo}
                  alt={`Memory ${index}`}
                  className="
                    w-full h-full object-cover 
                    filter sepia-[0.5] grayscale-[0.3] contrast-125
                    group-hover:sepia-0 group-hover:grayscale-0 group-hover:contrast-100
                    transition-all duration-700 ease-in-out
                  "
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Selected Photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl transform transition-all scale-100">
            <img
              src={selectedPhoto}
              alt="Selected Memory"
              className="w-full h-full object-contain"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 80s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default PhotoCarousel;
