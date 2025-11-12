import React from 'react';
import PageContainer from './PageContainer';
import MusicCarousel from '../MusicCarousel';

const releases = [
  {
    title: 'BRAVMEN',
    type: 'Single',
    year: '2023',
  artwork: 'assets/music/BRAVMEN.webp',
    link: 'https://music.apple.com/jp/song/bravmen/1714566074',
    spotify: 'https://open.spotify.com/album/32Soe5gRR5Dm9ctS7Dg83D',
  },
  {
    title: '煙草',
    type: 'Single',
    year: '2023',
  artwork: 'assets/music/煙草.webp',
    link: 'https://music.apple.com/jp/song/%E7%85%99%E8%8D%89/1717356155',
    spotify: 'https://open.spotify.com/album/77jrMmZQ89AZagSHYHIBlw',
  },
  {
    title: '灯籠',
    type: 'Single',
    year: '2024',
  artwork: 'assets/music/灯籠.webp',
    link: 'https://music.apple.com/jp/song/%E7%81%AF%E7%B1%A0/1741301887',
    spotify: 'https://open.spotify.com/intl-ja/artist/5zLQTqkaQxOeUBFkKt9WVu?si=fltHFTXhTtG4_Uz84I9-gw',
  },
  {
    title: 'Diorama',
    type: 'Single',
    year: '2024',
  artwork: 'assets/music/Diorama.webp',
    link: 'https://music.apple.com/jp/song/diorama/1773933275',
    spotify: 'https://open.spotify.com/intl-ja/artist/5zLQTqkaQxOeUBFkKt9WVu?si=fltHFTXhTtG4_Uz84I9-gw',
  },
  {
    title: 'theatre.V',
    type: 'Single',
    year: '2025',
    artwork: 'assets/music/theatre.V.webp',
    link: 'https://music.apple.com/jp/song/theatre-v/1813341104',
    spotify: 'https://open.spotify.com/album/2Zh2uK4ycfuwHkK38gCM3h',
  },
  {
    title: '潔白',
    type: 'Single',
    year: '2025',
  artwork: 'assets/music/潔白.webp',
    link: 'https://music.apple.com/jp/song/%E6%BD%94%E7%99%BD/1842765596',
    spotify: 'https://open.spotify.com/intl-ja/artist/5zLQTqkaQxOeUBFkKt9WVu?si=fltHFTXhTtG4_Uz84I9-gw',
  },
];

const MusicPage: React.FC = () => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    // Observe .release-card elements and add `in-view` when they enter viewport
    const els = Array.from(document.querySelectorAll<HTMLElement>('.release-card'));
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, { threshold: 0.12 });

      els.forEach((el) => observerRef.current?.observe(el));
    } else {
      // fallback: mark all as in-view
      els.forEach((el) => el.classList.add('in-view'));
    }

    return () => {
      if (observerRef.current) {
        els.forEach((el) => observerRef.current?.unobserve(el));
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleSelect = (index: number) => {
    // scroll to the corresponding release section
    const id = `release-${index}`;
    const el = document.getElementById(id);
    if (!el) return;
    // account for fixed header height CSS variable
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 88;
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top - headerHeight - 12; // small offset
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <PageContainer title="Music">
      <div className="space-y-12">
        <MusicCarousel items={releases} onSelect={handleSelect} />

        {/* keep the list below for users who want details */}
        <div className="space-y-12">
          {releases.map((release, idx) => (
            <div id={`release-${idx}`} key={`${release.title}-${idx}`} className="release-card flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Artwork: non-interactive image (do not navigate when clicked). Buttons below remain interactive. */}
              <div aria-hidden="true" className="w-full md:w-48 h-auto md:h-48 md:w-64 md:h-64">
                <img
                  src={release.artwork}
                  alt={`${release.title} artwork`}
                  title={`${release.title} artwork`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={640}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  onLoad={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.opacity = '1';
                    img.classList.add('loaded');
                  }}
                  className="w-full h-full object-cover shadow-lg transition-transform"
                  style={{ pointerEvents: 'none', userSelect: 'none', cursor: 'default', opacity: 0, transition: 'opacity 360ms ease' }}
                />
                {/* placeholder shown while image is loading (blur-up / skeleton) */}
                <div className="artwork-placeholder" aria-hidden="true" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold">{release.title}</h3>
                <p className="text-lg text-gray-400">{release.type} - {release.year}</p>
                <div className="flex justify-center md:justify-start space-x-4 mt-4">
                  <a href={release.link} target="_blank" rel="noopener noreferrer" className="release-btn release-btn--apple" aria-label={`Listen to ${release.title} on Apple Music`}>
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                    Listen on Apple Music
                  </a>
                  {release.spotify && (
                    <a href={release.spotify} target="_blank" rel="noopener noreferrer" className="release-btn release-btn--spotify" aria-label={`Listen to ${release.title} on Spotify`}>
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
                      Listen on Spotify
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default MusicPage;