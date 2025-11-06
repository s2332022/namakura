import React from 'react';
import PageContainer from './PageContainer';

const ProfilePage: React.FC = () => {
  return (
    <PageContainer title="Profile">
      <div className="space-y-6 text-left leading-relaxed max-w-3xl mx-auto">
        <p>
          なまくらメトロ（Namakura Metro）は日本のロックバンド。
          バンド名は「なまくらなメトロノーム（テンポが揃わない）」に由来する造語である。
        </p>

        <h3 className="text-xl font-semibold">略歴</h3>
        <p>
          2019年ごろに前身となる活動が始まり、大学の軽音楽サークルでメンバーが出会いながら活動を経て、
          2023年3月8日に渋谷CYCLONEでなまくらメトロとして初のライブを行い、以降本格的に活動を開始した。
        </p>

        <h3 className="text-xl font-semibold">メンバー</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>佐藤翔太</strong>
            {' '}- ボーカル／ギター {' '}
            <a href="https://www.instagram.com/nmkrmtr_vo" target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: '#E1306C' }}>@nmkrmtr_vo</a>
          </li>
          <li>
            <strong>きの</strong>
            {' '}- ギター／コーラス {' '}
            <a href="https://www.instagram.com/kuchiat(略)" target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: '#E1306C' }}>@kuchiatama4kaku</a>
          </li>
          <li>
            <strong>伊藤元陽</strong>
            {' '}- ベース {' '}
            <a href="https://www.instagram.com/nmkrmtr_ba" target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: '#E1306C' }}>@nmkrmtr_ba</a>
          </li>
          <li>
            <strong>大谷優生</strong>
            {' '}- ドラム {' '}
            <a href="https://www.instagram.com/ohtani_ppk" target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: '#E1306C' }}>@ohtani_ppk</a>
          </li>
        </ul>

        <h3 className="text-xl font-semibold">ディスコグラフィ（抜粋）</h3>
        <ul className="list-disc list-inside">
          <li>1stシングル「BRAVMEN」 — 2023-11-01（先行リリース）</li>
          <li>2ndシングル「煙草」 — 2023-11-21（先行リリース）</li>
          <li>3rdシングル「灯籠」 — 2024-04-14</li>
          <li>4thシングル「Diorama」 — 2024-10-15</li>
          <li>5thシングル「theatre.V」 — 2025-06-01</li>
          <li>1stアルバム「胎動」 — 2025-08-08（会場限定盤のリリースあり）</li>
        </ul>

        <p className="text-sm text-gray-300">
          （情報はウィキペディア「なまくらメトロ」の記載を参考）
        </p>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;