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

// Snap-to-nearest behavior: detect when scrolling stops and programmatically
// scroll to the nearest `.snap-section`. This helps on mobile where momentum
// scrolling can stop between snap points in some browsers.
(() => {
  let snapTimer: number | null = null;
  // track where the last touch/pointer started so we can avoid stealing
  // gestures that begin in nested scrollable areas (e.g. releases list)
  let lastTouchStartedInsideScrollable = false;
  // track touch Y to detect pull-down at top of page
  let lastTouchY: number | null = null;
  let lastTouchMoveDelta = 0;
  const headerHeight = () => {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '88px';
    return parseInt(v, 10) || 88;
  };

  function snapToNearest() {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));
    if (!sections.length) return;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const pad = headerHeight();
    const liftRaw = getComputedStyle(document.documentElement).getPropertyValue('--snap-lift') || '0px';
    const lift = parseInt(liftRaw, 10) || 0;

  // If the last gesture started inside a nested scrollable element, don't
  // perform global snapping — the user likely intends to scroll inside that
  // area (e.g. the releases list). This avoids jumping the page while the
  // user interacts with inner content on mobile.
  if (lastTouchStartedInsideScrollable) return;

  // Only consider sections whose title (h2 inside PageContainer) is at least
    // partially visible in the viewport — this makes snapping trigger when the
    // section title actually appears on screen rather than from a large distance.
    let closest: HTMLElement | null = null;
    let minDist = Infinity;
    sections.forEach((s) => {
      try {
        const title = s.querySelector('h2');
        if (title) {
          const tr = title.getBoundingClientRect();
          // title is at least partially visible
          const titleVisible = tr.top < window.innerHeight && tr.bottom > 0;
          if (!titleVisible) return;
          // distance from top of viewport (account for header and lift)
          const top = s.getBoundingClientRect().top + scrollY - pad + lift;
          const dist = Math.abs(top - scrollY);
          if (dist < minDist) {
            minDist = dist;
            closest = s;
          }
        } else {
          // fallback: if no title, ignore this section for the new heuristic
          return;
        }
      } catch (e) {
        // ignore any DOM read errors and skip
        return;
      }
    });
  // Only snap if the distance is noticeable to avoid small jumps.
  // Use a larger threshold on small screens so snapping only occurs when
  // the user has scrolled a meaningful distance (narrows the effective
  // snap area on mobile). This reduces accidental snapping on phones.
  const isMobile = window.innerWidth <= 767;
  // Make snapping more likely on mobile by reducing the threshold (wider
  // effective snap range). Lower values = easier to snap.
  const SNAP_THRESHOLD = isMobile ? 24 : 32; // px
    if (closest && minDist > SNAP_THRESHOLD) {
      const targetTop = closest.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - pad + lift;
      // use smooth native scrolling; JS fallback remains gentle
      window.scrollTo({ top: Math.max(0, Math.round(targetTop)), behavior: 'smooth' });
    }
  }

  function onScroll() {
    if (snapTimer) window.clearTimeout(snapTimer);
    // wait a bit longer after scrolling stops to avoid snapping during small gestures
    snapTimer = window.setTimeout(() => {
      snapTimer = null;
      snapToNearest();
    }, 260) as unknown as number;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Helper: determine if an element (or its ancestors) is a scrollable container
  function hasScrollableAncestor(el: EventTarget | null) {
    try {
      let node = el as Node | null;
      while (node && node instanceof HTMLElement) {
        const style = getComputedStyle(node);
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight) return true;
        node = node.parentElement;
      }
    } catch (e) {}
    return false;
  }

  // Track touchstart to know where the gesture began.
  window.addEventListener('touchstart', (ev) => {
    lastTouchStartedInsideScrollable = hasScrollableAncestor(ev.target);
    // record initial touch Y
    try { lastTouchY = (ev as TouchEvent).touches && (ev as TouchEvent).touches[0] ? (ev as TouchEvent).touches[0].clientY : null; } catch {}
    lastTouchMoveDelta = 0;
    // if a touchstart occurs, cancel any pending snap to avoid jumping mid-gesture
    if (snapTimer) { window.clearTimeout(snapTimer); snapTimer = null; }
  }, { passive: true });

  // track touchmove direction to detect pull-down at very top
  window.addEventListener('touchmove', (ev) => {
    try {
      const t = (ev as TouchEvent).touches && (ev as TouchEvent).touches[0];
      if (t && lastTouchY != null) {
        const delta = t.clientY - lastTouchY;
        lastTouchMoveDelta = delta;
      }
    } catch {}
  }, { passive: true });

  window.addEventListener('touchend', () => {
    // After touchend, schedule an immediate snap if appropriate
    if (snapTimer) window.clearTimeout(snapTimer);
    snapTimer = window.setTimeout(() => {
      snapTimer = null;
      // If the user pulled down at the top of the page (positive delta while
      // scrollY is at/near 0), don't run global snap — this was causing the
      // odd behavior when slightly pulling down at the top on mobile.
      if ((window.scrollY || window.pageYOffset) <= 8 && lastTouchMoveDelta > 6) {
        lastTouchStartedInsideScrollable = false;
        lastTouchY = null;
        lastTouchMoveDelta = 0;
        return;
      }
      snapToNearest();
      lastTouchStartedInsideScrollable = false;
      lastTouchY = null;
      lastTouchMoveDelta = 0;
    }, 200) as unknown as number;
  }, { passive: true });

  // Wheel/mouse end: similar behavior but don't use the nested-scroll guard
  window.addEventListener('wheel', () => { if (snapTimer) window.clearTimeout(snapTimer); snapTimer = window.setTimeout(snapToNearest, 200) as unknown as number; }, { passive: true });
})();

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