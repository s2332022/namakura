import React, { useEffect, useRef, useState } from 'react';

type Release = {
  title: string;
  type?: string;
  year?: string;
  artwork: string;
  link?: string;
  spotify?: string;
};

type Props = {
  items: Release[];
  autoplayInterval?: number;
  onSelect?: (index: number) => void;
};

const MusicCarousel: React.FC<Props> = ({ items, autoplayInterval = 3000, onSelect }) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(1); // start at 1 because of clones
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [gap, setGap] = useState(16);
  const [isPaused, setIsPaused] = useState(false);

  // build slides with clones (last, ...items, first)
  const slides = items.length > 0 ? [items[items.length - 1], ...items, items[0]] : [];

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const first = container.querySelector<HTMLElement>('.carousel-slide');
      if (first) {
        const rect = first.getBoundingClientRect();
        const style = window.getComputedStyle(first);
        const mr = parseFloat(style.marginRight || '16') || 16;
        setItemWidth(rect.width);
        setGap(mr);
      }
      setContainerWidth(container.clientWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [items]);

  // autoplay
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const id = window.setInterval(() => {
      goTo(current + 1);
    }, autoplayInterval);
    return () => window.clearInterval(id);
  }, [current, isPaused, autoplayInterval, items.length]);

  const goTo = (index: number, withTransition = true) => {
    setIsTransitioning(withTransition);
    setCurrent(index);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // handle seamless loop after transition
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onTransitionEnd = () => {
      // if we moved to the cloned first (index === slides.length-1) jump to 1
      if (current >= slides.length - 1) {
        setIsTransitioning(false);
        setCurrent(1);
        // re-enable transition on next frame so future moves animate
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
      }
      // if we moved to the cloned last (index === 0) jump to slides.length-2
      if (current === 0) {
        setIsTransitioning(false);
        setCurrent(slides.length - 2);
        requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
      }
    };
    track.addEventListener('transitionend', onTransitionEnd);
    return () => track.removeEventListener('transitionend', onTransitionEnd);
  }, [current, slides.length]);

  // compute transform (center active slide)
  const slideFull = (itemWidth || 0) + (gap || 0);
  const offset = containerWidth ? (containerWidth - slideFull) / 2 : 0;
  const translateX = containerWidth ? offset - current * slideFull : 0;

  // dot index (map current to items index)
  const activeDot = ((current - 1) % items.length + items.length) % items.length;

  return (
    <div
      className="carousel container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          ref={trackRef}
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: isTransitioning ? 'transform 480ms cubic-bezier(.22,.9,.31,1)' : 'none',
            paddingLeft: offset,
          }}
        >
          {slides.map((s, i) => {
            const itemIndex = ((i - 1) % items.length + items.length) % items.length;
            const handleClick = (e: React.MouseEvent) => {
              e.preventDefault();
              if (typeof onSelect === 'function') {
                onSelect(itemIndex);
                return;
              }
              // fallback: open link if external, otherwise navigate to anchor
              if (s.link && /^https?:\/\//.test(s.link)) {
                window.open(s.link, '_blank', 'noopener');
              } else if (s.link && s.link.startsWith('#')) {
                const id = s.link.slice(1);
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            };

            return (
              <div className="carousel-slide" key={`${s.title}-${i}`}>
                <button className="carousel-click-area" onClick={handleClick} aria-label={s.title}>
                  <img src={s.artwork} alt={s.title} className="carousel-image" />
                </button>
                <div className="carousel-caption">
                  <div className="carousel-title">{s.title}</div>
                  <div className="carousel-link">{s.type} · {s.year}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <button className="carousel-control prev" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <button className="carousel-control next" onClick={next} aria-label="Next">
        ›
      </button>

      {/* dots */}
      <div className="carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === activeDot ? 'active' : ''}`}
            onClick={() => goTo(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicCarousel;
