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

// Programmatic snap behavior removed per user request.
// If you want to re-enable guarded snapping later, we can add an opt-in
// implementation that only activates under a feature flag.

// Preload the main local background image with high priority so mobile
// opening the URL shows the photo quickly. Use the same BASE_URL logic
// as App so the path works under subpaths.
(() => {
  try {
    const base = (import.meta as any).env?.BASE_URL ?? '/';
    const defaultLocal = `${base}assets/background.jpg`;
    const img = new Image();
    // Hint the browser this is high-priority; some browsers support fetchPriority
    // and the `loading` attribute. This helps mobile show the hero background faster.
    try {
      img.setAttribute('fetchpriority', 'high');
    } catch {}
    img.loading = 'eager';
    img.src = defaultLocal;
    // If decode() is supported, wait for decode so pixels are ready earlier.
    if ((img as any).decode) {
      (img as any).decode().catch(() => {}).then(() => {
        // nothing to do; having the image in cache is useful for BackgroundSlider
      });
    }
  } catch (e) {
    // no-op on any failures; it's an optimization only
  }
})();

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