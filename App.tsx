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
import Footer from './components/Footer';

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