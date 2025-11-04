import React, { useState, useEffect, useRef } from 'react';

interface BackgroundSliderProps {
  images: string[];
}

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // track which images have finished loading
  const [loaded, setLoaded] = useState<boolean[]>(() => images.map(() => false));
  const loadedRef = useRef<boolean[]>(images.map(() => false));

  // Vite base so fallback background works when hosted under subpath
  const base = (import.meta as any).env?.BASE_URL ?? '/';

  // preload images
  useEffect(() => {
    // When the images prop changes, reset our loaded tracking so we don't
    // accidentally show a stale index while new images are being fetched.
    loadedRef.current = images.map(() => false);
    setLoaded(images.map(() => false));

    const imgs: HTMLImageElement[] = [];
    images.forEach((src, i) => {
      // skip if already marked loaded
      if (loadedRef.current[i]) return;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedRef.current[i] = true;
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        // If the currently displayed image isn't loaded yet, show this one
        // as soon as it becomes available so the UI doesn't stay blank.
        setCurrentIndex((cur) => (loadedRef.current[cur] ? cur : i));
      };
      img.onerror = () => {
        // mark as loaded to avoid blocking rotation forever
        loadedRef.current[i] = true;
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        setCurrentIndex((cur) => (loadedRef.current[cur] ? cur : i));
      };
      imgs.push(img);
    });

    return () => {
      // allow GC of Image objects
      imgs.forEach((img) => {
        // @ts-ignore
        img.onload = null;
        // @ts-ignore
        img.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.join('|')]);

  // only advance when the next image is loaded (to avoid blank flashes)
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % images.length;
      if (loadedRef.current[next]) {
        setCurrentIndex(next);
      } else {
        // try to trigger load by creating an Image (preload effect already does this),
        // but avoid changing currentIndex until it's ready.
        const img = new Image();
        img.src = images[next];
        img.onload = () => {
          loadedRef.current[next] = true;
          setLoaded((prev) => {
            const copy = [...prev];
            copy[next] = true;
            return copy;
          });
          setCurrentIndex(next);
        };
        img.onerror = () => {
          // if it errors, still advance to avoid stalling the slider forever
          loadedRef.current[next] = true;
          setLoaded((prev) => {
            const copy = [...prev];
            copy[next] = true;
            return copy;
          });
          setCurrentIndex(next);
        };
      }
  }, 9000); // Change image every 9 seconds for a more relaxed, smoother pace

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, images]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* fallback background so screen never goes fully blank */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `url(${base}assets/background.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />

      {images.map((image, index) => (
        <img
          key={image + index}
          src={image}
          alt={`バンド なまくらメトロ イメージ ${index + 1}`}
          // Only show an image when it's both the current index and has finished loading.
          className={`absolute w-full h-full object-cover grayscale brightness-[0.4] transition-opacity duration-[2800ms]
            ${index === currentIndex && loaded[index] ? 'opacity-100' : 'opacity-0'} animate-ken-burns`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
            // keep images above the fallback bg; ensure current image sits on top
            zIndex: index === currentIndex && loaded[index] ? 2 : 1,
            pointerEvents: 'none',
            willChange: 'opacity, transform',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/30" />
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
          /* Run Ken Burns continuously for each image so incoming images are
             already mid-animation when they fade in (smoother visual handoff). */
          animation: ken-burns 18s cubic-bezier(0.4,0,0.2,1) infinite alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default BackgroundSlider;