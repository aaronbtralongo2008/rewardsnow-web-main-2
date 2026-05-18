import { useEffect } from 'react';

// Injects keyframes once into <head> — safe to call multiple times
const STYLE_ID = 'rn-stripe-styles';
function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = `
    @keyframes rn-beam-scan {
      0%   { transform: translateY(-180px); opacity: 0; }
      6%   { opacity: 1; }
      94%  { opacity: 1; }
      100% { transform: translateY(calc(100vh + 180px)); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .rn-beam { animation: none !important; opacity: 0 !important; }
    }
  `;
  document.head.appendChild(el);
}

// Each entry: left position, peak beam color (rgba), scan duration (s), start offset (s)
const BEAM_CONFIGS = [
  { left: '10%', color: 'rgba(37,99,235,0.65)',  dur: 18, delay:   0 },
  { left: '24%', color: 'rgba(6,182,212,0.5)',   dur: 23, delay:  -7 },
  { left: '40%', color: 'rgba(37,99,235,0.6)',   dur: 16, delay: -12 },
  { left: '57%', color: 'rgba(217,70,239,0.4)',  dur: 21, delay:  -4 },
  { left: '73%', color: 'rgba(6,182,212,0.5)',   dur: 26, delay: -16 },
  { left: '87%', color: 'rgba(37,99,235,0.55)',  dur: 19, delay:  -9 },
  { left: '94%', color: 'rgba(245,158,11,0.3)',  dur: 22, delay:  -3 },
];

/**
 * Renders subtle vertical light-beam stripes fixed to the viewport.
 * Drop this as a direct child of any dark-background page root.
 *
 * Props:
 *   count  – how many stripes to render (default 6, use 4 for narrow panels)
 */
export default function AnimatedStripes({ count = 6 }) {
  useEffect(ensureStyles, []);

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
      {BEAM_CONFIGS.slice(0, count).map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.left,
            top: 0,
            bottom: 0,
            width: '1px',
            // faint white rail — barely visible, just a guide
            background: 'rgba(255,255,255,0.035)',
            overflow: 'hidden',
          }}
        >
          {/* The glowing beam that scans down the rail */}
          <div
            className="rn-beam"
            style={{
              position: 'absolute',
              top: 0,
              left: '-6px',
              right: '-6px',
              height: '180px',
              background: `linear-gradient(to bottom,
                transparent 0%,
                ${b.color} 35%,
                ${b.color} 65%,
                transparent 100%)`,
              filter: 'blur(8px)',
              animationName: 'rn-beam-scan',
              animationDuration: `${b.dur}s`,
              animationTimingFunction: 'linear',
              animationDelay: `${b.delay}s`,
              animationIterationCount: 'infinite',
              animationFillMode: 'both',
            }}
          />
        </div>
      ))}
    </div>
  );
}
