import { useEffect } from 'react';
import { useIsMobile } from './useIsMobile';
import VeniarNav from './VeniarNav';
import VeniarFooter from './VeniarFooter';

const CYAN   = '#00A9C8';
const YELLOW = '#F5C84B';

const SERVICES = [
  {
    title: 'Shared Rewards Network',
    desc: 'Customers earn points at any partner location. Points are pooled across the entire network, not siloed per business.',
    badge: 'Network',
  },
  {
    title: 'Merchant Dashboard',
    desc: 'Business owners get a real-time dashboard to manage redemptions, view customer activity, and configure point rates.',
    badge: 'Dashboard',
  },
  {
    title: 'Employee Checkout Tools',
    desc: 'Staff can look up customers by phone number and issue points or process redemptions in seconds.',
    badge: 'Checkout',
  },
  {
    title: 'Customer App',
    desc: 'Customers track their balance, browse partner locations, and view transaction history on the web or mobile.',
    badge: 'App',
  },
  {
    title: 'Network Map',
    desc: 'A live map showing all active partner locations where customers can earn or redeem.',
    badge: 'Map',
  },
  {
    title: 'Onboarding & Support',
    desc: 'RewardsNow handles setup, training, and ongoing support for every partner business.',
    badge: 'Support',
  },
];

export default function ServicesPage() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'Services — Veniar';
    window.scrollTo(0, 0);
  }, []);

  const cols = isMobile ? 1 : 3;

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
            maxWidth: '1080px',
            margin: '0 auto',
            padding: isMobile ? '80px 24px 80px' : '120px 8% 100px',
          }}
        >
          {/* Gold eyebrow */}
          <p style={s.eyebrow}>SERVICES</p>

          {/* H2 heading */}
          <h2 style={{ ...s.h2, fontSize: isMobile ? '2rem' : '2.8rem' }}>
            What Veniar offers.
          </h2>

          {/* Gold accent bar */}
          <div style={s.goldBar} />

          {/* Service grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: '16px',
            }}
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="vn-card"
                style={{
                  background: 'var(--vn-card, #FFFFFF)',
                  border: '1px solid var(--vn-card-border, rgba(16,24,32,0.12))',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Teal badge */}
                <span
                  style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    background: 'rgba(0,169,200,0.12)',
                    color: CYAN,
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '20px',
                  }}
                >
                  {svc.badge}
                </span>

                {/* Card title */}
                <p
                  style={{
                    color: 'var(--vn-text, var(--rn-text))',
                    fontSize: '17px',
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {svc.title}
                </p>

                {/* Card description */}
                <p
                  style={{
                    color: 'var(--vn-text-sub, var(--rn-text-sub))',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {svc.desc}
                </p>
              </div>
            ))}
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
  h2: {
    color: 'var(--vn-text, var(--rn-text))',
    fontWeight: '800',
    lineHeight: 1.1,
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
};
