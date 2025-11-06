import React, { useEffect, useRef, useState } from 'react';

interface BackgroundSliderProps {
  images: string[];
}

const CHANGE_INTERVAL = 9000; // 9s between slides

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ images }) => {
  const base = (import.meta as any).env?.BASE_URL ?? '/';

  // index that is currently visible (the one actually rendered on top)
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const displayedRef = useRef<number>(0);

  // a simple loaded flag per image so we can avoid switching to an image
  // that hasn't been fully decoded yet. Start true so we don't flash on mount
  // if images prop arrives later.
  const [loaded, setLoaded] = useState<boolean[]>(() => images.map(() => true));
  const loadedRef = useRef<boolean[]>(images.map(() => true));

  // keep a ref to the timer so we can clear it
  const timerRef = useRef<number | null>(null);

  // Reset state when images change (e.g. manifest loaded). Keep first image
  // visible immediately and mark unknown images as not-yet-loaded.
  useEffect(() => {
    displayedRef.current = 0;
    setDisplayedIndex(0);
    const initial = images.map((_, i) => i === 0);
    loadedRef.current = initial.slice();
    setLoaded(initial);
  }, [images.join('|')]);

  // helper: ensure a src is decoded (returns a promise that resolves when ready)
  const ensureDecoded = (src: string) => {
    return new Promise<void>((resolve) => {
      try {
        const img = new Image();
        img.loading = 'eager';
        img.src = src;
        const done = () => resolve();
        if ((img as any).decode && typeof (img as any).decode === 'function') {
          (img as any).decode().then(done).catch(() => { img.onload = done; img.onerror = done; });
        } else {
          img.onload = done;
          img.onerror = done;
        }
        // safety: if neither fires (very unlikely), resolve after 2s
        setTimeout(done, 2000);
      } catch {
        resolve();
      }
    });
  };

  // main interval: prepare next image and swap to it only once decoded
  useEffect(() => {
    function scheduleNext() {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      timerRef.current = window.setTimeout(async () => {
        if (!images || images.length <= 1) return scheduleNext();
        const next = (displayedRef.current + 1) % images.length;
        const src = images[next];
        try {
          await ensureDecoded(src);
        } catch {}
        // mark loaded
        loadedRef.current[next] = true;
        setLoaded((prev) => {
          const copy = prev.slice();
          copy[next] = true;
          return copy;
        });
        // swap visible index
        displayedRef.current = next;
        setDisplayedIndex(next);
        scheduleNext();
      }, CHANGE_INTERVAL);
    }

    scheduleNext();

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // images.join used for simple shallow comparison of list content
  }, [images.join('|')]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ transform: 'translate3d(0, calc(var(--scroll-y, 0px) * -0.06), 0)' }}
    >
      {/* fallback background so screen never goes fully blank */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: images && images.length
            ? `url(${images[displayedIndex] ?? images[0]})`
            : `url(${base}assets/background.svg)`,
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
          className={`absolute w-full h-full object-cover grayscale brightness-[0.4] transition-opacity duration-[2800ms]
            ${index === displayedIndex && loaded[index] ? 'opacity-100' : 'opacity-0'} animate-ken-burns`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
            zIndex: index === displayedIndex && loaded[index] ? 2 : 1,
            pointerEvents: 'none',
            willChange: 'opacity, transform',
          }}
          onLoad={() => {
            loadedRef.current[index] = true;
            setLoaded((prev) => {
              const copy = prev.slice();
              copy[index] = true;
              return copy;
            });
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/30" />

      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.15) translate(-2%, 2%); }
        }
        .animate-ken-burns {
          animation: ken-burns 18s cubic-bezier(0.4,0,0.2,1) infinite alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default BackgroundSlider;