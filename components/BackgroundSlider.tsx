import React, { useState, useEffect } from 'react';

interface BackgroundSliderProps {
  images: string[];
}

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 7 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`バンド なまくらメトロ イメージ ${index + 1}`}
          className={`absolute w-full h-full object-cover grayscale brightness-[0.4] transition-opacity duration-2000 ease-in-out
            ${index === currentIndex ? 'opacity-100 animate-ken-burns' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/30"></div>
      <style>{`
        @keyframes ken-burns {
          0% {
            transform: scale(1.05) translate(0, 0);
          }
          100% {
            transform: scale(1.15) translate(-2%, 2%);
          }
        }
        .animate-ken-burns {
          animation: ken-burns 15s ease-in-out infinite alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default BackgroundSlider;