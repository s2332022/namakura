import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import BackgroundSlider from './components/BackgroundSlider';
import Splash from './components/Splash';

// Lazy-load heavier or below-the-fold components to reduce initial bundle size.
const SocialLinks = lazy(() => import('./components/SocialLinks'));
const NewsTicker = lazy(() => import('./components/NewsTicker'));
const MenuOverlay = lazy(() => import('./components/MenuOverlay'));
const ProfilePage = lazy(() => import('./components/pages/ProfilePage'));
const MusicPage = lazy(() => import('./components/pages/MusicPage'));
const LivePage = lazy(() => import('./components/pages/LivePage'));
const NewsPage = lazy(() => import('./components/pages/NewsPage'));
const ContactPage = lazy(() => import('./components/pages/ContactPage'));
const Footer = lazy(() => import('./components/Footer'));

// Background images for the slider.
// If you want to use a local photo, put it in `public/assets/background.jpg`.
// Files in `public/` are served from the site root, so the path is `/assets/background.jpg`.
// Use import.meta.env.BASE_URL so paths are correct when deployed under a repo subpath (GitHub Pages).
const base = (import.meta as any).env?.BASE_URL ?? '/';

// Default images (local photo + svg fallback). We'll dynamically load
// any files discovered in `public/assets/backgrounds/` (generated to
// `src/generated/backgrounds.ts`) and insert them between these two.
const defaultLocal = `${base}assets/background.jpg`;
const defaultFallback = `${base}assets/background.svg`;

const initialImages = [defaultLocal, defaultFallback];

// Images will be managed in component state so we can dynamically load a
// generated manifest (`src/generated/backgrounds.ts`) at runtime and insert
// discovered files between the defaultLocal and defaultFallback images.

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // splash visibility state
  const [splashVisible, setSplashVisible] = useState(true);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  
  
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Images state: start with defaults, then try to load generated manifest
  // from `src/generated/backgrounds.ts` which is produced by the generator
  // script (scripts/generate-backgrounds.js). Files are mapped to
  // `${base}assets/backgrounds/<filename>` so they work on GitHub Pages.
  const [images, setImages] = useState<string[]>(initialImages);

  useEffect(() => {
    let mounted = true;
  import('./src/generated/backgrounds')
      .then((mod) => {
        const list = (mod && (mod.default || mod)) as string[] | undefined;
        if (!list || !list.length) return;
        const mapped = list.map((f) => `${base}assets/backgrounds/${f}`);
        if (mounted) setImages([defaultLocal, ...mapped, defaultFallback]);
      })
      .catch(() => {
        // No generated file or failed to load; keep defaults.
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Aggressively preload background images when the `images` array updates.
  // We limit eager preloads to the first few images to avoid overwhelming
  // low-end devices while still improving the chance the hero/photo is ready
  // on initial mobile open.
  useEffect(() => {
    if (!images || !images.length) return;
    const maxEager = Math.min(images.length, 6); // preload up to 6 images eagerly
    const preloadLinks: HTMLLinkElement[] = [];
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < images.length; i++) {
      const src = images[i];
      // For the first few images, add a <link rel="preload"> hint which some
      // browsers treat with higher priority.
      if (i < 3) {
        try {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          // @ts-ignore some browsers support fetchpriority on link
          try { (link as any).fetchPriority = 'high'; } catch {};
          document.head.appendChild(link);
          preloadLinks.push(link);
        } catch {}
      }

      // Create Image objects to ensure they are fetched and decoded.
      try {
        const img = new Image();
        // Eagerly load every background so the hero photo is available early.
        img.loading = 'eager';
        try { img.setAttribute('fetchpriority', i < 3 ? 'high' : 'auto'); } catch {}
        img.src = src;
        const markLoaded = () => {
          // noop: we just want it in cache; BackgroundSlider tracks loads itself
        };
        if ((img as any).decode && typeof (img as any).decode === 'function') {
          // start decode so pixels are ready earlier; don't await here to avoid blocking
          (img as any).decode().then(markLoaded).catch(() => { img.onload = markLoaded; img.onerror = markLoaded; });
        } else {
          img.onload = markLoaded;
          img.onerror = markLoaded;
        }
        imgs.push(img);
      } catch {}
    }

    return () => {
      // cleanup preload links and image handlers
      preloadLinks.forEach((l) => l.parentNode && l.parentNode.removeChild(l));
      imgs.forEach((img) => {
        // @ts-ignore
        img.onload = null;
        // @ts-ignore
        img.onerror = null;
      });
    };
  }, [images.join('|')]);

  // Splash lifecycle: wait for window 'load' (all resources) plus a small min delay,
  // then fade out the splash. Keeps a minimum splash duration for smoothness.
  useEffect(() => {
    let timeout: number | undefined;
    function finish() {
      timeout = window.setTimeout(() => setSplashVisible(false), 600);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
      window.removeEventListener('load', finish as any);
    };
  }, []);

  return (
    <div className="bg-black text-white font-sans">
  <div id="top"></div>
  <BackgroundSlider images={images} />
  <Header isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />
      <Suspense fallback={null}>
        <MenuOverlay isOpen={isMenuOpen} onLinkClick={closeMenu} />
      </Suspense>
      
  <main className={`relative z-10 ${splashVisible ? 'site-content--hidden' : 'site-content--visible'}`}>
        {/* Hero Section */}
          <section className="site-hero snap-section">
          <div>
            <h1>NAMAKURA METRO</h1>
            <p>なまくらメトロ</p>
          </div>
        </section>

        {/* Content Sections */}
        <div className="bg-black bg-opacity-60 backdrop-blur-md">
            <section id="profile" className="snap-section">
              <Suspense fallback={null}><ProfilePage /></Suspense>
            </section>
            <section id="music" className="snap-section">
              <Suspense fallback={null}><MusicPage /></Suspense>
            </section>
            <section id="live" className="snap-section">
              <Suspense fallback={null}><LivePage /></Suspense>
            </section>
            <section id="news" className="snap-section">
              <Suspense fallback={null}><NewsPage /></Suspense>
            </section>
            <section id="contact" className="snap-section">
              <Suspense fallback={null}><ContactPage /></Suspense>
            </section>
        </div>
      </main>

  <Suspense fallback={null}><SocialLinks isMenuOpen={isMenuOpen} /></Suspense>
    <Suspense fallback={null}><NewsTicker /></Suspense>
    <Suspense fallback={null}><Footer /></Suspense>
    {/* Splash overlay */}
    <Splash className={splashVisible ? '' : 'hidden'} />
    </div>
  );
};

export default App;