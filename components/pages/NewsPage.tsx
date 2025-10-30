import React from 'react';
import PageContainer from './PageContainer';

const newsItems = [
    {
        date: '2023-11-01',
        title: '1stシングル「BRAVMEN」先行リリース',
        content: '1stシングル「BRAVMEN」をeggsにて先行リリースしました。',
    },
    {
        date: '2023-11-21',
        title: '2ndシングル「煙草」先行リリース',
        content: '2ndシングル「煙草」をeggsにて先行リリースしました。',
    },
    {
        date: '2024-04-14',
        title: '3rdシングル「灯籠」先行リリース',
        content: '3rdシングル「灯籠」をeggsにて先行リリースしました。',
    },
    {
        date: '2025-06-01',
        title: '5thシングル「theatre.V」リリース',
        content: '5thシングル「theatre.V」をリリースしました。',
    },
    {
        date: '2025-08-08',
        title: '1stアルバム「胎動」リリース（会場限定盤あり）',
        content: 'アルバム「胎動」をリリース。渋谷La.mamaでの自主企画で会場限定盤を販売しました。',
    },
];

const NewsPage: React.FC = () => {
  return (
    <PageContainer title="News">
        <div className="space-y-8">
            {newsItems.map((item) => (
            <div key={item.date + item.title} className="border-b border-gray-700 pb-4">
                <p className="text-gray-400">{item.date}</p>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                <p className="mt-2 text-gray-300">{item.content}</p>
            </div>
            ))}
      </div>
    </PageContainer>
  );
};

export default NewsPage;