import{j as t}from"./index-Z73sCXZ5.js";const a=[{id:1,text:"2023-11-01 — 1stシングル「BRAVMEN」eggs先行リリース"},{id:2,text:"2023-11-21 — 2ndシングル「煙草」eggs先行リリース"},{id:3,text:"2024-04-14 — 3rdシングル「灯籠」eggs先行リリース"},{id:4,text:"2024-10-15 — 4thシングル「Diorama」先行リリース"},{id:5,text:"2025-06-01 — 5thシングル「theatre.V」リリース"},{id:6,text:"2025-08-08 — 1stアルバム「胎動」リリース（渋谷La.mama会場限定盤あり）"},{id:7,text:"2023-03-08 — なまくらメトロとして初ライブ（shibuya CYCLONE）"},{id:8,text:"2023-08-24 — SOUND SHOCK TOKYO 2023 出演"},{id:9,text:"2025-08-08 — 渋谷La.mamaにて初の自主企画「胎動」開催"}],r=()=>t.jsxs("div",{className:"fixed bottom-0 left-0 right-0 z-20 h-10 bg-black bg-opacity-70 backdrop-blur-sm overflow-hidden flex items-center",children:[t.jsx("div",{className:"w-full flex items-center whitespace-nowrap animate-ticker",children:[...a,...a].map((e,i)=>t.jsx("div",{className:"flex items-center mx-8",children:t.jsx("span",{className:"text-sm tracking-widest text-gray-300",children:e.text})},`${e.id}-${i}`))}),t.jsx("style",{children:`
        @keyframes ticker {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `})]});export{r as default};
