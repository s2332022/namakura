import React from 'react';

interface HeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, onMenuToggle }) => {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 p-4 md:p-8 flex justify-between items-center">
      <a href="#top" onClick={handleLogoClick} className="text-2xl md:text-3xl font-bold tracking-wider uppercase transition-opacity hover:opacity-70">
        なまくらメトロ（仮）
      </a>

      <button
        onClick={onMenuToggle}
        className="relative z-50 w-8 h-8 flex flex-col justify-between items-center"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-white transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-white transition-transform duration-300 ease-in-out ${
            isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''
          }`}
        ></span>
      </button>
    </header>
  );
};

export default Header;