import React from 'react';
import PageContainer from './PageContainer';

const liveShows = [
  {
    date: '2023-03-08',
    venue: 'shibuya CYCLONE',
    event: 'なまくらメトロとしての初ライブ',
    details: '初のワンマン／結成後初ステージ',
    tickets: '#',
  },
  {
    date: '2023-08-24',
    venue: '下北沢 WAVER',
    event: 'SOUND SHOCK TOKYO 2023',
    details: 'サーキットイベント初出演',
    tickets: '#',
  },
  {
    date: '2025-08-08',
    venue: '渋谷 La.mama',
    event: 'なまくらメトロ pre. 「胎動」',
    details: 'バンドとして初の自主企画（会場限定盤を発売）',
    tickets: '#',
  },
];

const LivePage: React.FC = () => {
  return (
    <PageContainer title="Live">
      <div className="space-y-8">
        {liveShows.map((show) => (
          <div key={show.date + show.venue} className="border-b border-gray-700 pb-4">
            <p className="text-xl font-bold">{show.date} - {show.venue}</p>
            <p className="text-lg">{show.event}</p>
            <p className="text-gray-400">{show.details}</p>
            <a href={show.tickets} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-yellow-400 hover:text-yellow-300 transition-colors">
              TICKETS
            </a>
          </div>
        ))}
      </div>
    </PageContainer>
  );
};

export default LivePage;