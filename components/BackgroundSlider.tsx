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
      // If the image is an inline/data URL or an SVG, treat it as already available
      // to avoid a momentary state where no images have loaded yet.
      if (typeof src === 'string' && (src.startsWith('data:') || src.toLowerCase().endsWith('.svg'))) {
        loadedRef.current[i] = true;
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        return;
      }
      const img = new Image();
      // Try to hint browsers to prioritize this image where supported
      try { img.setAttribute('fetchpriority', 'high'); } catch {}
      img.loading = 'eager';
      img.src = src;

      const markLoaded = () => {
        loadedRef.current[i] = true;
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        setCurrentIndex((cur) => (loadedRef.current[cur] ? cur : i));
      };

      // Prefer decode() which ensures pixels are ready for painting.
      const decoder = (img as any).decode;
      if (decoder && typeof decoder === 'function') {
        (img as any).decode().then(markLoaded).catch(() => {
          // fallback to onload if decode fails
          img.onload = markLoaded;
          img.onerror = markLoaded;
        });
      } else {
        img.onload = markLoaded;
        img.onerror = markLoaded;
      }
      imgs.push(img);
    });

    // After starting preload, ensure currentIndex points to the first already-loaded image
    // (helps when we marked SVG/data images as loaded above).
    const firstLoadedTimeout = setTimeout(() => {
      const firstLoaded = loadedRef.current.findIndex(Boolean);
      if (firstLoaded >= 0) setCurrentIndex(firstLoaded);
    }, 0);

    return () => {
      // allow GC of Image objects
      imgs.forEach((img) => {
        // @ts-ignore
        img.onload = null;
        // @ts-ignore
        img.onerror = null;
      });
      clearTimeout(firstLoadedTimeout);
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
    // Apply a subtle parallax by translating the whole background based on
    // the CSS variable `--scroll-y` (set in `index.tsx`). The multiplier is
    // intentionally small so the background moves slower than the page content.
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ transform: 'translate3d(0, calc(var(--scroll-y, 0px) * -0.06), 0)' }}
    >
      {/* fallback background so screen never goes fully blank */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          // Use the last image in the list (usually the fallback SVG) as a background
          // This is more robust than hard-coding the path and prevents a brief
          // fully-blank viewport while images are still being marked loaded.
          backgroundImage: images && images.length ? `url(${images[images.length - 1]})` : `url(${base}assets/background.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />

      {images.map((image, index) => {
        // derive a low-res LQIP filename convention: insert `.lqip` before the
        // extension (e.g. background.jpg -> background.lqip.jpg). If such a file
        // exists in `public/assets/backgrounds/` it will be used as the blurred placeholder.
        const lqip = (() => {
          try {
            const url = new URL(image, location.href);
            const parts = url.pathname.split('/');
            const filename = parts.pop() || '';
            const dot = filename.lastIndexOf('.');
            if (dot <= 0) return '';
            const name = filename.slice(0, dot);
            const ext = filename.slice(dot);
            parts.push(`${name}.lqip${ext}`);
            return `${url.origin}${parts.join('/')}`;
          } catch {
            return '';
          }
        })();

        return (
          <React.Fragment key={image + index}>
            {/* LQIP low-res blurred placeholder (if available) */}
            {lqip ? (
              <img
                src={lqip}
                aria-hidden
                className={`absolute w-full h-full object-cover transition-opacity duration-700 ease-out
                  ${index === currentIndex && !loaded[index] ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  filter: 'blur(18px) saturate(0.7)',
                  transform: 'scale(1.03)',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
                onError={() => { /* fail silently if LQIP missing */ }}
              />
            ) : null}

            {/* full-resolution image */}
            <img
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
          </React.Fragment>
        );
      })}
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