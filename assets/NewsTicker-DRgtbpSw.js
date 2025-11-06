import{r as i,j as e}from"./index-Cdv3HJHI.js";const c=[{id:1,text:"2023-11-01 — 1stシングル「BRAVMEN」eggs先行リリース"},{id:2,text:"2023-11-21 — 2ndシングル「煙草」eggs先行リリース"},{id:3,text:"2024-04-14 — 3rdシングル「灯籠」eggs先行リリース"},{id:4,text:"2024-10-15 — 4thシングル「Diorama」先行リリース"},{id:5,text:"2025-06-01 — 5thシングル「theatre.V」リリース"},{id:6,text:"2025-08-08 — 1stアルバム「胎動」リリース（渋谷La.mama会場限定盤あり）"},{id:7,text:"2023-03-08 — なまくらメトロとして初ライブ（shibuya CYCLONE）"},{id:8,text:"2023-08-24 — SOUND SHOCK TOKYO 2023 出演"},{id:9,text:"2025-08-08 — 渋谷La.mamaにて初の自主企画「胎動」開催"}],p=()=>{const o=i.useRef(null),n=i.useRef(null),[a,d]=i.useState({distance:0,duration:10}),l=30;return i.useEffect(()=>{if(!n.current)return;const t=()=>{const m=n.current.scrollWidth/2,r=Math.round(m),u=Math.max(4,Math.round(r/l));d({distance:r,duration:u})},s=setTimeout(t,50);return window.addEventListener("resize",t),document.fonts&&document.fonts.ready&&document.fonts.ready.then(t).catch(()=>{}),()=>{clearTimeout(s),window.removeEventListener("resize",t)}},[]),e.jsxs("div",{className:"fixed bottom-0 left-0 right-0 z-20 h-10 bg-black bg-opacity-70 backdrop-blur-sm overflow-hidden flex items-center",children:[e.jsx("div",{ref:o,className:"w-full flex items-center whitespace-nowrap",style:{"--ticker-distance":`-${a.distance}px`,"--ticker-duration":`${a.duration}s`},children:e.jsx("div",{ref:n,className:"flex items-center",style:{display:"inline-flex"},children:[...c,...c].map((t,s)=>e.jsx("div",{className:"flex items-center mx-8",children:e.jsx("span",{className:"text-sm tracking-widest text-gray-300",children:t.text})},`${t.id}-${s}`))})}),e.jsx("style",{children:`
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
      `})]})};export{p as default};
