// ── Inject keyframes synchronously at module load ─────────────────────────
// Must happen BEFORE any component mounts, otherwise browsers won't
// retroactively start animations whose keyframe rule didn't exist at mount time.
;(() => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('rn-stripe-styles')) return;
  const el = document.createElement('style');
  el.id = 'rn-stripe-styles';
  el.textContent = `
    @keyframes rnBeam {
      0%   { transform: translateY(-260px); opacity: 0; }
      4%   { opacity: 1; }
      96%  { opacity: 1; }
      100% { transform: translateY(calc(100vh + 260px)); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .rn-beam { animation: none !important; opacity: 0 !important; }
    }
  `;
  document.head.appendChild(el);
})();

// ── Stripe configs — all blue, varying speed and phase ────────────────────
// delay is negative so beams start mid-cycle and are immediately visible on load
const STRIPES = [
  { left: '8%',  color: 'rgba(59,130,246,1)',    dur:  9, delay:  0  },
  { left: '21%', color: 'rgba(96,165,250,0.9)',  dur: 13, delay: -3  },
  { left: '35%', color: 'rgba(59,130,246,0.95)', dur: 10, delay: -7  },
  { left: '50%', color: 'rgba(34,211,238,0.85)', dur: 12, delay: -5  },
  { left: '64%', color: 'rgba(59,130,246,0.95)', dur: 11, delay: -9  },
  { left: '79%', color: 'rgba(96,165,250,0.9)',  dur: 14, delay: -2  },
  { left: '91%', color: 'rgba(59,130,246,0.9)',  dur: 10, delay: -6  },
];

/**
 * Linear-style animated vertical stripe grid.
 *
 * Renders visible 1px column rails, scanning blue glow beams, and a subtle
 * horizontal grid — fixed to the viewport so it works on any page height.
 *
 * Props:
 *   count – stripes to show (default 6; use 4 for narrow panels like login)
 */
export default function AnimatedStripes({ count = 6 }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        // Horizontal grid lines — the "blocking" cells Linear uses
        backgroundImage: [
          'repeating-linear-gradient(to bottom,',
          '  transparent,',
          '  transparent 99px,',
          '  rgba(148,163,184,0.09) 99px,',
          '  rgba(148,163,184,0.09) 100px',
          ')',
        ].join(' '),
      }}
    >
      {STRIPES.slice(0, count).map((st, i) => (
        // Each stripe is two separate elements so overflow:hidden on the
        // rail doesn't clip the wider glow spread of the beam.
        <span key={i}>
          {/* 1px visible column guide */}
          <div
            style={{
              position: 'absolute',
              left: st.left,
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'rgba(255,255,255,0.13)',
            }}
          />
          {/* Glow beam — wider than the rail, centered on it via calc() */}
          <div
            className="rn-beam"
            style={{
              position: 'absolute',
              left: `calc(${st.left} - 20px)`,
              top: 0,
              width: '41px',
              height: '260px',
              background: `linear-gradient(to bottom,
                transparent 0%,
                ${st.color} 30%,
                ${st.color} 70%,
                transparent 100%)`,
              filter: 'blur(16px)',
              animation: `rnBeam ${st.dur}s linear ${st.delay}s infinite both`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
