import React from 'react';
import PageLinks from './PageLinks';

interface MenuOverlayProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onLinkClick }) => {
  return (
    <div
      className={`fixed inset-0 z-20 bg-black bg-opacity-90 backdrop-blur-md transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
      <nav>
        <PageLinks onLinkClick={onLinkClick} linkClassName="text-4xl md:text-5xl my-4" />
      </nav>
    </div>
  );
};

export default MenuOverlay;