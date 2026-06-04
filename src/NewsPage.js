import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const BLUE  = '#0B5CAD';
const GOLD  = '#F2B84B';

export default function NewsPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'News — RewardsNow';
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
            maxWidth: '720px',
            margin: '0 auto',
            padding: isMobile ? '80px 24px' : '120px 80px',
          }}
        >
          {/* Gold eyebrow */}
          <p style={s.eyebrow}>COMPANY</p>

          {/* H1 */}
          <h1
            style={{
              ...s.h1,
              fontSize: isMobile ? '2.4rem' : '3.4rem',
            }}
          >
            News and updates.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Body */}
          <p style={s.body}>
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
    color: GOLD,
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
    background: GOLD,
    borderRadius: '2px',
    marginBottom: '28px',
  },
  body: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '17px',
    lineHeight: 1.75,
    margin: 0,
  },
  inlineLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    color: BLUE,
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'underline',
  },
};
