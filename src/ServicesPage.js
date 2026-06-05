import { useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const SERVICES = [
  {
    title: 'Shared Rewards Network',
    desc: 'Customers earn points at any partner location. Points are pooled across the entire network — not siloed per business.',
    badge: 'Network',
    accent: '#1692A2',
    accentBg: 'rgba(22,146,162,0.10)',
  },
  {
    title: 'Merchant Dashboard',
    desc: 'Business owners get a real-time dashboard to manage redemptions, view customer activity, and configure point rates.',
    badge: 'Dashboard',
    accent: '#0E96CD',
    accentBg: 'rgba(14,150,205,0.10)',
  },
  {
    title: 'Employee Checkout Tools',
    desc: 'Staff look up customers by phone number and issue points or process redemptions in seconds — right from the counter.',
    badge: 'Checkout',
    accent: '#EDA81B',
    accentBg: 'rgba(237,168,27,0.12)',
  },
  {
    title: 'Customer App',
    desc: 'Customers track their balance, browse partner locations, and view full transaction history on web or mobile.',
    badge: 'App',
    accent: '#5CB2C9',
    accentBg: 'rgba(92,178,201,0.12)',
  },
  {
    title: 'Network Map',
    desc: 'A live map showing every active partner location where customers can earn or redeem — updated in real time.',
    badge: 'Map',
    accent: '#648D62',
    accentBg: 'rgba(100,141,98,0.12)',
  },
  {
    title: 'Onboarding & Support',
    desc: 'RewardsNow handles setup, training, and ongoing support for every partner business — no technical work required.',
    badge: 'Support',
    accent: '#D66024',
    accentBg: 'rgba(214,96,36,0.10)',
  },
];

export default function ServicesPage() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Services — Veniar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--vn-bg)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <VeniarNav />

      <main>
        {/* Header */}
        <section
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            padding: isMobile ? '96px 24px 64px' : '140px 8% 72px',
          }}
        >
          <p style={s.eyebrow}>SERVICES</p>
          <h1 style={{ ...s.h1, fontSize: isMobile ? '2.2rem' : '3rem' }}>
            What Veniar offers.
          </h1>
          <div style={s.accentBar} />
          <p style={{ ...s.lead, maxWidth: '520px' }}>
            A complete shared-loyalty infrastructure — one network, every partner, zero friction.
          </p>
        </section>

        {/* Service cards */}
        <section
          style={{
            background: 'var(--vn-panel, #F7E8CF)',
            padding: isMobile ? '48px 0 120px' : '64px 0 140px',
          }}
        >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: isMobile ? '0 24px' : '0 8%',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '32px',
            }}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="vn-card"
                style={{
                  background: 'var(--vn-card)',
                  border: '1px solid var(--vn-card-border)',
                  borderRadius: '16px',
                  borderTop: `3px solid ${svc.accent}`,
                  padding: isMobile ? '32px 24px' : '44px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    background: svc.accentBg,
                    color: svc.accent,
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    padding: '5px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {svc.badge}
                </span>

                <p
                  style={{
                    color: 'var(--vn-text)',
                    fontSize: '18px',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {svc.title}
                </p>

                <p
                  style={{
                    color: 'var(--vn-text-sub)',
                    fontSize: '15px',
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            ))}
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
    color: '#EDA81B',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '4px',
    textTransform: 'uppercase',
    margin: '0 0 24px',
  },
  h1: {
    color: 'var(--vn-text)',
    fontWeight: '800',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    margin: '0 0 28px',
  },
  accentBar: {
    width: '48px',
    height: '3px',
    background: '#EDA81B',
    borderRadius: '2px',
    marginBottom: '32px',
  },
  lead: {
    color: 'var(--vn-text-sub)',
    fontSize: '18px',
    lineHeight: 1.65,
    margin: 0,
  },
};
