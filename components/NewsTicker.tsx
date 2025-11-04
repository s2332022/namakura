import React, {useEffect, useRef, useState} from 'react';

const newsItems = [
  { id: 1, text: '2023-11-01 — 1stシングル「BRAVMEN」eggs先行リリース' },
  { id: 2, text: '2023-11-21 — 2ndシングル「煙草」eggs先行リリース' },
  { id: 3, text: '2024-04-14 — 3rdシングル「灯籠」eggs先行リリース' },
  { id: 4, text: '2024-10-15 — 4thシングル「Diorama」先行リリース' },
  { id: 5, text: '2025-06-01 — 5thシングル「theatre.V」リリース' },
  { id: 6, text: '2025-08-08 — 1stアルバム「胎動」リリース（渋谷La.mama会場限定盤あり）' },
  { id: 7, text: '2023-03-08 — なまくらメトロとして初ライブ（shibuya CYCLONE）' },
  { id: 8, text: '2023-08-24 — SOUND SHOCK TOKYO 2023 出演' },
  { id: 9, text: '2025-08-08 — 渋谷La.mamaにて初の自主企画「胎動」開催' },
];

const NewsTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const [styleVars, setStyleVars] = useState({distance: 0, duration: 10});

  // pixels per second speed; tweak if you want faster/slower ticker
  const SPEED_PX_PER_SEC = 30;

  useEffect(() => {
    if (!stripRef.current) return;

    const calc = () => {
      const strip = stripRef.current!;
      // The strip contains duplicated content [...items, ...items]
      const totalWidth = strip.scrollWidth; // full duplicated width
      const singleWidth = totalWidth / 2; // width of one set
      // distance to translate is -singleWidth (move left by one set)
      const distance = Math.round(singleWidth);
      const duration = Math.max(4, Math.round(distance / SPEED_PX_PER_SEC));
      setStyleVars({distance, duration});
    };

    // initial calc (wait a tick for fonts/images)
    const t = setTimeout(calc, 50);

    // recalc on resize
    window.addEventListener('resize', calc);

    // If fonts load later, recalc
    if ((document as any).fonts && (document as any).fonts.ready) {
      (document as any).fonts.ready.then(calc).catch(() => {});
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calc);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 h-10 bg-black bg-opacity-70 backdrop-blur-sm overflow-hidden flex items-center">
      <div
        ref={containerRef}
        className="w-full flex items-center whitespace-nowrap"
        style={{
          // expose CSS variables for animation
          ['--ticker-distance' as any]: `-${styleVars.distance}px`,
          ['--ticker-duration' as any]: `${styleVars.duration}s`,
        }}
      >
        <div
          ref={stripRef}
          className="flex items-center"
          style={{display: 'inline-flex'}}
        >
          {
            // Duplicate items for seamless loop
            [...newsItems, ...newsItems].map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center mx-8">
                <span className="text-sm tracking-widest text-gray-300">{item.text}</span>
              </div>
            ))
          }
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--ticker-distance)); }
        }
        .animate-ticker {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        /* apply animation to the inner strip element */
        .flex.items-center[style] > div {
          animation-name: ticker;
          animation-duration: var(--ticker-duration, 10s);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;