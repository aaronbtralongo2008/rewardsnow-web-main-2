import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const CYAN   = '#1692A2';
const LAGOON = '#0E96CD';
const YELLOW = '#F8C922';

const FEATURES = [
  {
    num: '01',
    heading: 'Real-time activity.',
    body: 'See every point issuance and redemption as it happens. Filter by date, employee, or customer.',
  },
  {
    num: '02',
    heading: 'Employee management.',
    body: 'Add staff accounts so your team can issue and redeem points at checkout without sharing owner credentials.',
  },
  {
    num: '03',
    heading: 'Point rate control.',
    body: (
      <>
        Set how many <em>Veniar</em> Points customers earn per dollar spent at your
        location.
      </>
    ),
  },
];

export default function MerchantDashboardPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Merchant Dashboard — Veniar';
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
          <p style={s.eyebrow}>BUSINESSES</p>

          {/* H1 */}
          <h1 style={{ ...s.h1, fontSize: isMobile ? '2.4rem' : '3.4rem' }}>
            The merchant dashboard.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Intro body copy */}
          <p style={s.introPara}>
            Every <em>Veniar</em> partner gets access to a real-time dashboard to manage
            their loyalty program.
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
              Interested in joining the network?
            </h2>

            <button
              className="vn-cta-primary"
              style={s.btnPrimary}
              onClick={() => navigate('/business-overview')}
            >
              Apply to partner
            </button>
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
    letterSpacing: '-0.03em',
    margin: '0 0 24px',
  },
  goldBar: {
    width: '48px',
    height: '3px',
    background: YELLOW,
    borderRadius: '2px',
    marginBottom: '28px',
  },
  introPara: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: 0,
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
};
