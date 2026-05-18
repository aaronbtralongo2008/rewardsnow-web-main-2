import { useIsMobile } from './useIsMobile';

// Keyframes injected at module load — must exist before first render
;(() => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('rn-stripe-styles')) return;
  const el = document.createElement('style');
  el.id = 'rn-stripe-styles';
  el.textContent = `
    @keyframes rnBeam {
      0%   { transform: translateY(-220px); opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { transform: translateY(calc(100vh + 220px)); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .rn-beam { animation: none !important; opacity: 0 !important; }
    }
  `;
  document.head.appendChild(el);
})();

// 4 stripes — well-spaced, not cramped
// Slow durations (22–30s) feel premium and unobtrusive
const STRIPES = [
  { left: '15%', dur: 24, delay:  0  },
  { left: '38%', dur: 30, delay: -9  },
  { left: '63%', dur: 22, delay: -15 },
  { left: '84%', dur: 27, delay: -5  },
];

/**
 * Ultra-subtle vertical light stripes — sleek AI-startup / Spotify dark UI feel.
 * Fixed to viewport, completely non-interactive.
 *
 * Props:
 *   count – stripes to render (default 4; use 2–3 for narrow panels)
 */
export default function AnimatedStripes({ count = 4 }) {
  const isMobile = useIsMobile();
  const railOpacity = isMobile ? 0.02 : 0.05;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        // Horizontal accent — single hairline at very bottom of viewport only,
        // gives the page a subtle "floor" without a busy grid
        backgroundImage:
          'linear-gradient(to bottom, transparent 94%, rgba(255,255,255,0.03) 100%)',
      }}
    >
      {STRIPES.slice(0, count).map((st, i) => (
        <span key={i}>
          {/* 1px column guide — barely there */}
          <div
            style={{
              position: 'absolute',
              left: st.left,
              top: 0,
              bottom: 0,
              width: '1px',
              background: `rgba(255,255,255,${railOpacity})`,
            }}
          />
          {/* Light beam — almost white, whisper-level opacity */}
          <div
            className="rn-beam"
            style={{
              position: 'absolute',
              left: `calc(${st.left} - 8px)`,
              top: 0,
              width: '17px',
              height: '220px',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.18) 60%, transparent 100%)',
              filter: 'blur(6px)',
              animation: `rnBeam ${st.dur}s linear ${st.delay}s infinite both`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
