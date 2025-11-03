import React from 'react';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, onMenuToggle }) => {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header container flex items-center justify-between py-4">
      <div className="flex-1 flex items-center">
        {/* left: simple nav (hidden on small screens) */}
        <nav className="hidden md:flex space-x-6 text-sm text-white/80">
          <a href="#profile" className="uppercase tracking-wider">Profile</a>
          <a href="#music" className="uppercase tracking-wider">Music</a>
          <a href="#live" className="uppercase tracking-wider">Live</a>
        </nav>
      </div>

      <div className="flex-0 logo text-center">
        <a href="#top" onClick={handleLogoClick} className="logo inline-block text-white no-underline">なまくらメトロ</a>
      </div>

      <div className="flex-1 flex items-center justify-end">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#news" className="text-sm text-white/80 uppercase tracking-wider">News</a>
          <a href="#contact" className="text-sm text-white/80 uppercase tracking-wider">Contact</a>
        </div>

        <button
          onClick={onMenuToggle}
          className="ml-4 relative z-50 w-8 h-8 flex flex-col justify-center items-center md:ml-6"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {/* Two-line hamburger: top and bottom lines. On open they rotate to form an X. */}
          <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
          <span className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;