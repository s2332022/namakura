import React, { useState, useCallback } from 'react';
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

// Background images for the slider.
// If you want to use a local photo, put it in `public/assets/background.jpg`.
// Files in `public/` are served from the site root, so the path is `/assets/background.jpg`.
// Use import.meta.env.BASE_URL so paths are correct when deployed under a repo subpath (GitHub Pages).
const base = (import.meta as any).env?.BASE_URL ?? '/';
const images = [
  `${base}assets/background.jpg`, // local photo (preferred) — put your photo at public/assets/background.jpg
  `${base}assets/background.svg`, // fallback placeholder SVG
  'https://images.unsplash.com/photo-1516245834210-c4c1427873AB?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1499972935497-21946084a914?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511889498262-5a94773a4353?q=80&w=2070&auto=format&fit=crop',
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      <div id="top"></div>
      <BackgroundSlider images={images} />
      <Header isMenuOpen={isMenuOpen} onMenuToggle={toggleMenu} />
      <MenuOverlay isOpen={isMenuOpen} onLinkClick={closeMenu} />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl md:text-8xl font-black tracking-widest uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
              Namakura Metro
            </h1>
            <p className="text-lg md:text-xl tracking-wider mt-2">なまくらメトロ</p>
        </div>

        {/* Content Sections */}
        <div className="bg-black bg-opacity-60 backdrop-blur-md">
            <section id="profile"><ProfilePage /></section>
            <section id="music"><MusicPage /></section>
            <section id="live"><LivePage /></section>
            <section id="news"><NewsPage /></section>
            <section id="contact"><ContactPage /></section>
        </div>
      </main>

      <SocialLinks />
      <NewsTicker />
    </div>
  );
};

export default App;