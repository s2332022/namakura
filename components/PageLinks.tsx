import React from 'react';

interface PageLinksProps {
  onLinkClick: () => void;
  linkClassName?: string;
}

const pages = [
  { name: 'PROFILE', label: 'PROFILE', href: '#profile' },
  { name: 'MUSIC', label: 'MUSIC', href: '#music' },
  { name: 'LIVE', label: 'LIVE', href: '#live' },
  { name: 'NEWS', label: 'NEWS', href: '#news' },
  { name: 'CONTACT', label: 'CONTACT', href: '#contact' },
];

const PageLinks: React.FC<PageLinksProps> = ({ onLinkClick, linkClassName }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onLinkClick();
  };

  return (
    <ul className="text-center">
      {pages.map((page) => (
        <li key={page.name}>
          <a
            href={page.href}
            onClick={(e) => handleLinkClick(e, page.href)}
            className={`font-bold tracking-widest uppercase transition-opacity hover:opacity-70 ${linkClassName}`}
          >
            {page.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PageLinks;