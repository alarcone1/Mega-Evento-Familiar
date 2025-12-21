import React, { useState, useEffect } from 'react';

// Real photos from public/photos
const PHOTO_COUNT = 30;
const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `/Mega-Evento-Familiar/photos/foto${i + 1}.jpeg`
);

interface PhotoCarouselProps {
  className?: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ className = "" }) => {
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
      <div
        className={`flex items-center justify-center overflow-hidden pointer-events-auto ${className}`}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Scrolling Track */}
        <div className="flex gap-8 animate-scroll-left hover:pause-animation">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative group cursor-pointer transition-all duration-500 hover:scale-110 hover:z-20 pt-10 pr-10" // Increased padding for hat overflow space
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative">
                {/* Photo Frame / Evocation Style (Clipped Content) */}
                <div className="
                  w-80 h-60 sm:w-[28rem] sm:h-[21rem] md:w-[36rem] md:h-[26rem] 
                  rounded-lg overflow-hidden 
                  border-2 sm:border-4 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.3)]
                  transform rotate-2 hover:rotate-0 transition-transform duration-500
                  bg-white/10 backdrop-blur-sm
                ">
                  <img
                    src={photo}
                    alt={`Memory ${index}`}
                    className="
                      w-full h-full object-cover 
                      filter brightness-110 contrast-110
                      group-hover:brightness-100 group-hover:contrast-100
                      transition-all duration-700 ease-in-out
                    "
                  />
                  {/* Frost Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 opacity-50 pointer-events-none" />
                </div>

                {/* Santa Hat Decoration (Unclipped) */}
                <img
                  src="/Mega-Evento-Familiar/santa_hat.svg"
                  alt="Santa Hat"
                  className="absolute -top-10 -right-8 w-16 h-16 drop-shadow-lg transform rotate-12 z-50 pointer-events-none"
                />
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
