import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const CYAN   = '#1692A2';
const LAGOON = '#0E96CD';
const YELLOW = '#F8C922';
const MUTED  = '#5F6B73';

const FEATURES = [
  {
    num: '01',
    heading: 'One network. Many businesses.',
    body: (
      <>
        Customers earn <em>Veniar</em> Points across every partner location. Their balance
        goes with them wherever they shop — no separate cards, no separate apps.
      </>
    ),
  },
  {
    num: '02',
    heading: 'Built for local commerce.',
    body: (
      <>
        <em>Veniar</em> is designed for independent restaurants, cafés, and local shops.
        Partners get the same loyalty infrastructure that large chains use, without the
        complexity or cost.
      </>
    ),
  },
  {
    num: '03',
    heading: 'Real-time, transparent.',
    body: (
      <>
        Every transaction is recorded instantly. Customers see their balance update in
        real time. Business owners see redemption activity in their dashboard.
      </>
    ),
  },
];

export default function VeniarProductPage() {
  const navigate  = useNavigate();
  const isMobile  = useIsMobile();

  useEffect(() => {
    document.title = 'Veniar — Shared Rewards';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--vn-bg, var(--rn-bg))',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <VeniarNav />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: isMobile ? '80px 24px 64px' : '120px 8% 80px',
          }}
        >
          {/* Gold eyebrow */}
          <p style={s.eyebrow}>PRODUCT</p>

          {/* H1 */}
          <h1 style={{ ...s.h1, fontSize: isMobile ? '3rem' : '4.2rem' }}>
            Veniar.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Subtitle */}
          <p
            style={{
              color: MUTED,
              fontSize: isMobile ? '1.15rem' : '1.35rem',
              lineHeight: 1.55,
              margin: 0,
              fontWeight: '500',
            }}
          >
            A shared rewards platform for independent businesses.
          </p>
        </section>

        {/* ── Feature blocks ───────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: isMobile ? '0 24px 64px' : '0 8% 80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          {FEATURES.map((f) => (
            <div key={f.num} style={s.featureBlock}>
              {/* Teal number badge */}
              <span style={s.numBadge}>{f.num}</span>

              {/* Feature heading */}
              <h2
                style={{
                  ...s.featureHeading,
                  fontSize: isMobile ? '1.3rem' : '1.55rem',
                }}
              >
                {f.heading}
              </h2>

              {/* Feature body */}
              <p style={s.featureBody}>{f.body}</p>
            </div>
          ))}
        </section>

        {/* ── CTA section ──────────────────────────────────────────────── */}
        <section
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: isMobile ? '0 24px 100px' : '0 8% 120px',
          }}
        >
          <div
            className="vn-card"
            style={{
              background: 'var(--vn-card, #FFFFFF)',
              border: '1px solid var(--vn-card-border, rgba(16,24,32,0.12))',
              borderRadius: '16px',
              padding: isMobile ? '32px 24px' : '44px 40px',
            }}
          >
            <h2
              style={{
                color: 'var(--vn-text, var(--rn-text))',
                fontSize: isMobile ? '1.4rem' : '1.75rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                margin: '0 0 28px',
              }}
            >
              Ready to join the network?
            </h2>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <button
                className="vn-cta-primary"
                style={s.btnPrimary}
                onClick={() => navigate('/join')}
              >
                Join Veniar
              </button>
              <button
                className="vn-cta-ghost"
                style={s.btnGhost}
                onClick={() => navigate('/business-overview')}
              >
                For businesses
              </button>
            </div>
          </div>
        </section>
      </main>

      <VeniarFooter />
    </div>
  );
}

const s = {
  eyebrow: {
    color: YELLOW,
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    margin: '0 0 20px',
  },
  h1: {
    color: 'var(--vn-text, var(--rn-text))',
    fontWeight: '900',
    lineHeight: 1.06,
    letterSpacing: '-0.04em',
    margin: '0 0 24px',
  },
  goldBar: {
    width: '48px',
    height: '3px',
    background: YELLOW,
    borderRadius: '2px',
    marginBottom: '28px',
  },
  featureBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  numBadge: {
    display: 'inline-block',
    alignSelf: 'flex-start',
    background: 'rgba(22,146,162,0.12)',
    color: CYAN,
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '2px',
    padding: '4px 10px',
    borderRadius: '20px',
    marginBottom: '4px',
  },
  featureHeading: {
    color: 'var(--vn-text, var(--rn-text))',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    margin: 0,
  },
  featureBody: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: 0,
  },
  btnPrimary: {
    padding: '13px 26px',
    background: LAGOON,
    border: 'none',
    color: '#FFFFFF',
    borderRadius: '9px',
    fontSize: '15px',
    fontWeight: '700',
    fontFamily: 'inherit',
  },
  btnGhost: {
    padding: '12px 24px',
    background: 'transparent',
    border: '1.5px solid var(--rn-ghost-border, rgba(16,24,32,0.20))',
    color: 'var(--vn-text, var(--rn-text))',
    borderRadius: '9px',
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'inherit',
  },
};
