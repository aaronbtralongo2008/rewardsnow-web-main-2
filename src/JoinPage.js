import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import { useTheme } from './ThemeContext';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const LAGOON = '#0E96CD';
const ORANGE = '#D66024';
const YELLOW = '#F8C922';
const MUTED  = '#5F6B73';

export default function JoinPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isDark } = useTheme();
  const heroBg = isDark ? '#0A1211' : '#1295AA';

  useEffect(() => {
    document.title = 'Join Veniar';
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
            background: heroBg,
            maxWidth: '100%',
            paddingTop: isMobile ? 120 : 160,
            paddingBottom: isMobile ? 72 : 100,
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '0 24px' : '0 8%' }}>
          {/* Gold eyebrow */}
          <p style={s.eyebrow}>JOIN</p>

          {/* H1 */}
          <h1
            style={{
              ...s.h1,
              fontSize: isMobile ? '2.8rem' : '4.8rem',
              color: '#FFF8EA',
            }}
          >
            Join the Veniar network.
          </h1>

          {/* Gold accent bar */}
          <div style={{ ...s.goldBar, background: 'rgba(255,248,234,0.30)' }} />

          {/* Body */}
          <p style={{ ...s.body, color: 'rgba(255,248,234,0.68)' }}>
            Create your free account and start earning rewards at participating
            local businesses. <em>Veniar</em> is free for customers.
          </p>
          </div>
        </section>

        {/* ── Cards section ────────────────────────────────────────────── */}
        <section
          style={{
            background: 'var(--vn-panel, #F7E8CF)',
            padding: isMobile ? '48px 0 80px' : '64px 0 100px',
          }}
        >
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              padding: isMobile ? '0 24px' : '0 8%',
              textAlign: 'center',
            }}
          >
            {/* Routing cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '32px',
                justifyContent: 'center',
              }}
            >
              {/* Customer card */}
              <RoutingCard
                title="I'm a customer"
                description="Earn and redeem rewards at participating businesses."
                buttonLabel="Create account"
                buttonStyle="primary"
                accentColor={LAGOON}
                onButtonClick={() => navigate('/register')}
                isMobile={isMobile}
              />

              {/* Business card */}
              <RoutingCard
                title="I own a business"
                description="Apply to partner with Veniar and give your customers a shared rewards experience."
                buttonLabel="Apply to partner"
                buttonStyle="ghost"
                accentColor={ORANGE}
                onButtonClick={() => navigate('/business-overview')}
                isMobile={isMobile}
              />
            </div>

            {/* Sign-in link */}
            <p style={s.signinRow}>
              Already have an account?{' '}
              <button
                style={s.signinLink}
                onClick={() => navigate('/signin')}
              >
                Sign in →
              </button>
            </p>
          </div>
        </section>
      </main>

      <VeniarFooter />
    </div>
  );
}

function RoutingCard({ title, description, buttonLabel, buttonStyle, accentColor, onButtonClick, isMobile }) {
  return (
    <div
      className="vn-card"
      style={{
        background: 'var(--vn-card, #FFFFFF)',
        borderTop: `3px solid ${accentColor}`,
        borderRadius: '16px',
        padding: '40px 36px',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'box-shadow 0.18s ease, transform 0.18s ease',
        cursor: 'default',
        flex: isMobile ? 'none' : 1,
      }}
    >
      <div style={{ width: 32, height: 3, background: accentColor, borderRadius: 2, marginBottom: 4, opacity: 0.5 }} />
      <p
        style={{
          color: 'var(--vn-text, var(--rn-text))',
          fontSize: '17px',
          fontWeight: '800',
          margin: 0,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: MUTED,
          fontSize: '14px',
          lineHeight: 1.65,
          margin: '0 0 4px',
          flex: 1,
        }}
      >
        {description}
      </p>
      {buttonStyle === 'primary' ? (
        <button
          style={{
            padding: '12px 24px',
            background: accentColor,
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '9px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            fontFamily: 'inherit',
            alignSelf: 'flex-start',
          }}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      ) : (
        <button
          style={{
            padding: '11px 24px',
            background: 'transparent',
            border: '1.5px solid var(--vn-card-border, rgba(16,24,32,0.18))',
            color: 'var(--vn-text, var(--rn-text))',
            borderRadius: '9px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'inherit',
            alignSelf: 'flex-start',
          }}
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      )}
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
    margin: '0 auto 28px',
  },
  body: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: '0 auto',
    maxWidth: '520px',
  },
  signinRow: {
    color: MUTED,
    fontSize: '14px',
    marginTop: '40px',
  },
  signinLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    color: LAGOON,
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'underline',
  },
};
