import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const CYAN   = '#1692A2';
const LAGOON = '#0E96CD';
const YELLOW = '#F8C922';
const MUTED  = '#5F6B73';

const CATEGORIES = [
  {
    id: 'getting-started',
    title: 'Getting started',
    answer:
      'Create a free account at veniar.com/register. Once registered, give your phone number at checkout at any partner location to start earning <em>Veniar</em> Points.',
  },
  {
    id: 'earning-points',
    title: 'Earning points',
    answer:
      'You earn <em>Veniar</em> Points every time you make a purchase at a participating partner business. The exact rate may vary by location.',
  },
  {
    id: 'redeeming-points',
    title: 'Redeeming points',
    answer:
      'Tell the cashier at any <em>Veniar</em> partner location that you\'d like to redeem points. They will look up your account and apply your balance to your purchase.',
  },
  {
    id: 'account-profile',
    title: 'Account & profile',
    answer:
      'You can update your name, email, phone number, and password from the Settings page after signing in. If you need to close your account, contact support.',
  },
  {
    id: 'business-partners',
    title: 'Business partners',
    answer:
      'To apply to become a <em>Veniar</em> partner, visit the business overview page and complete the application. Our team will follow up within a few business days.',
  },
  {
    id: 'technical-issues',
    title: 'Technical issues',
    answer:
      'If you\'re experiencing login issues, try resetting your password. For other technical problems, email hello@veniar.com with a description of the issue.',
  },
  {
    id: 'privacy-data',
    title: 'Privacy & data',
    answer:
      '<em>Veniar</em> collects only the information needed to operate your rewards account. We do not sell your personal data. See our Privacy Policy for details.',
  },
  {
    id: 'billing-pricing',
    title: 'Billing & pricing',
    answer:
      '<em>Veniar</em> is free for customers. Business pricing information is available on the Pricing page, or by contacting us directly.',
  },
];

export default function SupportPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    document.title = 'Support — Veniar';
    window.scrollTo(0, 0);
  }, []);

  function toggle(id) {
    setOpenId(prev => (prev === id ? null : id));
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--vn-bg, var(--rn-bg))',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <VeniarNav />

      <main style={{ paddingTop: 64 }}>
        <section
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            padding: isMobile ? '80px 24px' : '120px 8%',
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
            Help &amp; support.
          </h1>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Subtext */}
          <p style={s.subtext}>
            Find answers to common questions below, or contact us directly.
          </p>

          {/* Contact CTA row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '56px',
            }}
          >
            <a href="mailto:hello@veniar.com" style={s.btnPrimary}>
              Email support
            </a>
            <button
              style={s.btnGhost}
              onClick={() => navigate('/contact')}
            >
              Contact page
            </button>
          </div>

          {/* Accordion */}
          <div
            style={{
              borderTop: '1px solid var(--vn-card-border, rgba(16,24,32,0.12))',
            }}
          >
            {CATEGORIES.map((cat) => {
              const isOpen = openId === cat.id;
              const panelId = `panel-${cat.id}`;
              const triggerId = `trigger-${cat.id}`;
              return (
                <div
                  key={cat.id}
                  style={{
                    borderBottom: '1px solid var(--vn-card-border, rgba(16,24,32,0.12))',
                  }}
                >
                  {/* Trigger button */}
                  <button
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(cat.id)}
                    style={{
                      ...s.triggerBtn,
                      background: isOpen
                        ? 'rgba(22,146,162,0.07)'
                        : 'var(--vn-bg, var(--rn-bg))',
                    }}
                  >
                    <span style={s.triggerTitle}>{cat.title}</span>
                    <span
                      style={s.triggerIndicator}
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {/* Collapsible panel */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    style={{
                      maxHeight: isOpen ? '800px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p
                      style={s.panelText}
                      dangerouslySetInnerHTML={{ __html: cat.answer }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Still need help card */}
          <div
            className="vn-card"
            style={{
              background: 'var(--vn-card, #FFFFFF)',
              border: '1px solid var(--vn-card-border, rgba(16,24,32,0.12))',
              borderRadius: '16px',
              padding: isMobile ? '24px 20px' : '28px',
              marginTop: '56px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <p style={s.cardTitle}>Still need help?</p>
            <p style={s.cardDesc}>
              Our support team responds within 1–2 business days.
            </p>
            <a href="mailto:hello@veniar.com" style={s.btnPrimary}>
              Email us
            </a>
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
    marginBottom: '32px',
  },
  subtext: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '16px',
    lineHeight: 1.6,
    margin: '0 0 32px',
  },
  btnPrimary: {
    display: 'inline-block',
    padding: '12px 24px',
    background: LAGOON,
    border: 'none',
    color: '#FFFFFF',
    borderRadius: '9px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    textDecoration: 'none',
    alignSelf: 'flex-start',
    lineHeight: 1,
  },
  btnGhost: {
    display: 'inline-block',
    padding: '11px 24px',
    background: 'transparent',
    border: `1.5px solid var(--vn-card-border, rgba(16,24,32,0.22))`,
    color: 'var(--vn-text, var(--rn-text))',
    borderRadius: '9px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    textDecoration: 'none',
    lineHeight: 1,
  },
  triggerBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    textAlign: 'left',
    transition: 'background 0.2s ease',
  },
  triggerTitle: {
    color: 'var(--vn-text, var(--rn-text))',
    fontSize: '15px',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },
  triggerIndicator: {
    color: CYAN,
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: 1,
    flexShrink: 0,
    marginLeft: '16px',
    userSelect: 'none',
  },
  panelText: {
    color: 'var(--vn-text-sub, var(--rn-text-sub))',
    fontSize: '14px',
    lineHeight: 1.7,
    margin: '0 0 20px',
    paddingRight: '32px',
  },
  cardTitle: {
    color: 'var(--vn-text, var(--rn-text))',
    fontSize: '17px',
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
};
