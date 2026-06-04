import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const BLUE  = '#0B5CAD';
const GOLD  = '#F2B84B';
const MUTED = '#5F6B73';

export default function ContactPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Contact — Veniar';
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
          <p style={s.eyebrow}>SUPPORT</p>

          {/* H1 */}
          <h1
            style={{
              ...s.h1,
              fontSize: isMobile ? '2.4rem' : '3.4rem',
            }}
          >
            Contact Veniar.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Contact info rows */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            <div style={s.contactRow}>
              <p style={s.contactLabel}>For general questions and support:</p>
              <a href="mailto:hello@veniar.com" style={s.emailLink}>
                hello@veniar.com
              </a>
            </div>

            <div style={s.contactRow}>
              <p style={s.contactLabel}>For legal matters:</p>
              <a href="mailto:legal@rewards-now.net" style={s.emailLink}>
                legal@rewards-now.net
              </a>
            </div>

            <div style={s.contactRow}>
              <p style={s.contactLabel}>For business partnerships:</p>
              <a href="mailto:hello@veniar.com" style={s.emailLink}>
                hello@veniar.com
              </a>
            </div>
          </div>

          {/* Response time note */}
          <p style={s.responseNote}>
            We respond within 1–2 business days.
          </p>

          {/* Self-service support card */}
          <div
            className="vn-card"
            style={{
              ...s.supportCard,
              padding: isMobile ? '24px 20px' : '28px 28px',
              marginTop: '48px',
            }}
          >
            <p style={s.cardTitle}>Looking for self-service support?</p>
            <p style={s.cardDesc}>
              Browse our help topics for quick answers to common questions.
            </p>
            <button
              style={s.btnPrimary}
              onClick={() => navigate('/support')}
            >
              Browse support topics
            </button>
          </div>

          {/* Parent company note */}
          <p style={s.parentNote}>
            Veniar is a product of{' '}
            <a
              href="https://rewards-now.net"
              target="_blank"
              rel="noopener noreferrer"
              style={s.externalLink}
            >
              RewardsNow
            </a>
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
    marginBottom: '40px',
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  contactLabel: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '15px',
    lineHeight: 1.5,
    margin: 0,
  },
  emailLink: {
    color: BLUE,
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  responseNote: {
    color: MUTED,
    fontSize: '14px',
    lineHeight: 1.6,
    margin: 0,
  },
  supportCard: {
    background: 'var(--vn-card, #FFFFFF)',
    border: '1px solid var(--vn-card-border, rgba(16,24,32,0.12))',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  cardTitle: {
    color: 'var(--vn-text, var(--rn-text))',
    fontSize: '16px',
    fontWeight: '800',
    margin: 0,
    letterSpacing: '-0.02em',
  },
  cardDesc: {
    color: MUTED,
    fontSize: '14px',
    lineHeight: 1.65,
    margin: '0 0 6px',
  },
  btnPrimary: {
    padding: '12px 24px',
    background: BLUE,
    border: 'none',
    color: '#FFFFFF',
    borderRadius: '9px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'inherit',
    alignSelf: 'flex-start',
  },
  parentNote: {
    color: MUTED,
    fontSize: '13px',
    marginTop: '32px',
  },
  externalLink: {
    color: BLUE,
    fontWeight: '600',
    textDecoration: 'none',
  },
};
