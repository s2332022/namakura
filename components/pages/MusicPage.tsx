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
  artwork: 'assets/music/thatre.V.webp',
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
            <div id={`release-${idx}`} key={release.title} className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <a href={release.link} target="_blank" rel="noopener noreferrer">
                {/* Mobile: artwork full width above text. Desktop: fixed square artwork */}
                <img src={release.artwork} alt={`${release.title} artwork`} className="w-full md:w-48 h-auto md:h-48 md:w-64 md:h-64 object-cover shadow-lg transition-transform hover:scale-105" />
              </a>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold">{release.title}</h3>
                <p className="text-lg text-gray-400">{release.type} - {release.year}</p>
                <div className="flex justify-center md:justify-start space-x-4 mt-4">
                  <a href={release.link} target="_blank" rel="noopener noreferrer" className="release-btn release-btn--apple">
                    Listen on Apple Music
                  </a>
                  {release.spotify && (
                    <a href={release.spotify} target="_blank" rel="noopener noreferrer" className="release-btn release-btn--spotify">
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