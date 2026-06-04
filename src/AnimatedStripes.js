import { useIsMobile } from './useIsMobile';

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

const STRIPES = [
  { left: '12%', dur: 26, delay:  0   },
  { left: '35%', dur: 32, delay: -10  },
  { left: '58%', dur: 24, delay: -16  },
  { left: '78%', dur: 29, delay: -6   },
  { left: '92%', dur: 22, delay: -20  },
];

export default function AnimatedStripes({ count = 4 }) {
  const isMobile = useIsMobile();

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {STRIPES.slice(0, count).map((st, i) => (
        <span key={i}>
          <div
            style={{
              position: 'absolute',
              left: st.left,
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--rn-rail)',
            }}
          />
          <div
            className="rn-beam"
            style={{
              position: 'absolute',
              left: `calc(${st.left} - 9px)`,
              top: 0,
              width: isMobile ? '14px' : '18px',
              height: '200px',
              background: `linear-gradient(to bottom, transparent 0%, var(--rn-beam-mid) 40%, var(--rn-beam-mid) 60%, transparent 100%)`,
              filter: 'blur(5px)',
              animation: `rnBeam ${st.dur}s linear ${st.delay}s infinite both`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
