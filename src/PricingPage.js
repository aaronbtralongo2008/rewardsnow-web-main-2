import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const LAGOON = '#0E96CD';
const YELLOW = '#F8C922';
const MUTED  = '#5F6B73';

export default function PricingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Pricing — Veniar';
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
        <section
          style={{
            padding: isMobile ? '80px 24px' : '120px 8%',
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {/* Gold eyebrow */}
          <p style={s.eyebrow}>PRICING</p>

          {/* H1 */}
          <h1
            style={{
              ...s.h1,
              fontSize: isMobile ? '2.4rem' : '3.4rem',
            }}
          >
            Pricing for independent businesses.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Body copy */}
          <p style={s.body}>
            Clear, direct pricing is coming soon. In the meantime, reach out to
            discuss your business needs and get early access details.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '40px',
            }}
          >
            <button
              style={s.btnPrimary}
              onClick={() => navigate('/contact')}
            >
              Contact us
            </button>
            <button
              style={s.btnGhost}
              onClick={() => navigate('/join')}
            >
              Join Veniar
            </button>
          </div>

          {/* Status note */}
          <p style={s.mutedNote}>
            Currently Building... Check back in! Any questions,{' '}
            <button
              style={s.inlineLink}
              onClick={() => navigate('/contact')}
            >
              contact support
            </button>
            .
          </p>
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
    margin: '0 auto 28px',
  },
  body: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: '0 auto',
    maxWidth: '540px',
  },
  btnPrimary: {
    padding: '14px 30px',
    background: LAGOON,
    border: 'none',
    color: '#FFFFFF',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  btnGhost: {
    padding: '13px 26px',
    background: 'transparent',
    border: '1.5px solid var(--vn-card-border, rgba(16,24,32,0.18))',
    color: 'var(--vn-text, var(--rn-text))',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  mutedNote: {
    color: MUTED,
    fontSize: '13px',
    marginTop: '36px',
    lineHeight: 1.6,
  },
  inlineLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    color: LAGOON,
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'underline',
  },
};
