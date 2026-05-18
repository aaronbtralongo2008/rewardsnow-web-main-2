import { useEffect, useRef, useState } from 'react';

const noMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Wraps children in a div that fades + slides up on scroll into view.
 *
 * Props:
 *   delay  – transition delay in ms (stagger cards with 0, 80, 160, 240)
 *   style  – merged onto the wrapper (lets FadeInSection act as a grid child)
 */
export default function FadeInSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(noMotion);

  useEffect(() => {
    if (noMotion) return;
    const el = ref.current;
    if (!el) return;

    // threshold: 0.01 fires immediately for elements already in the viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: noMotion
          ? 'none'
          : `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
