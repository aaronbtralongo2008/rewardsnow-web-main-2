import { useEffect, useRef, useState } from 'react';

const noMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Wraps children in a div that fades + slides up when it enters the viewport.
 *
 * Props:
 *   delay  – ms before transition starts (use for staggered cards)
 *   style  – merged onto the wrapper div (useful for grid children)
 */
export default function FadeInSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  // Skip animation entirely if user prefers reduced motion
  const [visible, setVisible] = useState(noMotion);

  useEffect(() => {
    if (noMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -28px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: noMotion
          ? 'none'
          : `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
