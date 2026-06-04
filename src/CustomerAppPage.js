import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const CYAN   = '#00A9C8';
const LAGOON = '#1677B8';
const YELLOW = '#F5C84B';
const MUTED  = '#5F6B73';

const FEATURES = [
  {
    num: '01',
    heading: 'Track your balance.',
    body: (
      <>
        See your <em>Veniar</em> Points balance at any time. Your balance updates
        instantly after every transaction.
      </>
    ),
  },
  {
    num: '02',
    heading: 'Browse partner locations.',
    body: (
      <>
        Find every business in the <em>Veniar</em> network. Filter by category,
        neighborhood, or distance.
      </>
    ),
  },
  {
    num: '03',
    heading: 'View your history.',
    body: (
      <>
        Every earn and redemption is logged. See exactly where you earned, where you
        spent, and how much.
      </>
    ),
  },
];

export default function CustomerAppPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Customer App — Veniar';
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
          <p style={s.eyebrow}>CUSTOMERS</p>

          {/* H1 */}
          <h1 style={{ ...s.h1, fontSize: isMobile ? '2.4rem' : '3.4rem' }}>
            The Veniar customer experience.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />
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
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Primary CTA */}
            <div>
              <button
                className="vn-cta-primary"
                style={s.btnPrimary}
                onClick={() => navigate('/register')}
              >
                Create your free account
              </button>
            </div>

            {/* Secondary sign-in link */}
            <p style={{ margin: 0, color: MUTED, fontSize: '15px', lineHeight: 1.5 }}>
              Already have an account?{' '}
              <Link to="/signin" style={s.inlineLink}>
                Sign in →
              </Link>
            </p>
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
  featureBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  numBadge: {
    display: 'inline-block',
    alignSelf: 'flex-start',
    background: 'rgba(0,169,200,0.12)',
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
  inlineLink: {
    color: LAGOON,
    fontWeight: '600',
    textDecoration: 'none',
  },
};
