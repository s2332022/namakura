import React from 'react';

const TwitterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4S5.746,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"></path>
  </svg>
);

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    {/* TikTok gradient to match official color (cyan -> pink) */}
    <defs>
      <linearGradient id="tiktokGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#69C9D0" />
        <stop offset="100%" stopColor="#EE1D52" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="12" fill="url(#tiktokGrad)" />
    <path fill="#fff" d="M12.005 2v.014c0 .18.006.36.018.538.353.03.7.092 1.03.184.59.173 1.103.46 1.513.84.41.38.71.846.88 1.356.17.51.21 1.054.12 1.583-.09.528-.32 1.02-.67 1.425-.35.405-.81.71-1.33.884-1.04.33-2.15.14-3.01-.51v6.77c0 2.49-2.01 4.5-4.5 4.5s-4.5-2.01-4.5-4.5 2.01-4.5 4.5-4.5c.32 0 .63.04.93.12v-1.74c-.3-.07-.6-.12-.93-.12-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3v-6.93c.98.99 2.29 1.52 3.65 1.43.32-.01.64-.06.95-.15v.02c.02.01.05.01.07.01.02 0 .04 0 .06-.01v-.01c.46-.12.88-.34 1.23-.64.35-.3.64-.67.84-1.09.2-.42.3-.87.3-1.34V2h-3.99z" />
  </svg>
);

const SpotifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    {/* circle uses currentColor so style={{ color: link.color }} paints the background */}
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    {/* the waves are white to match the Spotify logo */}
    <path fill="#fff" d="M17.2 16.2c-1.4 0-2.8-.4-4-1.1-.4-.2-.9 0-1.1.4s0 .9.4 1.1c1.5.8 3.2 1.2 4.7 1.2 1.1 0 1.8-.8 1.8-1.8 0-1.1-.7-1.8-1.8-1.8zM18.5 12.9c-1.9-1.1-4.7-1.4-6.9-.8-.5.2-.8.8-.6 1.3.2.5.8.8 1.3.6 1.8-.5 3.8-.3 5.3.8.4.3 1 .2 1.3-.2.3-.5.1-1.1-.4-1.7zM19.1 9.3c-2.4-1.5-6.2-1.6-8.6-.9-.6.2-.9.9-.6 1.5.2.6.9.9 1.5.6 1.8-.6 4.6-.5 6.2.9.5.3 1.2.1 1.4-.4.2-.6 0-1.2-.3-1.7z" />
  </svg>
);

const EggsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="bold">卵</text>
  </svg>
);


const socialLinks = [
  { name: 'X', href: 'https://x.com/Namakura_Metro', icon: TwitterIcon, color: '#1DA1F2' },
  { name: 'Instagram', href: 'https://www.instagram.com/namakura', icon: InstagramIcon, color: '#E1306C' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCFpddgdwvz_33p_L5t5O2jQ', icon: YouTubeIcon, color: '#FF0000' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@namakura_metro?is_from_webapp=1&sender_device=pc', icon: TikTokIcon, color: '#69C9D0' },
  { name: 'Spotify', href: 'https://open.spotify.com/intl-ja/artist/5zLQTqkaQxOeUBFkKt9WVu?si=fltHFTXhTtG4_Uz84I9-gw', icon: SpotifyIcon, color: '#1DB954' },
  { name: 'Eggs', href: 'https://eggs.mu/artist/NamakuraMetro', icon: EggsIcon, color: '#FFD166' },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="absolute bottom-16 left-8">
      <div className="flex items-center space-x-5">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          const isSpotify = link.name === 'Spotify';
          const isTikTok = link.name === 'TikTok';
          const sizeClass = isSpotify || isTikTok ? 'w-6 h-6 md:w-7 md:h-7' : 'w-5 h-5 md:w-6 md:h-6';
          const spanClass = isSpotify || isTikTok
            ? 'inline-block p-1 rounded-md'
            : 'inline-block p-2 rounded-md bg-black/20 hover:bg-black/40';

          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
              onClick={(e) => {
                // ensure navigation even if something overlays the link
                e.preventDefault();
                try {
                  window.open(link.href, '_blank', 'noopener,noreferrer');
                } catch (err) {
                  // fallback to setting location if window.open blocked
                  window.location.href = link.href;
                }
              }}
              className="text-white transition-opacity hover:opacity-70 z-50 pointer-events-auto"
            >
              <span className={spanClass}>
                    {(link.name === 'TikTok' || link.name === 'Spotify') ? (
                      // prefer local downloaded PNG (falls back to inline SVG if missing)
                      <img
                        src={link.name === 'TikTok' ? '/assets/icons/tiktok.png' : '/assets/icons/spotify.png'}
                        alt={link.name}
                        className={sizeClass}
                        style={{ display: 'block' }}
                        onError={(e) => {
                          // if image missing or fails, replace with the inline Icon component
                          const target = e.currentTarget as HTMLImageElement;
                          target.replaceWith(
                            (React.createElement(Icon as any, { className: sizeClass, style: { color: link.color, display: 'block' } }))
                          );
                        }}
                      />
                    ) : (
                      <Icon className={sizeClass} style={{ color: link.color, display: 'block' }} />
                    )}
                  </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;