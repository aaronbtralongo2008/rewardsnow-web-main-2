import { useIsMobile } from './useIsMobile';

;(() => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('vn-stripe-styles')) return;
  const el = document.createElement('style');
  el.id = 'vn-stripe-styles';
  el.textContent = `
    @keyframes vnBeam {
      0%   { transform: translateY(-240px); opacity: 0; }
      6%   { opacity: 1; }
      94%  { opacity: 1; }
      100% { transform: translateY(calc(100vh + 240px)); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .vn-beam { animation: none !important; opacity: 0 !important; }
    }
  `;
  document.head.appendChild(el);
})();

const STRIPES = [
  { left: '12%', dur: 26, delay:  0   },
  { left: '36%', dur: 32, delay: -10  },
  { left: '64%', dur: 24, delay: -17  },
  { left: '86%', dur: 29, delay: -6   },
];

export default function AnimatedStripes({ count = 4 }) {
  const isMobile = useIsMobile();
  const railOpacity = isMobile ? 0.06 : 0.1;

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
              background: `rgba(37,183,200,${railOpacity})`,
            }}
          />
          <div
            className="vn-beam"
            style={{
              position: 'absolute',
              left: `calc(${st.left} - 10px)`,
              top: 0,
              width: '21px',
              height: '240px',
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(37,183,200,0.16) 35%, rgba(37,183,200,0.22) 50%, rgba(37,183,200,0.16) 65%, transparent 100%)',
              filter: 'blur(7px)',
              animation: `vnBeam ${st.dur}s linear ${st.delay}s infinite both`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
