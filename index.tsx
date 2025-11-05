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

// Toggle header scrolled state to apply blurred/translucent background
function setHeaderScrolled() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
setHeaderScrolled();
window.addEventListener('scroll', () => {
  // throttle lightly using requestAnimationFrame
  requestAnimationFrame(setHeaderScrolled);
});

// Update a CSS variable with the current scroll Y (px) so components can
// implement lightweight parallax effects using CSS. Use rAF to avoid jank.
// Update a CSS variable with the current scroll Y (px) so components can
// implement lightweight parallax effects using CSS. Use rAF to avoid jank.
function updateScrollVar() {
  const y = window.scrollY || window.pageYOffset || 0;
  document.documentElement.style.setProperty('--scroll-y', `${y}px`);
}
updateScrollVar();
window.addEventListener('scroll', () => requestAnimationFrame(updateScrollVar));

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