import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fix mobile 100vh issue: set a CSS variable --vh to 1% of the actual viewport height
// and update it on resize. This prevents scroll-snap glitches when browser UI hides/shows.
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('resize', setVh);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);