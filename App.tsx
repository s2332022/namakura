import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import BackgroundSlider from './components/BackgroundSlider';
import SocialLinks from './components/SocialLinks';
import NewsTicker from './components/NewsTicker';
import MenuOverlay from './components/MenuOverlay';
import ProfilePage from './components/pages/ProfilePage';
import MusicPage from './components/pages/MusicPage';
import LivePage from './components/pages/LivePage';
import NewsPage from './components/pages/NewsPage';
import ContactPage from './components/pages/ContactPage';
import Footer from './components/Footer';

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

  return (
    <div className="bg-black text-white font-sans">
      <div id="top"></div>
      <BackgroundSlider images={images} />
      <Header isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />
      <MenuOverlay isOpen={isMenuOpen} onLinkClick={closeMenu} />
      
      <main className="relative z-10">
        {/* Hero Section */}
          <section className="site-hero snap-section">
          <div>
            <h1>NAMAKURA METRO</h1>
            <p>なまくらメトロ</p>
          </div>
        </section>

        {/* Content Sections */}
        <div className="bg-black bg-opacity-60 backdrop-blur-md">
            <section id="profile" className="snap-section"><ProfilePage /></section>
            <section id="music" className="snap-section"><MusicPage /></section>
            <section id="live" className="snap-section"><LivePage /></section>
            <section id="news" className="snap-section"><NewsPage /></section>
            <section id="contact" className="snap-section"><ContactPage /></section>
        </div>
      </main>

  <SocialLinks isMenuOpen={isMenuOpen} />
      <NewsTicker />
      <Footer />
    </div>
  );
};

export default App;